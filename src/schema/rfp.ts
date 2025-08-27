import z from "zod";

const timelineSchema = z.object({
	proposalSubmission: z.date(), // see note below
	vendorSelection: z.date(),
	projectStart: z.date(),
	completion: z.date(),
});

export const rfpSchema = z.object({
	title: z.string().min(3),
	description: z.string().min(10),
	deadline: z.date(),
	issuedBy: z.string(),
	issuedDate: z.string(),
	status: z
		.union([
			z.enum([
				"DRAFT",
				"PUBLISHED",
				"RESPONSE_SUBMITED",
				"UNDER_REVIEW",
				"APPROVED",
				"REJECTED",
				"ARCHIEVED",
			]),
			z.string(),
		])
		.optional(),
	scopeOfWork: z.string(),
	evaluationCriteria: z.string(),
	deliverables: z.string(),
	timeline: timelineSchema,
});
