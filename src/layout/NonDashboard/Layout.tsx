import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import PrivateRoutes from "@/routes/PrivateRoutes";

export default function Layout() {
	const auth = useAuth();
	return (
		<>
			<div className="min-h-full">
				<div className="mx-auto w-full px-2">
					<div className="flex h-16 items-center justify-between">
						<div className="flex items-center">
							<div className="shrink-0">
								<span className="font-extrabold truncate font-[fangsang] text-4xl text-gray-900">
									Procurer.
								</span>
							</div>
						</div>
						<div>
							<Button
								onClick={() => auth.send({ type: "LOGOUT" })}
							>
								<span>Logout</span>
							</Button>
						</div>
					</div>
				</div>
				<main>
					<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
						<PrivateRoutes />
					</div>
				</main>
			</div>
		</>
	);
}
