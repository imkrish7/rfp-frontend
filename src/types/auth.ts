export interface LoginResponse {
	accessToken?: string;
	role: "ADMIN" | "PROCUREMENT" | "VENDOR";
	nextStep: "VERIFY_EMAIL" | "COMPLETE_PROFILE" | "DASHBOARD";
}

export interface SignupRequest {
	email: string;
	password: string;
	role: "ADMIN" | "PROCUREMENT" | "VENDOR";
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface UserProfile {
	email: string;
}

export interface OrganisationProfile {
	role: "organisation";
	name: string;
	logo?: string;
	website: string;
	description: string;
}
export interface VendorProfileData {
	role: "vendor";
	name: string;
	businessCategory: string;
	contactEmail: string;
	contactPerson: string;
	description: string;
	gstin: string;
	website: string;
	logo?: string;
}

export type ProfileData = OrganisationProfile | VendorProfileData;
