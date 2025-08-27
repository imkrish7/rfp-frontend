import { DataTable } from "@/components/RFPSTable";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { rfpMachine } from "@/machines/rfpMachine";
import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { Link } from "react-router";

const RFPS = () => {
	const [state, send] = useMachine(rfpMachine);

	useEffect(() => {
		send({ type: "LOAD" });
	}, [send]);

	if (state.matches("loaded") && state.context.rfps.length > 0) {
		const rfps = state.context.rfps;
		return <DataTable data={rfps} />;
	}
	if (state.matches("fetchRFPS")) {
		return <Skeleton />;
	}

	return (
		<div className="w-full flex flex-1 items-center justify-center">
			<div className="">
				<Link to="/rfps/create">
					<Button className="rounded-xl text-xl p-6">
						Add New RFP
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default RFPS;
