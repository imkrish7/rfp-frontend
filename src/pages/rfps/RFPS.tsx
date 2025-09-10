import { DataTable } from "@/components/RFPSTable";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { rfpMachine } from "@/machines/rfpMachine";
import type { IRFP } from "@/types/rfp";
import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { Link } from "react-router";

const RFPS = () => {
	const auth = useAuth();

	const [state, send] = useMachine(rfpMachine);
	const role = auth.getSnapshot().context.loginResponse?.role;

	useEffect(() => {
		send({ type: "LOAD" });
	}, [send]);
	const handleDelete = (row: IRFP) => {
		send({ type: "DELETE", rfpId: row.id! });
	};
	return (
		<div className="relative flex flex-col flex-1">
			{state.matches("loaded") &&
				role === "PROCUREMENT" &&
				state.context.rfps.length > 0 && (
					<div className="flex justify-end p-2">
						<Link to="/rfps/create">
							<Button>Create New RFP</Button>
						</Link>
					</div>
				)}
			{state.matches("loaded") && state.context.rfps.length > 0 && (
				<>
					<DataTable
						handleDelete={handleDelete}
						data={state.context.rfps}
					/>
				</>
			)}
			{state.matches("fetchRFPS") && <Skeleton />}
			{state.context.rfps.length == 0 && (
				<div className="w-full flex flex-1 items-center justify-center">
					<div className="">
						{role === "PROCUREMENT" ? (
							<Link to="/rfps/create">
								<Button className="rounded-xl text-xl p-6">
									Add New RFP
								</Button>
							</Link>
						) : (
							<p>No rfp available</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default RFPS;
