import { DataTable } from "@/components/RFPSTable";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { rfpMachine } from "@/machines/rfpMachine";
import type { IRFP } from "@/types/rfp";
import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { Link } from "react-router";

const RFPS = () => {
	const [state, send] = useMachine(rfpMachine);

	useEffect(() => {
		send({ type: "LOAD" });
	}, [send]);
	const handleDelete = (row: IRFP) => {
		console.log("Clicked");
		send({ type: "DELETE", rfpId: row.id! });
		console.log(state);
	};
	console.log(state.value);
	return (
		<div className="relative">
			{state.matches("loaded") && state.context.rfps.length > 0 && (
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
						<Link to="/rfps/create">
							<Button className="rounded-xl text-xl p-6">
								Add New RFP
							</Button>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default RFPS;
