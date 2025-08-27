import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router";
import { toast } from "sonner";

const VendorRoutes = () => {
	const auth = useAuth();
	const userRole = auth.getSnapshot().context.loginResponse?.role;
	if (userRole === "VENDOR") {
		return <Outlet />;
	}
	toast.warning("Invalid Path, Redirecting...");
	return <Navigate to="/dashboard" />;
};

export default VendorRoutes;
