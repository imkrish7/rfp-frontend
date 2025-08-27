import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

const PrivateRoutes = () => {
	const [redirect, setRedirect] = useState<string | null>();
	const auth = useAuth();
	const isAuthenticated = auth?.getSnapshot().context.isAuthenticated;

	useEffect(() => {
		const subscribe = auth.subscribe((state) => {
			console.log(state);
			if (state.matches("unauthorized")) {
				setRedirect("login");
				console.log("auskdfks");
			}
		});
		return () => subscribe.unsubscribe();
	}, [auth]);

	return isAuthenticated && !redirect ? (
		<Outlet />
	) : (
		<Navigate to="/login" replace />
	);
};

export default PrivateRoutes;
