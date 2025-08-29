import LoginForm from "@/components/LoginForm";

const Login = () => {
	return (
		<div className="flex items-center justify-center flex-col gap-4 h-[100vh]">
			<div className="flex flex-col gap-2">
				<div className="flex flex-col font-[fangsong]">
					<span className="text-5xl font-semibold text-center">
						Login to Your
					</span>
					<span className="text-5xl font-semibold text-center">
						Account
					</span>
				</div>
				<div className="">
					<span className="text-lg font-[fangsong] font-medium text-gray-500">
						Uncover the Untapped Patential of Your Growth to Connect
						with Clients{" "}
					</span>
				</div>
			</div>

			<div className="mt-4">
				<LoginForm />
			</div>
		</div>
	);
};

export default Login;
