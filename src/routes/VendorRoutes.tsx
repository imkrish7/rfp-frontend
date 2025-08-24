import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router";
import { toast } from "sonner";

const VendorRoutes = () => {
	const { userRole } = useAuth();
	console.log(userRole);
	if (userRole === "VENDOR") {
		return <Outlet />;
	}
	toast.warning("Invalid Path, Redirecting...");
	return <Navigate to="/dashboard" />;
};

export default VendorRoutes;
