import type { IProposalDraft } from "@/types/proposal";
import { assign, fromPromise, setup } from "xstate";

export const proposalMachine = setup({
	types: {
		context: {} as {
			draftedProposal: IProposalDraft | null;
		},
		events: {} as {
			type: "SAVE";
			proposal: IProposalDraft;
		},
	},
	actors: {
		saveProposal: fromPromise(
			async ({
				input,
			}: {
				input: Omit<IProposalDraft, "actionStatus">;
			}) => {
				console.log(input);

				return input;
			}
		),
	},
}).createMachine({
	id: "proposalMachine",
	context: {
		draftedProposal: null,
	},
	initial: "idle",
	states: {
		idle: {
			on: {
				SAVE: {
					target: "#proposalMachine.draftProposal",
					actions: assign(({ event }) => {
						return {
							draftedProposal: {
								...event.proposal,
								actionStatus: "UNSAVED",
							},
						};
					}),
				},
			},
		},
		draftProposal: {
			invoke: {
				src: "saveProposal",
				input: ({ context }) => {
					if (!context.draftedProposal) {
						throw new Error("Invalid request");
					}
					return context.draftedProposal;
				},
				onDone: {
					target: "#proposalMachine.attachments",
					actions: assign(({ event }) => {
						return {
							draftedProposal: {
								...event.output,
								actionStatus: "SAVED",
							},
						};
					}),
				},
				onError: {},
			},
		},
		attachments: {},
	},
});
