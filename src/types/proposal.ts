export interface IProposalDraft {
	id?: string;
	title: string;
	description: string;
	cost: number;
	actionStatus: "SAVED" | "UNSAVED";
}
