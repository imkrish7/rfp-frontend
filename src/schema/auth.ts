import { z } from "zod";

export const LoginSchema = z.object({
	email: z.email(),
	password: z.string().min(6),
});

export const OrganisationSchema = z.object({
	name: z.string().min(2),
	logo: z.string().optional(),
	description: z.string().min(100),
	website: z.string(),
});

export const VendorSchema = z.object({
	name: z.string().min(2),
	logo: z.string().optional(),
	contactEmail: z.string().email(),
	contactPerson: z.string().min(2),
	description: z.string().min(100),
	gstin: z.string().min(15).max(20),
	businessCategory: z.string(),
	website: z.string(),
});
