import { rfpService } from "@/services/rfpService";
import { createContext, useContext } from "react";

export const RFPContext = createContext(rfpService);

export const useRFP = () => useContext(RFPContext);
