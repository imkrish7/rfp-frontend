import { api } from "@/api";
import type { IRFP } from "@/types/rfp";

export const fetchRFPS = async () => {
	api.defaults.headers.common[
		"Authorization"
	] = `Bearer ${localStorage.getItem("RFP_ACCESS_TOKEN")}`;
	const response = await api.get("/rfps");
	return response.data;
};

export const fetchRFP = async (input: string) => {
	api.defaults.headers.common[
		"Authorization"
	] = `Bearer ${localStorage.getItem("RFP_ACCESS_TOKEN")}`;
	const response = await api.get(`/rfps/${input}`);
	return response.data;
};

export const addNewRFP = async (input: IRFP) => {
	api.defaults.headers.common[
		"Authorization"
	] = `Bearer ${localStorage.getItem("RFP_ACCESS_TOKEN")}`;
	const response = await api.post(`/rfps/create`, {
		...input,
	});
	return response.data;
};
