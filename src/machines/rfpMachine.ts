import {
	addNewRFP,
	fetchRFP,
	fetchRFPS,
	getAttachmentStatusUpdates,
	getPresignedUrls,
	getRFPDeleted,
	getRFPStatusUpdated,
} from "@/actions/rfpActions";
import type {
	AttachmentsPresignedURLS,
	AttachmentsUpdate,
	FileToUpload,
	IRFP,
	RFPStatus,
} from "@/types/rfp";
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
			statusUpdate: RFPStatus | null;
			fileToUpload: FileToUpload[] | null;
			attachmentsPresignedUrl: AttachmentsPresignedURLS[] | null;
			role: "PROCUREMENT" | "VENDOR" | null;
			// attachments: | null;
			uploadedAttachments: AttachmentsUpdate[] | null;
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
			  }
			| {
					type: "UPLOAD";
					files: File[];
			  }
			| {
					type: "CANCEL";
			  }
			| {
					type: "UPDATE_ATTACHMENTS";
					uploadedAttachments: AttachmentsUpdate[];
			  }
			| {
					type: "PUBLISH";
					status: RFPStatus;
			  }
			| {
					type: "UNDER_REVIEW";
					status: RFPStatus;
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
			return response.data;
		}),
		deleteRFP: fromPromise(async ({ input }: { input: string }) => {
			const response = await getRFPDeleted(input);
			return response;
		}),
		fetchPresignedURLS: fromPromise(
			async ({
				input,
			}: {
				input: { files: FileToUpload[]; rfpId: string };
			}) => {
				const response = await getPresignedUrls(
					input.files,
					input.rfpId
				);
				return response.uploads;
			}
		),
		editRFP: fromPromise(async ({ input }: { input: IRFP }) => {
			console.log(input);
		}),
		updateAttachmentStatus: fromPromise(
			async ({
				input,
			}: {
				input: {
					attachmentsUpdate: AttachmentsUpdate[];
					rfpId: string;
				};
			}) => {
				const response = await getAttachmentStatusUpdates(
					input.attachmentsUpdate,
					input.rfpId
				);
				return response.attachments;
			}
		),

		updateRFPStatus: fromPromise(
			async ({
				input,
			}: {
				input: {
					status: RFPStatus;
					rfpId: string;
				};
			}) => {
				const response = await getRFPStatusUpdated(
					input.status,
					input.rfpId
				);
				return response.attachments;
			}
		),
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
		fileToUpload: null,
		attachmentsPresignedUrl: null,
		uploadedAttachments: null,
		statusUpdate: null,
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
						console.log("deleting");
						return {
							deleteId: event.rfpId,
						};
					}),
				},
				VIEW: {
					target: "#rfpMachine.view",
					actions: assign(({ event }) => {
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
				CANCEL: {
					target: "#rfpMachine.canceled",
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
					target: "#rfpMachine.attachments",
					actions: assign(({ event }) => {
						return {
							newRFP: event.output,
						};
					}),
				},
				onError: {},
			},
		},
		attachments: {
			on: {
				UPLOAD: {
					target: "#rfpMachine.fetchPresignedURLS",
					actions: assign(({ event }) => {
						return {
							fileToUpload: event.files.map((file) => ({
								filename: file.name,
								size: file.size,
								mimeType: file.type,
							})),
						};
					}),
				},
				CANCEL: {},
			},
		},
		fetchPresignedURLS: {
			invoke: {
				src: "fetchPresignedURLS",
				input: ({ context }) => {
					if (!context.fileToUpload || !context.newRFP) {
						throw new Error("Bad request");
					}
					return {
						files: context.fileToUpload,
						rfpId: context.newRFP!.id as string,
					};
				},
				onDone: {
					target: "#rfpMachine.uploadToStorage",
					actions: assign(({ event }) => {
						return {
							attachmentsPresignedUrl: event.output,
						};
					}),
				},
				onError: {
					target: "#rfpMachine.attachments",
				},
			},
		},
		uploadToStorage: {
			on: {
				UPDATE_ATTACHMENTS: {
					target: "#rfpMachine.updateAttachments",
					actions: assign(({ event }) => {
						return {
							uploadedAttachments: event.uploadedAttachments,
						};
					}),
				},
			},
		},
		updateAttachments: {
			invoke: {
				src: "updateAttachmentStatus",
				input: ({ context }) => {
					if (!context.uploadedAttachments) {
						throw new Error("Bad Request");
					}
					return {
						attachmentsUpdate: context.uploadedAttachments,
						rfpId: context.newRFP?.id as string,
					};
				},
				onDone: {
					target: "#rfpMachine.rfpStatusUpdated",
					actions: assign(({ event }) => {
						return {
							uploadedAttachments: event.output,
						};
					}),
				},
				onError: {},
			},
		},
		rfpStatusUpdated: {
			on: {
				PUBLISH: {
					target: "#rfpMachine.updateRFPStatus",
					actions: assign(({ event }) => {
						return {
							statusUpdate: event.status,
						};
					}),
				},
				UNDER_REVIEW: {
					target: "#rfpMachine.updateRFPStatus",
					actions: assign(({ event }) => {
						return {
							statusUpdate: event.status,
						};
					}),
				},
				CANCEL: {
					target: "#rfpMachine.newRFPAdded",
				},
			},
		},
		updateRFPStatus: {
			invoke: {
				src: "updateRFPStatus",
				input: ({ context }) => {
					if (!context.newRFP && !context.statusUpdate) {
						throw new Error("Bad Request!");
					}
					return {
						rfpId: context.newRFP?.id as string,
						status: context.statusUpdate as RFPStatus,
					};
				},
				onDone: {
					target: "#rfpMachine.newRFPAdded",
				},
				onError: {
					target: "#rfpMachine.rfpStatusUpdated",
				},
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
		loaded: {
			on: {
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
						console.log("deleting");
						return {
							deleteId: event.rfpId,
						};
					}),
				},
				VIEW: {
					target: "#rfpMachine.view",
					actions: assign(({ event }) => {
						return {
							viewId: event.rfpId,
						};
					}),
				},
			},
		},
		canceled: {},
	},
});
