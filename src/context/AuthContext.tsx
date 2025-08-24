import { createContext, useContext } from "react";

interface IAuthContext {
	isAuthenticated: boolean;
	isLoading: boolean;
	userRole: "ADMIN" | "VENDOR" | "PROCUREMENT" | undefined;
	login: (role: "ADMIN" | "PROCUREMENT" | "VENDOR") => Promise<void>;
	logout: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be inside AuthProvider!");
	return ctx;
};
