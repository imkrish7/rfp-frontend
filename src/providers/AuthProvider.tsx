import { AuthContext } from "@/context/AuthContext";
import {
	useEffect,
	useState,
	useTransition,
	type FC,
	type ReactNode,
} from "react";

interface IProps {
	children: ReactNode;
}

const AuthProvider: FC<IProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
	const [userRole, setUserRole] = useState<
		"ADMIN" | "PROCUREMENT" | "VENDOR" | undefined
	>("PROCUREMENT");

	const [isLoading, startTransition] = useTransition();

	useEffect(() => {
		startTransition(async () => {});
	}, []);

	const login = async (role: "ADMIN" | "PROCUREMENT" | "VENDOR") => {
		setIsAuthenticated(true);
		setUserRole(role);
	};

	const logout = () => {
		setIsAuthenticated(false);
		setUserRole(undefined);
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, isLoading, login, logout, userRole }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
