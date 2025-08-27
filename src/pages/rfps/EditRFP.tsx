import RFPForm from "@/components/RFPForm";
import { Skeleton } from "@/components/ui/skeleton";
import { rfpMachine } from "@/machines/rfpMachine";
import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { useParams } from "react-router";

const EditRFP = () => {
	const params = useParams();
	const [state, send] = useMachine(rfpMachine);

	useEffect(() => {
		if (params.rfpId) {
			send({ type: "EDIT", rfpId: params.rfpId });
		}
	}, [send, params]);

	if (state.matches("edit")) {
		return <Skeleton />;
	}

	return <RFPForm rfp={state.context.editRFP} />;
};

export default EditRFP;
