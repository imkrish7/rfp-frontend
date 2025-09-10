import { api } from "@/api";
import type {
	LoginRequest,
	OrganisationProfile,
	SignupRequest,
	VendorProfileData,
} from "@/types/auth";

export const loginAction = async (loginRequest: LoginRequest) => {
	const response = await api.post("/auth/login", {
		...loginRequest,
	});
	return response.data;
};

export const signupAction = async (signupRequest: SignupRequest) => {
	const response = await api.post("/auth/login", {
		...signupRequest,
	});
	return response.data;
};
export const getUserAction = async () => {
	const response = await api.get("/auth/user");
	return response.data;
};

export const authentication = async () => {
	const response = await api.get("/auth/authenticate");
	return response.data;
};

export const createOrganisationProfile = async (
	profileData: Omit<OrganisationProfile, "role">
) => {
	const response = await api.post("/organisation/create", {
		...profileData,
	});
	return response.data;
};

export const createVendorProfile = async (
	profileData: Omit<VendorProfileData, "role">
) => {
	const response = await api.post("/vendor/create", {
		...profileData,
	});
	return response.data;
};
