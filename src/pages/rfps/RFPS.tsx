import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const RFPS = () => {
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
