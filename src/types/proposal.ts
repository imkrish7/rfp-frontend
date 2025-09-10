export interface IProposalDraft {
	id?: string;
	title: string;
	description: string;
	cost: number;
}

export interface IPresignedURLS {
	filename: string;
	fileId: string;
	uploadUrl: string;
	finalURL: string;
}

export interface IFileToUpload {
	filename: string;
	size: number;
	mimeType: string;
}

export interface IUploadedAttachments {
	filename: string;
	filetype: string;
	fileId: string;
	uploadUrl: string;
	finalURL: string;
	status: "UPLOADED" | "FAILED" | string;
}

export interface IProposal {
	id: string;
	cost: number;
	description: string;
	title: string;
	score: number | null;
	status: ProposalStatus;
	createdAt: Date;
	updatedAt: Date;
	rfpId: string;
	vendorId: string;
}

export type ProposalStatus =
	| "DRAFT"
	| "RESUBMIT"
	| "SUBMITTED"
	| "APPROVED"
	| "REJECTED"
	| "UNDER_REVIEW"
	| string;
