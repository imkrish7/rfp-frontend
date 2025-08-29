import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MoveRightIcon } from "lucide-react";
import { LoginSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";

const LoginForm = () => {
	const [redirect, setRedirect] = useState<string | null>(null);
	const auth = useAuth();
	const form = useForm({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const handleLogin = (data: z.infer<typeof LoginSchema>) => {
		auth?.send({ type: "LOGIN", loginCredentials: data });
	};

	useEffect(() => {
		const subscription = auth.subscribe((snapshot) => {
			if (snapshot.matches("activateAccount")) {
				setRedirect("/verify");
			} else if (snapshot.matches({ authorized: "dashboard" })) {
				setRedirect("/dashboard");
			}
		});
		return () => subscription.unsubscribe();
	}, [auth]);

	if (redirect) {
		return <Navigate to={redirect} />;
	}

	return (
		<Card className="w-[500px] border-none shadow-none bg-transparent">
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleLogin)}>
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
							<Button className="rounded-3xl w-[250px] py-6 flex justify-between items-center bg-gray-400">
								<span>Login to Your Account</span>
								<span>
									<MoveRightIcon />
								</span>
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
			{/* <CardFooter>
				<span>Forget Password?</span>
			</CardFooter> */}
		</Card>
	);
};

export default LoginForm;
