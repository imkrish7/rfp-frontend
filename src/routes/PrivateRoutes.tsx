import { Splash } from "@/components/screenloader/Splash";
import { useAuth } from "@/context/AuthContext";
import { useActor } from "@xstate/react";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

const PrivateRoutes = () => {
	const [redirect, setRedirect] = useState<string | null>();
	const auth = useAuth();
	const [state] = useActor(auth.logic);
	// const state = auth?.getSnapshot();
	const isAuthenticated = state.context.isAuthenticated;

	useEffect(() => {
		const subscribe = auth.subscribe((state) => {
			if (state.matches("unauthorized")) {
				setRedirect("login");
			}
		});
		return () => subscribe.unsubscribe();
	}, [auth]);

	if (state.matches({ unauthorized: "authenticate" })) {
		return <Splash />;
	}

	return isAuthenticated && !redirect ? (
		<Outlet />
	) : (
		<Navigate to="/login" replace />
	);
};

export default PrivateRoutes;
