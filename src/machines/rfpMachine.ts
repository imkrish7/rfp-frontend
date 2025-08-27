import { addNewRFP, fetchRFP, fetchRFPS } from "@/actions/rfpActions";
import type { IRFP } from "@/types/rfp";
import { assign, fromPromise, setup } from "xstate";

export const rfpMachine = setup({
	types: {
		context: {} as {
			rfps: IRFP[];
			fetchRFPError: string | null;
			deleteId: string | null;
			editId: string | null;
			viewId: string | null;
			newRFP: IRFP | null;
			viewRFP: IRFP | null;
			editRFP: IRFP | null;
			role: "PROCUREMENT" | "VENDOR" | null;
		},
		events: {} as
			| {
					type: "LOAD";
			  }
			| {
					type: "NEW";
					newRFP: IRFP;
			  }
			| {
					type: "EDIT";
					rfpId: string;
			  }
			| {
					type: "COMPLETE_EDITING";
					rfp: IRFP;
			  }
			| {
					type: "VIEW";
					rfpId: string;
			  }
			| {
					type: "DELETE";
					rfpId: string;
			  }
			| {
					type: "RESET";
			  },
	},
	actors: {
		fetchRfps: fromPromise(async (): Promise<IRFP[]> => {
			const response = await fetchRFPS();
			return response.rfps;
		}),
		loadRFP: fromPromise(
			async ({ input }: { input: string }): Promise<IRFP> => {
				const response = await fetchRFP(input);
				return response;
			}
		),
		createNewRFP: fromPromise(async ({ input }: { input: IRFP }) => {
			const response = await addNewRFP(input);
			return response;
		}),
		deleteRFP: fromPromise(async ({ input }: { input: string }) => {
			console.log(input);
		}),
		editRFP: fromPromise(async ({ input }: { input: IRFP }) => {
			console.log(input);
		}),
	},
}).createMachine({
	id: "rfpMachine",
	initial: "idle",
	context: {
		rfps: [],
		editId: null,
		viewId: null,
		deleteId: null,
		editRFP: null,
		viewRFP: null,
		fetchRFPError: null,
		role: null,
		newRFP: null,
	},
	states: {
		idle: {
			on: {
				LOAD: {
					target: "#rfpMachine.fetchRFPS",
				},
				EDIT: {
					target: "#rfpMachine.edit",
					actions: assign(({ event }) => {
						return {
							editId: event.rfpId,
						};
					}),
				},
				DELETE: {
					target: "#rfpMachine.deletingRFP",
					actions: assign(({ event }) => {
						return {
							deleteId: event.rfpId,
						};
					}),
				},
				VIEW: {
					target: "#rfpMachine.view",
					actions: assign(({ event }) => {
						console.log("veiwwwing");
						return {
							viewId: event.rfpId,
						};
					}),
				},
				NEW: {
					target: "#rfpMachine.createNew",
					actions: assign(({ event }) => {
						return {
							newRFP: event.newRFP,
						};
					}),
				},
			},
		},
		fetchRFPS: {
			initial: "loadRFPS",
			states: {
				loadRFPS: {
					invoke: {
						src: "fetchRfps",
						onDone: {
							target: "#rfpMachine.loaded",
							actions: assign(({ event }) => {
								return {
									rfps: event.output,
								};
							}),
						},
						onError: {
							target: "fetchError",
							actions: assign(({ event }) => {
								return {
									fetchRFPError: (event.error as Error)
										.message,
								};
							}),
						},
					},
				},
				fetchError: {},
			},
		},
		createNew: {
			invoke: {
				src: "createNewRFP",
				input: ({ context }) => {
					if (!context.newRFP) {
						throw new Error("Invalid request");
					}
					return context.newRFP;
				},
				onDone: {
					target: "#rfpMachine.newRFPAdded",
					actions: assign(({ event }) => {
						return {
							editRFP: event.output,
						};
					}),
				},
				onError: {},
			},
		},
		edit: {
			invoke: {
				src: "loadRFP",
				input: ({ context }) => {
					if (!context.editId) {
						throw new Error("Invalid request");
					}
					return context.editId;
				},
				onDone: {
					target: "#rfpMachine.editingRFP",
					actions: assign(({ event }) => {
						return {
							editRFP: event.output,
						};
					}),
				},
				onError: {},
			},
		},
		editingRFP: {
			on: {
				COMPLETE_EDITING: {
					target: "#rfpMachine.editingComplete",
					actions: assign(({ event }) => {
						return {
							editRFP: event.rfp,
						};
					}),
				},
			},
		},
		editingComplete: {
			invoke: {
				src: "editRFP",
				input: ({ context }) => {
					if (!context.editRFP) {
						throw new Error("RFP is required");
					}
					return context.editRFP;
				},
				onDone: {},
				onError: {},
			},
		},
		view: {
			invoke: {
				src: "loadRFP",
				input: ({ context }) => {
					if (!context.viewId) {
						throw new Error("Invalid request");
					}
					return context.viewId;
				},
				onDone: {
					target: "#rfpMachine.viewingRFP",
					actions: assign(({ event }) => {
						return {
							viewRFP: event.output,
						};
					}),
				},
				onError: {},
			},
		},
		viewingRFP: {
			on: {
				EDIT: {
					target: "#rfpMachine.editingRFP",
					actions: assign(({ context, event }) => {
						return {
							editRFP: context.rfps.filter(
								(rfp) => rfp.id === event.rfpId
							)[0],
						};
					}),
				},
				DELETE: {
					target: "#rfpMachine.deletingRFP",
					actions: assign(({ context, event }) => {
						return {
							editRFP: context.rfps.filter(
								(rfp) => rfp.id == event.rfpId
							)[0],
						};
					}),
				},
			},
		},
		deletingRFP: {
			invoke: {
				src: "deleteRFP",
				input: ({ context }) => {
					if (!context.deleteId) {
						throw new Error("Bad Request!");
					}
					return context.deleteId!;
				},
				onDone: {
					target: "#rfpMachine.fetchRFPS",
				},
				onError: {},
			},
		},
		newRFPAdded: {},
		loaded: {},
	},
});
