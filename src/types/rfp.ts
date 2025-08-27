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
}
