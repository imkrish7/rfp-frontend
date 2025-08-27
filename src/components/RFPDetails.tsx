import { OctagonAlert, Paperclip } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import type { IRFP } from "@/types/rfp";
import type { FC } from "react";

interface IProps {
	rfp: IRFP;
}

const RFPDetails: FC<IProps> = ({ rfp }) => {
	return (
		<Card className="flex border-none rounded-none">
			<CardHeader>
				{/* <CardTitle className="text-3xl">{rfp.issuedBy}</CardTitle> */}
				<CardTitle className="text-3xl">{rfp.title}</CardTitle>
				<div className="flex gap-2">
					<span className="text-gray-400">
						{new Date(rfp.issuedDate).toLocaleDateString()}
					</span>
					<span className="flex gap-1 items-center text-gray-400">
						<Paperclip className="w-4 h-4" />
						<span>4 attachments</span>
					</span>
				</div>
			</CardHeader>
			<CardDescription className="pl-6">
				<div>{rfp.description}</div>
			</CardDescription>
			<CardContent>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col">
						<span className="text-xl font-semibold">
							Scope Of Work
						</span>
						<div className="text-gray-350 text-base">
							{rfp.scopeOfWork}
						</div>
					</div>
					<div className="flex flex-col">
						<span className="text-xl font-semibold">
							Evaluation Criteria
						</span>
						<div className="text-gray-350 text-base">
							{rfp.evaluationCriteria}
						</div>
					</div>
					<div className="flex flex-col">
						<span className="text-xl font-semibold">
							Deliverables
						</span>
						<div className="text-gray-350 text-base">
							{rfp.deliverables}
						</div>
					</div>
				</div>
			</CardContent>
			<CardFooter className="w-full">
				<div className="flex flex-col">
					<span className="text-orange-300 text-lg flex font-semibold items-center">
						<OctagonAlert className="w-6 h-6 mr-2" />
						Important Timelines
					</span>
					<div className="grid grid-cols-4 w-full gap-4">
						<div className="flex flex-col border-1 rounded-md p-2">
							<span className="text-gray-400 font-semibold text-base">
								Proposal Submission
							</span>
							<span>
								{new Date(
									rfp.timeline.proposalSubmission
								).toLocaleDateString()}
							</span>
						</div>
						<div className="flex flex-col border-1 rounded-md p-2">
							<span className="text-gray-400 font-semibold text-base">
								Vendor Selection
							</span>
							<span>
								{new Date(
									rfp.timeline.vendorSelection
								).toLocaleDateString()}
							</span>
						</div>
						<div className="flex flex-col border-1 rounded-md p-2">
							<span className="text-gray-400 font-semibold text-base">
								Project Start
							</span>
							<span>
								{new Date(
									rfp.timeline.projectStart
								).toLocaleDateString()}
							</span>
						</div>
						<div className="flex flex-col border-1 rounded-md p-2">
							<span className="text-gray-400 font-semibold text-base">
								Completion
							</span>
							<span>
								{new Date(
									rfp.timeline.completion
								).toLocaleDateString()}
							</span>
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};

export default RFPDetails;
