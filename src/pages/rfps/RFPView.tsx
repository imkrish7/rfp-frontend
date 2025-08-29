// import RFPDetails from "@/components/RFPDetails";
import RFPPreview from "@/components/RFPPreview";
import { Skeleton } from "@/components/ui/skeleton";
import { rfpMachine } from "@/machines/rfpMachine";
import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { useParams } from "react-router";

const RFPView = () => {
	const [state, send] = useMachine(rfpMachine);
	const params = useParams();
	useEffect(() => {
		if (params.rfpId) {
			send({ type: "VIEW", rfpId: params.rfpId });
		}
	}, [send, params]);
	if (state.matches("view") || !state.context.viewRFP) {
		return <Skeleton />;
	}

	const { attachments, ...rfp } = state.context.viewRFP;

	return (
		<div className="p-4">
			<RFPPreview
				details={{
					rfp,
					attachments,
				}}
				action={() => {}}
			/>
		</div>
	);
};

export default RFPView;
