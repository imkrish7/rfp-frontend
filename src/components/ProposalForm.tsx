import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProposalSchema } from "@/schema/proposal";
import type z from "zod";
import type { FC } from "react";

interface IProps {
	handleSubmit: (data: z.infer<typeof ProposalSchema>) => void;
}

const ProposalForm: FC<IProps> = ({ handleSubmit }) => {
	const form = useForm({
		resolver: zodResolver(ProposalSchema),
		defaultValues: {
			cost: 0,
			description: "",
			title: "",
		},
	});
	console.log(form.formState.errors);
	return (
		<Form {...form}>
			<form className="p-4" onSubmit={form.handleSubmit(handleSubmit)}>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => {
						return (
							<FormItem className="w-full">
								<FormLabel htmlFor="title" className="text-lg">
									Title
								</FormLabel>
								<FormControl>
									<Input
										id="title"
										className=""
										placeholder="Add your title"
										{...field}
									/>
								</FormControl>
							</FormItem>
						);
					}}
				/>
				<FormField
					control={form.control}
					name="cost"
					render={({ field }) => {
						return (
							<FormItem className="w-full">
								<FormLabel htmlFor="cost" className="text-lg">
									Cost
								</FormLabel>
								<FormControl>
									<Input
										id="cost"
										type="number"
										className=""
										placeholder="Add your cost"
										{...field}
										value={field.value ?? 0}
										onChange={(e) =>
											field.onChange(
												e.target.value === ""
													? 0
													: Number(e.target.value)
											)
										}
									/>
								</FormControl>
							</FormItem>
						);
					}}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => {
						return (
							<FormItem className="w-full">
								<FormLabel
									htmlFor="summary"
									className="text-lg"
								>
									Description
								</FormLabel>
								<FormControl>
									<Textarea
										id="summary"
										className=""
										placeholder="Add your description of proposal"
										{...field}
									/>
								</FormControl>
							</FormItem>
						);
					}}
				/>
				<div className="h-4" />
				<div className="flex py-2 justify-end">
					<Button>Draft</Button>
				</div>
			</form>
		</Form>
	);
};

export default ProposalForm;
