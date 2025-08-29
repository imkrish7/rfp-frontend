import { api } from "@/api";
import type {
	AttachmentsUpdate,
	FileToUpload,
	IRFP,
	RFPStatus,
} from "@/types/rfp";

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

export const getPresignedUrls = async (
	input: FileToUpload[],
	rfpId: string
) => {
	api.defaults.headers.common[
		"Authorization"
	] = `Bearer ${localStorage.getItem("RFP_ACCESS_TOKEN")}`;
	const response = await api.post(`/rfps/${rfpId}/attachments/presign`, {
		files: input,
	});
	return response.data;
};

export const getAttachmentStatusUpdates = async (
	input: AttachmentsUpdate[],
	rfpId: string
) => {
	api.defaults.headers.common[
		"Authorization"
	] = `Bearer ${localStorage.getItem("RFP_ACCESS_TOKEN")}`;
	const response = await api.post(`/rfps/${rfpId}/attachments/confirm`, {
		files: input,
	});
	return response.data;
};
export const getRFPStatusUpdated = async (status: RFPStatus, rfpId: string) => {
	api.defaults.headers.common[
		"Authorization"
	] = `Bearer ${localStorage.getItem("RFP_ACCESS_TOKEN")}`;
	const response = await api.post(`/rfps/${rfpId}/submit`, {
		status,
	});
	return response.data;
};

export const getRFPDeleted = async (rfpId: string) => {
	api.defaults.headers.common[
		"Authorization"
	] = `Bearer ${localStorage.getItem("RFP_ACCESS_TOKEN")}`;
	const response = await api.delete(`/rfps/${rfpId}`);
	return response.data;
};
