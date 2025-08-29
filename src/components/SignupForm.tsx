import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MoveRightIcon } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

const SignupForm = () => {
	const form = useForm();
	return (
		<Card className="w-[500px] border-none shadow-none bg-transparent">
			<CardContent>
				<Form {...form}>
					<div className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel className="text-lg text-gray-400">
											Email
										</FormLabel>
										<FormControl>
											<Input
												className="py-6 rounded-3xl placeholder:text-gray-200 text-gray-400"
												placeholder="Email..."
												{...field}
											/>
										</FormControl>
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel className="text-lg text-gray-400">
											Password
										</FormLabel>
										<FormControl>
											<Input
												className="py-6 rounded-3xl placeholder:text-gray-200 text-gray-400"
												placeholder="********"
												{...field}
											/>
										</FormControl>
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg text-gray-400">
										Who are you?
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="rounded-3xl w-full py-6 placeholder:text-gray-200 text-gray-400">
												<SelectValue placeholder="Select who are you ? " />
											</SelectTrigger>
										</FormControl>
										<SelectContent className="rounded-xl">
											<SelectItem value="VENDOR">
												Vendor
											</SelectItem>
											<SelectItem value="PROCUREMENT">
												Organisation
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className="rounded-3xl w-[250px] py-6 flex justify-between items-center bg-gray-400">
							<span>Create Your Account</span>
							<span>
								<MoveRightIcon />
							</span>
						</Button>
					</div>
				</Form>
			</CardContent>
			{/* <CardFooter>
                <span>Forget Password?</span>
            </CardFooter> */}
		</Card>
	);
};

export default SignupForm;
