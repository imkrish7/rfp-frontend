import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";

const ProposalForm = () => {
	const form = useForm();

	return (
		<Form {...form}>
			<form className="p-4">
				<FormField
					control={form.control}
					name="summary"
					render={({ field }) => {
						return (
							<FormItem className="w-full">
								<FormLabel
									htmlFor="summary"
									className="text-lg"
								>
									Summary
								</FormLabel>
								<FormControl>
									<Textarea
										id="summary"
										className=""
										placeholder="Add your summary"
										{...field}
									/>
								</FormControl>
							</FormItem>
						);
					}}
				/>
			</form>
		</Form>
	);
};

export default ProposalForm;
