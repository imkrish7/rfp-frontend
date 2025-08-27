import RFPForm from "@/components/RFPForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CreateRFP = () => {
	return (
		<Card className="border-none rounded-none">
			<CardHeader>
				<CardTitle className="text-3xl font-[fangsang]">
					Create a RFP
				</CardTitle>
			</CardHeader>
			<CardContent>
				<RFPForm rfp={null} />
			</CardContent>
		</Card>
	);
};

export default CreateRFP;
