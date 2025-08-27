import { api } from "@/api";
import type { LoginRequest, SignupRequest } from "@/types/auth";

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
	api.defaults.headers.common[
		"Authorization"
	] = `Bearer ${localStorage.getItem("RFP_ACCESS_TOKEN")}`;
	const response = await api.get("/auth/user");
	return response.data;
};

export const authentication = async () => {
	api.defaults.headers.common[
		"Authorization"
	] = `Bearer ${localStorage.getItem("RFP_ACCESS_TOKEN")}`;
	const response = await api.get("/auth/authenticate");
	return response.data;
};
