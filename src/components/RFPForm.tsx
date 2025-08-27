import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns/format";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import type { IRFP } from "@/types/rfp";
import type { BaseSyntheticEvent, FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { rfpSchema } from "@/schema/rfp";
import type z from "zod";
import { useMachine } from "@xstate/react";
import { rfpMachine } from "@/machines/rfpMachine";
import { Navigate } from "react-router";

interface IProps {
	rfp: IRFP | null;
}

const RFPForm: FC<IProps> = ({ rfp }) => {
	const [state, send] = useMachine(rfpMachine);
	let initialValue: z.infer<typeof rfpSchema | undefined> = {
		title: "",
		issuedBy: "",
		issuedDate: "",
		scopeOfWork: "",
		timeline: {
			completion: new Date(),
			projectStart: new Date(),
			proposalSubmission: new Date(),
			vendorSelection: new Date(),
		},
		evaluationCriteria: "",
		deliverables: "",
		description: "",
		deadline: "",
		status: "",
		proposalLimit: undefined,
		createdAt: "",
		updatedAt: "",
	};
	if (rfp) {
		initialValue = {
			...rfp,
			deadline: new Date(rfp!.deadline),
			timeline: {
				completion: new Date(rfp!.timeline.completion),
				projectStart: new Date(rfp!.timeline.projectStart),
				proposalSubmission: new Date(rfp!.timeline.proposalSubmission),
				vendorSelection: new Date(rfp!.timeline.vendorSelection),
			},
		};
	}
	const form = useForm({
		resolver: zodResolver(rfpSchema),
		defaultValues: {
			...initialValue!,
		},
	});
	const handleSubmit = (
		data: z.infer<typeof rfpSchema>,
		e?: BaseSyntheticEvent
	) => {
		const action = (e?.nativeEvent as SubmitEvent).submitter?.getAttribute(
			"data-action"
		);
		send({
			type: "NEW",
			newRFP: {
				...data,
				status: action!,
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
				orgId: rfp?.orgId ?? "",
			},
		});
	};
	console.log(state.value);

	if (state.matches("newRFPAdded")) {
		return <Navigate to="/rfps" />;
	}
	return (
		<Form {...form}>
			<form className="p-4" onSubmit={form.handleSubmit(handleSubmit)}>
				<div className="flex gap-4 w-full flex-col md:flex-row">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => {
							return (
								<FormItem className="w-full">
									<FormLabel
										htmlFor="title"
										className="text-lg"
									>
										Title
									</FormLabel>
									<FormControl>
										<Input
											id="title"
											className="py-6 rounded-3xl"
											placeholder="Title..."
											{...field}
										/>
									</FormControl>
								</FormItem>
							);
						}}
					/>
					<FormField
						control={form.control}
						name="deadline"
						render={({ field }) => {
							return (
								<FormItem className="flex flex-col w-full">
									<FormLabel
										htmlFor="deadline"
										className="text-lg"
									>
										Deadline
									</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"py-6  pl-3 text-left font-normal rounded-3xl"
													)}
												>
													{field.value ? (
														format(
															field.value,
															"PPP"
														)
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent
											className="w-auto p-0"
											align="start"
										>
											<Calendar
												mode="single"
												id="deadline"
												selected={
													new Date(field.value!)
												}
												onSelect={field.onChange}
												disabled={(date) =>
													date <
													new Date("1900-01-01")
												}
												captionLayout="dropdown"
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
				</div>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => {
						return (
							<FormItem className="w-full">
								<FormLabel
									htmlFor="description"
									className="text-lg"
								>
									Description
								</FormLabel>
								<FormControl>
									<Textarea
										id="description"
										className=""
										placeholder="Add your description"
										{...field}
									/>
								</FormControl>
							</FormItem>
						);
					}}
				/>
				<FormField
					control={form.control}
					name="scopeOfWork"
					render={({ field }) => {
						return (
							<FormItem className="w-full">
								<FormLabel id="scopeOfWork" className="text-lg">
									Scope Of Work
								</FormLabel>
								<FormControl>
									<Textarea
										id="scopeOfWork"
										className=""
										placeholder="Add your description"
										{...field}
									/>
								</FormControl>
							</FormItem>
						);
					}}
				/>
				<FormField
					control={form.control}
					name="evaluationCriteria"
					render={({ field }) => {
						return (
							<FormItem className="w-full">
								<FormLabel
									htmlFor="evaluationCriteria"
									className="text-lg"
								>
									Evaluation Criteria
								</FormLabel>
								<FormControl>
									<Textarea
										id="evaluationCriteria"
										className=""
										placeholder="Add your description"
										{...field}
									/>
								</FormControl>
							</FormItem>
						);
					}}
				/>
				<FormField
					control={form.control}
					name="deliverables"
					render={({ field }) => {
						return (
							<FormItem className="w-full">
								<FormLabel
									htmlFor="deliverables"
									className="text-lg"
								>
									Deliverables
								</FormLabel>
								<FormControl>
									<Textarea
										id="deliverables"
										className=""
										placeholder="Add your description"
										{...field}
									/>
								</FormControl>
							</FormItem>
						);
					}}
				/>
				<div className="flex flex-col gap-2 sm:flex-col">
					<span className="text-2xl font-bold">Timelines</span>
					<div className="flex gap-4 md:flex-row w-full flex-col">
						<FormField
							control={form.control}
							name="timeline.proposalSubmission"
							render={({ field }) => {
								return (
									<FormItem className="flex flex-col w-full">
										<FormLabel
											htmlFor="submission"
											className="text-lg"
										>
											Proposal Submission
										</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"py-6  pl-3 text-left font-normal rounded-3xl"
														)}
													>
														{field.value ? (
															format(
																field.value,
																"PPP"
															)
														) : (
															<span>
																Pick a date
															</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent
												className="w-auto p-0"
												align="start"
											>
												<Calendar
													mode="single"
													id="submission"
													selected={
														new Date(field.value)
													}
													onSelect={field.onChange}
													disabled={(date) =>
														date <
														new Date("1900-01-01")
													}
													captionLayout="dropdown"
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="timeline.vendorSelection"
							render={({ field }) => {
								return (
									<FormItem className="flex flex-col w-full">
										<FormLabel
											htmlFor="selection"
											className="text-lg"
										>
											Vendor Selection
										</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"py-6  pl-3 text-left font-normal rounded-3xl"
														)}
													>
														{field.value ? (
															format(
																field.value,
																"PPP"
															)
														) : (
															<span>
																Pick a date
															</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent
												className="w-auto p-0"
												align="start"
											>
												<Calendar
													mode="single"
													id="selection"
													selected={
														new Date(field.value)
													}
													onSelect={field.onChange}
													disabled={(date) =>
														date <
														new Date("1900-01-01")
													}
													captionLayout="dropdown"
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
					</div>
					<div className="flex gap-4 md:flex-row w-full flex-col">
						<FormField
							control={form.control}
							name="timeline.projectStart"
							render={({ field }) => {
								return (
									<FormItem className="flex flex-col w-full">
										<FormLabel
											htmlFor="start"
											className="text-lg"
										>
											Project Start
										</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"py-6  pl-3 text-left font-normal rounded-3xl"
														)}
													>
														{field.value ? (
															format(
																field.value,
																"PPP"
															)
														) : (
															<span>
																Pick a date
															</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent
												className="w-auto p-0"
												align="start"
											>
												<Calendar
													mode="single"
													id="start"
													selected={
														new Date(field.value)
													}
													onSelect={field.onChange}
													disabled={(date) =>
														date <
														new Date("1900-01-01")
													}
													captionLayout="dropdown"
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="timeline.completion"
							render={({ field }) => {
								return (
									<FormItem className="flex flex-col w-full">
										<FormLabel
											htmlFor="completion"
											className="text-lg"
										>
											Project Completion
										</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"py-6  pl-3 text-left font-normal rounded-3xl"
														)}
													>
														{field.value ? (
															format(
																field.value,
																"PPP"
															)
														) : (
															<span>
																Pick a date
															</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent
												className="w-auto p-0"
												align="start"
											>
												<Calendar
													mode="single"
													id="completion"
													selected={
														new Date(field.value)
													}
													onSelect={field.onChange}
													disabled={(date) =>
														date <
														new Date("1900-01-01")
													}
													captionLayout="dropdown"
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
					</div>
					<div className="flex mt-2">
						<div className="flex gap-2">
							<Button
								type="submit"
								className="py-2"
								data-action="DRAFT"
							>
								Save to Draft
							</Button>
							<Button
								type="submit"
								className="py-2"
								data-action="PUBLISHED"
							>
								Publish
							</Button>
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default RFPForm;
