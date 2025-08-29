import FileUpload from "@/components/FileUpload";
import RFPForm from "@/components/RFPForm";
import RFPPreview from "@/components/RFPPreview";
import { Card, CardContent } from "@/components/ui/card";
import { rfpMachine } from "@/machines/rfpMachine";
import type { rfpSchema } from "@/schema/rfp";
import { upload } from "@/services/uploadService";
import type { AttachmentsUpdate, RFPStatus } from "@/types/rfp";
import { useMachine } from "@xstate/react";
import { useEffect, useState, useTransition } from "react";
import { Navigate } from "react-router";
import { toast } from "sonner";
import type { z } from "zod";

const rfpObject = {
	deadline: "9/30/2025",
	deliverables:
		"Acme Corp, represented by Jane Doe, can be reached via email at jane.doe@acmecorp.com or by phone at +1-202-555-0199 for all communications regarding this RFP",
	description:
		"This request for proposal is issued to identify a qualified vendor who can design and implement an enterprise-grade contract management system. The system should streamline contract lifecycles, enable workflow automation, support secure document management, and provide tools for compliance and reporting. The goal is to improve efficiency, reduce manual effort, and ensure legal and regulatory adherence across all contract-related processes.",
	evaluationCriteria:
		"Vendor proposals will be evaluated primarily on technical expertise and their ability to deliver a scalable and secure enterprise solution. Cost-effectiveness will also be considered, but the emphasis will remain on the vendor’s ability to meet functional requirements and deliver within the specified timeline. Previous experience with similar large-scale implementations and demonstrated success with enterprise clients will be considered significant advantages in the evaluation process.",
	issuedBy: "Acme Corporation",
	issuedDate: "",
	scopeOfWork:
		"The selected vendor will be expected to deliver a cloud-based solution that provides secure contract storage with versioning, configurable approval workflows supported by digital signatures, and seamless integration with Acme Corp’s ERP and CRM systems. The scope further includes the implementation of dashboards for compliance monitoring and contract analytics, training for end-users and administrators, and the provision of technical support and maintenance throughout the project lifecycle.",
	status: "DRAFT",
	timeline: {
		completion: "9/30/2025",
		projectStart: "9/19/2025",
		proposalSubmission: "9/30/2025",
		vendorSelection: "9/10/2025",
	},
	title: "Enterprise Contract Management System",
	orgId: "",
};

const CreateRFP = () => {
	const [files, setFiles] = useState<File[]>([]);
	const [isLoading, startTransition] = useTransition();
	const [state, send] = useMachine(rfpMachine);

	const handleSubmit = (data: z.infer<typeof rfpSchema>) => {
		send({
			type: "NEW",
			newRFP: {
				...data,
				status: "DRAFT",
				deadline: new Date(data.deadline).toLocaleDateString(),
				timeline: {
					completion: new Date(
						data.timeline.completion
					).toLocaleDateString(),
					projectStart: new Date(
						data.timeline.projectStart
					).toLocaleDateString(),
					proposalSubmission: new Date(
						data.timeline.proposalSubmission
					).toLocaleDateString(),
					vendorSelection: new Date(
						data.timeline.vendorSelection
					).toLocaleDateString(),
				},
				orgId: "",
			},
		});
	};

	useEffect(() => {
		if (state.matches("uploadToStorage")) {
			startTransition(async () => {
				const presignedURLS = state.context.attachmentsPresignedUrl;

				const uploadedResponse: AttachmentsUpdate[] = [];
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
								status: "UPLOADED",
							});
						} else {
							uploadedResponse.push({
								fileId: presignedURL.fileId,
								status: "FAILED",
							});
						}
					}
					send({
						type: "UPDATE_ATTACHMENTS",
						uploadedAttachments: uploadedResponse,
					});
				}
			});
		}
	}, [state, files, send]);

	const handleUpload = () => {
		if (files.length == 0) {
			toast.warning("Please attach files");
		} else {
			send({
				type: "UPLOAD",
				files: files,
			});
		}
	};

	const finalStep = (
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		action: "CANCEL" | "PUBLISHED" | "UNDER_REVIEW" | any,
		status?: RFPStatus
	) => {
		send({
			type: action,
			status,
		});
	};
	console.log(state);
	if (state.matches("newRFPAdded")) {
		return <Navigate to="/rfps" />;
	}
	return (
		<Card className="border-none rounded-none">
			<CardContent>
				{state.matches("idle") && (
					<RFPForm handleSubmit={handleSubmit} rfp={rfpObject} />
				)}
				{(state.matches("attachments") ||
					state.matches("fetchPresignedURLS") ||
					state.matches("uploadToStorage")) && (
					<FileUpload
						handleUpload={handleUpload}
						files={files}
						setFiles={setFiles}
						isUploading={isLoading}
					/>
				)}
				{state.matches("rfpStatusUpdated") && (
					<RFPPreview
						details={{
							rfp: state.context.newRFP!,
							attachments: state.context.uploadedAttachments!,
						}}
						action={finalStep}
					/>
				)}
			</CardContent>
		</Card>
	);
};

export default CreateRFP;
