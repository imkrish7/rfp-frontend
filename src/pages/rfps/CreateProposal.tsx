/* eslint-disable @typescript-eslint/no-explicit-any */
import FileUpload from "@/components/FileUpload";
import ProposalForm from "@/components/ProposalForm";
import ProposalView from "@/components/ProposalView";
import { proposalMachine } from "@/machines/proposalMachine";
import type { ProposalSchema } from "@/schema/proposal";
import { upload } from "@/services/uploadService";
import type { IUploadedAttachments } from "@/types/proposal";
import { useMachine } from "@xstate/react";
import { useEffect, useState, useTransition } from "react";
import { Navigate, useParams } from "react-router";
import type z from "zod";

const CreateProposal = () => {
	const [files, setFiles] = useState<File[]>([]);
	const { rfpId } = useParams();
	const [state, send] = useMachine(proposalMachine);
	const [isLoading, startTransition] = useTransition();

	useEffect(() => {
		if (state.matches("upload")) {
			startTransition(async () => {
				const presignedURLS = state.context.presignedURLS;
				const uploadedResponse: IUploadedAttachments[] = [];
				if (presignedURLS) {
					for (let i = 0; i < presignedURLS?.length; i++) {
						const presignedURL = presignedURLS[i];
						const file = files.filter(
							(file) => file.name === presignedURL.filename
						)[0];
						const response = await upload(
							file,
							presignedURL.uploadUrl
						);
						if (response) {
							uploadedResponse.push({
								fileId: presignedURL.fileId,
								filename: presignedURL.filename,
								filetype: file.type,
								finalURL: presignedURL.finalURL,
								uploadUrl: presignedURL.uploadUrl,
								status: "UPLOADED",
							});
						} else {
							uploadedResponse.push({
								fileId: presignedURL.fileId,
								filename: presignedURL.filename,
								filetype: file.type,
								finalURL: presignedURL.finalURL,
								uploadUrl: presignedURL.uploadUrl,
								status: "FAILED",
							});
						}
					}
					console.log(uploadedResponse);
					send({
						type: "UPLOAD_COMPLETED",
						uploaded: uploadedResponse,
					});
				}
			});
		}
	}, [state, send, files]);

	const handleUpload = () => {
		send({ type: "UPLOAD", files: files });
	};

	const draftProposal = (data: z.infer<typeof ProposalSchema>) => {
		send({ type: "SAVE", proposal: data, rfpId: rfpId! });
	};

	const handleStatusUpdate = (actions: any) => {
		send({ type: actions });
	};

	console.log(state.context, state.value);

	if (state.matches("done")) {
		return <Navigate to="/rfps" />;
	}

	return (
		<div>
			{state.matches("idle") && (
				<ProposalForm handleSubmit={draftProposal} />
			)}
			{state.matches("attachments") && (
				<FileUpload
					files={files}
					setFiles={setFiles}
					handleUpload={handleUpload}
					isUploading={isLoading}
				/>
			)}
			{state.matches("preview") && (
				<div className="p-4">
					<ProposalView
						details={{
							proposal: state.context.draftedProposal!,
							attachments: state.context.uploadedAttachments!,
						}}
						action={handleStatusUpdate}
					/>
				</div>
			)}
		</div>
	);
};

export default CreateProposal;
