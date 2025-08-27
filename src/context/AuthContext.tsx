import { authService } from "@/services/authService";
import { createContext, useContext } from "react";

export const AuthContext = createContext(authService);

export const useAuth = () => {
	return useContext(AuthContext);
};
