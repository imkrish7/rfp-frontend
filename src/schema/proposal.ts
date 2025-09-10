import { z } from "zod";

export const ProposalSchema = z.object({
	cost: z.number().min(10000),
	description: z.string().min(100),
	title: z.string().min(10),
});
