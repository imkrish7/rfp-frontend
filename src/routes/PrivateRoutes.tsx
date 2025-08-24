import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router";

const PrivateRoutes = () => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return <Skeleton />;
	}

	return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
