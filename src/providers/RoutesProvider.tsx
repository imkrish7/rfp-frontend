import { routers } from "@/routes/Routes";
import { RouterProvider } from "react-router";

export const RoutesProvider = () => {
	return <RouterProvider router={routers} />;
};
