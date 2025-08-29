export type RFPStatus =
	| "DRAFT"
	| "PUBLISHED"
	| "RESPONSE_SUBMITED"
	| "UNDER_REVIEW"
	| "APPROVED"
	| "REJECTED"
	| "ARCHIEVED"
	| string;

export interface ITimeline {
	proposalSubmission: string;
	vendorSelection: string;
	projectStart: string;
	completion: string;
}

export interface FileToUpload {
	filename: string;
	size: number;
	mimeType: string;
}

export interface AttachmentsPresignedURLS {
	fileId: string;
	uploadUrl: string;
	filename: string;
	finalUrl: string;
}

export interface AttachmentsUpdate {
	fileId: string;
	filename?: string;
	filetype?: string;
	status: "FAILED" | "UPLOADED";
}

export interface Attachment {
	id: string;
	rfpId: string;
	proposalId: string;
	contractId: string;
	filename: string;
	fileurl: string;
	filetype: string;
	size: number;
	fileId: string;
	status: "FAILED" | "UPLOADED" | "PENDING";
	associatedTo: "RFP" | "CONTRACT" | "PROPOSAL";
	createdAt: string;
	updatedAt: string;
}

export interface IRFP {
	id?: string;
	orgId: string;
	title: string;
	issuedBy: string;
	issuedDate: string;
	scopeOfWork: string;
	timeline: ITimeline;
	evaluationCriteria: string;
	deliverables: string;
	description: string;
	deadline: string;
	status: RFPStatus;
	proposalLimit?: number;
	createdAt?: string;
	updatedAt?: string;
	attachments?: Attachment[];
}
