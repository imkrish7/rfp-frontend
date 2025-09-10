import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrganisationSchema } from "@/schema/auth";
import type z from "zod";
import { useAuth } from "@/context/AuthContext";
import { useActor } from "@xstate/react";
import { Navigate } from "react-router";
import { toast } from "sonner";

export default function OrganisationProfile() {
	const auth = useAuth();
	const [state, send] = useActor(auth?.logic);
	const form = useForm({
		resolver: zodResolver(OrganisationSchema),
		defaultValues: {
			website: "",
			name: "",
			logo: "",
			description: "",
		},
	});

	const handleSubmit = async (data: z.infer<typeof OrganisationSchema>) => {
		send({
			type: "CREATE_PROFILE",
			profileData: { ...data, role: "organisation" },
		});
	};
	if (state.matches({ authorized: "profileCreateError" })) {
		toast.error("Something went wrong!");
	}
	if (state.matches({ authorized: "dashboard" })) {
		return <Navigate to="/dashboard" />;
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<div className="space-y-12">
					<div className="border-b pb-12">
						<h2 className="text-base/7 font-semibold">Profile</h2>
						<p className="mt-1 text-sm/6 ">
							This information will be displayed publicly so be
							careful what you share.
						</p>

						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div className="sm:col-span-3">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => {
										return (
											<FormItem>
												<FormLabel className=" ">
													Name
												</FormLabel>
												<FormControl>
													<Input
														className="py-6 placeholder:text-gray-200 "
														placeholder="Name..."
														{...field}
													/>
												</FormControl>
											</FormItem>
										);
									}}
								/>
							</div>
							<div className="sm:col-span-3">
								<FormField
									control={form.control}
									name="website"
									render={({ field }) => {
										return (
											<FormItem>
												<FormLabel className=" ">
													Website
												</FormLabel>
												<FormControl>
													<Input
														className="py-6 placeholder:text-gray-200 "
														placeholder="example.com"
														{...field}
													/>
												</FormControl>
											</FormItem>
										);
									}}
								/>
							</div>

							<div className="col-span-full">
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => {
										return (
											<FormItem>
												<FormLabel className=" ">
													Description
												</FormLabel>
												<FormControl>
													<Textarea
														className="py-6 placeholder:text-gray-200 "
														placeholder="Description..."
														{...field}
													/>
												</FormControl>
											</FormItem>
										);
									}}
								/>
								<p className="mt-3 text-sm/6 ">
									Write a few sentences about yourself.
								</p>
							</div>
						</div>
					</div>

					{/* <div className="border-b border-white/10 pb-12">
						<h2 className="text-base/7 font-semibold ">
							Important Information
						</h2>
						<p className="mt-1 text-sm/6 ">
							Please fill with the best of your knowledge.
						</p>

						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div className="sm:col-span-3">
								<FormField
									control={form.control}
									name="contactPerson"
									render={({ field }) => {
										return (
											<FormItem>
												<FormLabel className=" ">
													Contact Person
												</FormLabel>
												<FormControl>
													<Input
														className="py-6 placeholder:text-gray-200 "
														placeholder="Peter..."
														{...field}
													/>
												</FormControl>
											</FormItem>
										);
									}}
								/>
							</div>
							<div className="sm:col-span-3">
								<FormField
									control={form.control}
									name="gstin"
									render={({ field }) => {
										return (
											<FormItem>
												<FormLabel className=" ">
													GSTIN
												</FormLabel>
												<FormControl>
													<Input
														className="py-6 placeholder:text-gray-200 "
														placeholder="u1vl5jwj1241..."
														{...field}
													/>
												</FormControl>
											</FormItem>
										);
									}}
								/>
							</div>
							<div className="sm:col-span-3">
								<FormField
									control={form.control}
									name="contactEmail"
									render={({ field }) => {
										return (
											<FormItem>
												<FormLabel className=" ">
													Contact Email
												</FormLabel>
												<FormControl>
													<Input
														className="py-6 placeholder:text-gray-200 "
														placeholder="Name..."
														{...field}
													/>
												</FormControl>
											</FormItem>
										);
									}}
								/>
							</div>
						</div>
					</div> */}
				</div>
				<div className="mt-6 flex items-center justify-end gap-x-6">
					<Button
						type="submit"
						className="rounded-md px-3 py-2 text-sm font-semibold  focus-visible:outline-2 focus-visible:outline-offset-2"
					>
						Save
					</Button>
				</div>
			</form>
		</Form>
	);
}
