import {
	draftProposalAction,
	fetchPresignedUrls,
	getProposalAttachmentStatusUpdates,
	getProposalStatusUpdates,
} from "@/actions/proposalActions";
import type {
	IFileToUpload,
	IPresignedURLS,
	IProposal,
	IProposalDraft,
	IUploadedAttachments,
	ProposalStatus,
} from "@/types/proposal";
import { assign, fromPromise, setup } from "xstate";

export const proposalMachine = setup({
	types: {
		context: {} as {
			draftedProposal: IProposal | null;
			proposal: IProposalDraft | null;
			filesToUpload: File[] | null;
			presignedURLS: IPresignedURLS[] | null;
			uploadedAttachments: IUploadedAttachments[] | null;
			rfpId: string | null;
			proposalStatusUpdate: ProposalStatus | null;
		},
		events: {} as
			| {
					type: "SAVE";
					proposal: IProposalDraft;
					rfpId: string;
			  }
			| {
					type: "UPLOAD";
					files: File[];
			  }
			| {
					type: "UPLOAD_COMPLETED";
					uploaded: IUploadedAttachments[];
			  }
			| {
					type: "CANCEL";
			  }
			| {
					type: "SUBMIT";
			  }
			| {
					type: "UNDER_REVIEW";
			  },
	},
	actors: {
		saveProposal: fromPromise(
			async ({
				input,
			}: {
				input: {
					proposal: Omit<IProposalDraft, "actionStatus">;
					rfpId: string;
				};
			}) => {
				const response = await draftProposalAction(
					input.proposal,
					input.rfpId
				);

				return response;
			}
		),
		fetchPresignedURLS: fromPromise(
			async ({
				input,
			}: {
				input: { files: IFileToUpload[]; id: string };
			}) => {
				const response = await fetchPresignedUrls(
					input.files,
					input.id
				);
				return response.uploads;
			}
		),
		updateUploadStatus: fromPromise(
			async ({
				input,
			}: {
				input: { uploads: IUploadedAttachments[]; id: string };
			}) => {
				const response = await getProposalAttachmentStatusUpdates(
					input.uploads,
					input.id
				);
				return response.attachments;
			}
		),
		proposalStatus: fromPromise(
			async ({
				input,
			}: {
				input: { status: ProposalStatus; id: string };
			}) => {
				const response = await getProposalStatusUpdates(
					input.status,
					input.id
				);
				return response;
			}
		),
	},
}).createMachine({
	id: "proposalMachine",
	context: {
		draftedProposal: null,
		proposal: null,
		filesToUpload: null,
		presignedURLS: null,
		uploadedAttachments: null,
		proposalStatusUpdate: null,
		rfpId: null,
	},
	initial: "idle",
	states: {
		idle: {
			on: {
				SAVE: {
					target: "#proposalMachine.draftProposal",
					actions: assign(({ event }) => {
						return {
							proposal: {
								...event.proposal,
							},
							rfpId: event.rfpId,
						};
					}),
				},
			},
		},
		draftProposal: {
			invoke: {
				src: "saveProposal",
				input: ({ context }) => {
					console.log(context, "SAVE");
					if (!context.proposal || !context.rfpId) {
						throw new Error("Invalid request");
					}
					return {
						proposal: context.proposal,
						rfpId: context.rfpId,
					};
				},
				onDone: {
					target: "#proposalMachine.attachments",
					actions: assign(({ event }) => {
						return {
							draftedProposal: {
								...event.output,
							},
						};
					}),
				},
				onError: {
					target: "#proposalMachine.idle",
				},
			},
		},
		attachments: {
			on: {
				UPLOAD: {
					target: "#proposalMachine.fetchPresignedURLS",
					actions: assign(({ event }) => {
						return {
							filesToUpload: event.files,
						};
					}),
				},
			},
		},
		fetchPresignedURLS: {
			invoke: {
				src: "fetchPresignedURLS",
				input: ({ context }) => {
					console.log(context);
					if (
						!context.filesToUpload ||
						!context.draftedProposal?.id
					) {
						throw new Error("Bad request!");
					}
					return {
						files: context.filesToUpload.map((file) => {
							return {
								filename: file.name,
								size: file.size,
								mimeType: file.type,
							};
						}),
						id: context.draftedProposal?.id,
					};
				},
				onDone: {
					target: "#proposalMachine.upload",
					actions: assign(({ event }) => {
						return {
							presignedURLS: event.output!,
						};
					}),
				},
				onError: {},
			},
		},
		upload: {
			on: {
				UPLOAD_COMPLETED: {
					target: "#proposalMachine.updateUploadStatus",
					actions: assign(({ event }) => {
						console.log("Uploaded Completed", event.uploaded);
						return {
							uploadedAttachments: event.uploaded,
						};
					}),
				},
			},
		},
		updateUploadStatus: {
			invoke: {
				src: "updateUploadStatus",
				input: ({ context }) => {
					if (
						!context.uploadedAttachments ||
						!context.draftedProposal?.id
					) {
						throw new Error("Bad Request");
					}
					return {
						uploads: context.uploadedAttachments,
						id: context.draftedProposal?.id,
					};
				},
				onDone: {
					target: "#proposalMachine.preview",
				},
				onError: {},
			},
		},
		preview: {
			on: {
				CANCEL: {
					target: "#proposalMachine.done",
				},
				SUBMIT: {
					target: "#proposalMachine.statusUpdate",
					actions: assign(() => {
						return {
							proposalStatusUpdate: "SUBMITTED",
						};
					}),
				},
				UNDER_REVIEW: {
					target: "#proposalMachine.statusUpdate",
					actions: assign(() => {
						return {
							proposalStatusUpdate: "UNDER_REVIEW",
						};
					}),
				},
			},
		},
		statusUpdate: {
			invoke: {
				src: "proposalStatus",
				input: ({ context }) => {
					if (
						!context.proposalStatusUpdate ||
						!context.draftedProposal
					) {
						throw new Error("Bad request!");
					}
					return {
						status: context.proposalStatusUpdate,
						id: context.draftedProposal?.id,
					};
				},
				onDone: {
					target: "#proposalMachine.done",
				},
				onError: {
					target: "#proposalMachine.preview",
				},
			},
		},
		done: {},
	},
});
