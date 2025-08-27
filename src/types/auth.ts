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
