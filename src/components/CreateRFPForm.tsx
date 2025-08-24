import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns/format";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";

const CreateRFPForm = () => {
	const form = useForm();
	return (
		<FormProvider {...form}>
			<Form {...form}>
				<form>
					<div className="flex gap-4 w-full flex-col md:flex-row">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => {
								return (
									<FormItem className="w-full">
										<FormLabel className="text-lg">
											Title
										</FormLabel>
										<FormControl>
											<Input
												className="py-6 rounded-3xl"
												placeholder="title"
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
										<FormLabel className="text-lg">
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
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) =>
														date > new Date() ||
														date <
															new Date(
																"1900-01-01"
															)
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
									<FormLabel className="text-lg">
										Description
									</FormLabel>
									<FormControl>
										<Textarea
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
						name="ScopeOfWork"
						render={({ field }) => {
							return (
								<FormItem className="w-full">
									<FormLabel className="text-lg">
										Scope Of Work
									</FormLabel>
									<FormControl>
										<Textarea
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
									<FormLabel className="text-lg">
										Evaluation Criteria
									</FormLabel>
									<FormControl>
										<Textarea
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
									<FormLabel className="text-lg">
										Deliverables
									</FormLabel>
									<FormControl>
										<Textarea
											className=""
											placeholder="Add your description"
											{...field}
										/>
									</FormControl>
								</FormItem>
							);
						}}
					/>
					<div>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => {
								return (
									<FormItem className="w-full">
										<FormLabel className="text-lg">
											Attachments
										</FormLabel>
										<FormControl>
											<Input
												id="picture"
												{...field}
												type="file"
											/>
										</FormControl>
									</FormItem>
								);
							}}
						/>
					</div>
					<div className="flex flex-col gap-2 sm:flex-col">
						<FormLabel className="text-2xl font-bold">
							Timelines
						</FormLabel>
						<div className="flex gap-4 md:flex-row w-full flex-col">
							<FormField
								control={form.control}
								name="deadline"
								render={({ field }) => {
									return (
										<FormItem className="flex flex-col w-full">
											<FormLabel className="text-lg">
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
														selected={field.value}
														onSelect={
															field.onChange
														}
														disabled={(date) =>
															date > new Date() ||
															date <
																new Date(
																	"1900-01-01"
																)
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
								name="deadline"
								render={({ field }) => {
									return (
										<FormItem className="flex flex-col w-full">
											<FormLabel className="text-lg">
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
														selected={field.value}
														onSelect={
															field.onChange
														}
														disabled={(date) =>
															date > new Date() ||
															date <
																new Date(
																	"1900-01-01"
																)
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
								name="deadline"
								render={({ field }) => {
									return (
										<FormItem className="flex flex-col w-full">
											<FormLabel className="text-lg">
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
														selected={field.value}
														onSelect={
															field.onChange
														}
														disabled={(date) =>
															date > new Date() ||
															date <
																new Date(
																	"1900-01-01"
																)
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
								name="deadline"
								render={({ field }) => {
									return (
										<FormItem className="flex flex-col w-full">
											<FormLabel className="text-lg">
												Project Submission
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
														selected={field.value}
														onSelect={
															field.onChange
														}
														disabled={(date) =>
															date > new Date() ||
															date <
																new Date(
																	"1900-01-01"
																)
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
								<Button className="py-2">Save to Draft</Button>
								<Button className="py-2">Publish</Button>
							</div>
						</div>
					</div>
				</form>
			</Form>
		</FormProvider>
	);
};

export default CreateRFPForm;
