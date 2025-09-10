import { api } from "@/api";
import type {
	IFileToUpload,
	IProposalDraft,
	IUploadedAttachments,
	ProposalStatus,
} from "@/types/proposal";

export const draftProposalAction = async (
	input: IProposalDraft,
	rfpId: string
) => {
	api.defaults.headers.common[
		"Authorization"
	] = `Bearer ${localStorage.getItem("RFP_ACCESS_TOKEN")}`;
	const response = await api.post(`/proposals/create`, {
		...input,
		rfpId,
	});
	return response.data;
};

export const fetchPresignedUrls = async (
	input: IFileToUpload[],
	proposalId: string
) => {
	api.defaults.headers.common[
		"Authorization"
	] = `Bearer ${localStorage.getItem("RFP_ACCESS_TOKEN")}`;
	const response = await api.post(
		`/proposals/${proposalId}/attachments/presign`,
		{
			files: input,
		}
	);
	return response.data;
};

export const getProposalAttachmentStatusUpdates = async (
	input: IUploadedAttachments[],
	proposalId: string
) => {
	api.defaults.headers.common[
		"Authorization"
	] = `Bearer ${localStorage.getItem("RFP_ACCESS_TOKEN")}`;
	const response = await api.post(
		`/proposals/${proposalId}/attachments/confirm`,
		{
			files: input,
		}
	);
	return response.data;
};

export const getProposalStatusUpdates = async (
	status: ProposalStatus,
	proposalId: string
) => {
	api.defaults.headers.common[
		"Authorization"
	] = `Bearer ${localStorage.getItem("RFP_ACCESS_TOKEN")}`;
	const response = await api.post(`/proposals/${proposalId}/status`, {
		status,
	});
	return response.data;
};
