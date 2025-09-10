import { Badge } from "./ui/badge";
import { useAuth } from "@/context/AuthContext";

import type {
	IProposal,
	IUploadedAttachments,
	ProposalStatus,
} from "@/types/proposal";

interface IProps {
	details: {
		proposal: IProposal;
		attachments: IUploadedAttachments[] | undefined;
	};
	action: (action: string) => void;
}

const STATUS: Record<ProposalStatus, string> = {
	DRAFT: "bg-green-400/10 outline-green-600 text-green-600",
	UNDER_REVIEW: "",
	APPROVED: "",
	REJECTED: "",
	RESUBMIT: "",
	SUBMITTED: "",
};

export default function ProposalView({ details, action }: IProps) {
	const { proposal, attachments } = details;
	const auth = useAuth();
	const role = auth.getSnapshot().context.loginResponse?.role;
	return (
		<div>
			<div className="">
				<div className="grid grid-cols-3 border-b border-white/10 pb-12">
					<div>
						<h2 className="text-base/7 font-semibold text-gray">
							Propsal Details
						</h2>
						<p className="mt-1 text-sm/6 text-gray-400">
							This information should be accurate so be careful
							what you share.
						</p>
					</div>

					<div className="col-span-2 grid grid-cols-1 gap-x-6 gap-y-8">
						<div className="relative">
							<span className="block text-sm/6 font-medium text-gray">
								Title
							</span>
							<div className="mt-2">
								<div className="flex items-center rounded-md">
									<div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
										{proposal.cost}
									</div>
								</div>
							</div>
							<div className="absolute right-0 top-0">
								<Badge
									className={`${
										STATUS[proposal.status]
									} rounded-none outline-2 `}
								>
									{proposal.status}
								</Badge>
							</div>
						</div>

						<div className="col-span-full">
							<span className="block text-sm/6 font-medium text-gray">
								Description
							</span>
							<div className="mt-2">
								<p className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray outline-1 -outline-offset-1 outline-gray/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6">
									{proposal.description}
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="border-b border-white/10 pb-12">
					<h2 className="text-base/7 font-semibold text-gray">
						Attachments
					</h2>
					<p className="mt-1 text-sm/6 text-gray-400">
						Use a permanent address where you can receive mail.
					</p>

					<div className="mt-10">
						<div
							id="detailed-pricing"
							className="w-full h-[350px] "
						>
							<div className="relative">
								<div className="h-[50px]absolute top-0 left-0 right-0 w-full z-10">
									<div className="grid grid-cols-3 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
										<div className="flex items-center">
											Name
										</div>
										<div>Type</div>
										<div>Status</div>
									</div>
								</div>
								<div className="-z-3 h-[300px] overflow-y-auto overflow-hidden">
									{attachments &&
										attachments.length > 0 &&
										attachments.map((attachment, index) => {
											return (
												<div
													key={index}
													className="grid grid-cols-3 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700"
												>
													<div className="text-gray-500 dark:text-gray-400">
														{attachment!.filename}
													</div>
													<div>
														{attachment!
															.filetype!.split(
																"/"
															)[1]
															.toLocaleUpperCase()}
													</div>
													<div className="flex items-center gap-2">
														{attachment!.status}
													</div>
												</div>
											);
										})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 flex items-center justify-end gap-x-6">
				{role === "VENDOR" && (
					<>
						<button
							type="button"
							className="text-sm/6 font-semibold text-gray outline-2 rounded-md px-3 py-2"
							onClick={() => {
								action("CANCEL");
							}}
						>
							Keep it Drafted
						</button>
						{proposal.status !== "SUBMITTED" && (
							<button
								type="submit"
								className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-gray focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
								onClick={() => {
									action("PUBLISH");
								}}
							>
								Submit
							</button>
						)}
						<button
							type="submit"
							className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-gray focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
							onClick={() => {
								action("UNDER_REVIEW");
							}}
						>
							Under Review
						</button>
					</>
				)}
			</div>
		</div>
	);
}
