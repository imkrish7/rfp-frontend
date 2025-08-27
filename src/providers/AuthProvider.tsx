import { AuthContext } from "@/context/AuthContext";
import { authService } from "@/services/authService";
import { type FC, type ReactNode } from "react";

interface IProps {
	children: ReactNode;
}

const AuthProvider: FC<IProps> = ({ children }) => {
	return (
		<AuthContext.Provider value={authService}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
