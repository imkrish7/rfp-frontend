/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Attachment, IRFP, RFPStatus } from "@/types/rfp";
import { Badge } from "./ui/badge";

interface IProps {
	details: {
		rfp: IRFP;
		attachments: Partial<Attachment>[] | undefined;
	};
	action: (action: any, status?: RFPStatus) => void;
}

const STATUS: Record<RFPStatus, string> = {
	DRAFT: "bg-green-400/10 outline-green-600 text-green-600",
};

export default function RFPPreview({ details, action }: IProps) {
	const { rfp, attachments } = details;
	return (
		<div>
			<div className="">
				<div className="grid grid-cols-3 border-b border-white/10 pb-12">
					<div>
						<h2 className="text-base/7 font-semibold text-gray">
							RFP Details
						</h2>
						<p className="mt-1 text-sm/6 text-gray-400">
							This information will be displayed publicly so be
							careful what you share.
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
										{rfp.title}
									</div>
								</div>
							</div>
							<div className="absolute right-0 top-0">
								<Badge
									className={`${
										STATUS[rfp.status]
									} rounded-none outline-2 `}
								>
									{rfp.status}
								</Badge>
							</div>
						</div>

						<div className="col-span-full">
							<div className="flex justify-between">
								<div>
									<span className="block text-sm/6 font-medium text-gray">
										Issued By
									</span>
									<div className="mt-2">
										<p className="block w-full rounded-md bg-white/5 text-base text-gray sm:text-sm/6">
											{rfp.issuedBy}
										</p>
									</div>
								</div>
								<div>
									<span className="block text-sm/6 font-medium text-gray">
										Deadline
									</span>
									<div className="mt-2">
										<p className="block w-full rounded-md bg-white/5 text-base text-gray sm:text-sm/6">
											{rfp.deadline}
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="col-span-full">
							<span className="block text-sm/6 font-medium text-gray">
								Description
							</span>
							<div className="mt-2">
								<p className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray outline-1 -outline-offset-1 outline-gray/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6">
									{rfp.description}
								</p>
							</div>
						</div>

						<div className="col-span-full">
							<span className="block text-sm/6 font-medium text-gray">
								Scope Of Work
							</span>
							<div className="mt-2">
								<p className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray outline-1 -outline-offset-1 outline-gray/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6">
									{rfp.scopeOfWork}
								</p>
							</div>
						</div>

						<div className="col-span-full">
							<span className="block text-sm/6 font-medium text-gray">
								Deliverables
							</span>
							<div className="mt-2">
								<p className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray outline-1 -outline-offset-1 outline-gray/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6">
									{rfp.deliverables}
								</p>
							</div>
						</div>
						<div className="col-span-full">
							<span className="block text-sm/6 font-medium text-gray">
								Evaluation Criteria
							</span>
							<div className="mt-2">
								<p className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray outline-1 -outline-offset-1 outline-gray/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6">
									{rfp.evaluationCriteria}
								</p>
							</div>
						</div>
						<div className="col-span-full">
							<span className="block text-sm/6 font-medium text-gray">
								Timelines
							</span>
							<div className="mt-2">
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
				<button
					type="button"
					className="text-sm/6 font-semibold text-gray outline-2 rounded-md px-3 py-2"
					onClick={() => {
						action("CANCEL");
					}}
				>
					Keep it Drafted
				</button>
				<button
					type="submit"
					className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-gray focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
					onClick={() => {
						action("PUBLISH", "PUBLISHED");
					}}
				>
					Publish
				</button>
				<button
					type="submit"
					className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-gray focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
					onClick={() => {
						action("UNDER_REVIEW", "UNDER_REVIEW");
					}}
				>
					Under Review
				</button>
			</div>
		</div>
	);
}
