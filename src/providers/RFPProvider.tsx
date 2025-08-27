import { RFPContext } from "@/context/RFPContext";
import { rfpService } from "@/services/rfpService";
import type { FC, ReactNode } from "react";

interface IProps {
	children: ReactNode;
}

const RFPProvider: FC<IProps> = ({ children }) => {
	return (
		<RFPContext.Provider value={rfpService}>{children}</RFPContext.Provider>
	);
};

export default RFPProvider;
