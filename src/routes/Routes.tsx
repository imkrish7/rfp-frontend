import PrivateLayout from "@/layout/private/PrivateLayout";
import PublicLayout from "@/layout/public/PublicLayout";
import Contract from "@/pages/Contract";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import RFPLayout from "@/pages/rfps";
import RFPS from "@/pages/rfps/RFPs";
import CreateRFP from "@/pages/rfps/CreateRFP";
import Signup from "@/pages/Signup";
import { createBrowserRouter } from "react-router";
import OrganisationRoutes from "./OrganisationRoutes";
import RFPView from "@/pages/rfps/RFPView";

export const routers = createBrowserRouter([
	{
		path: "/",
		Component: PublicLayout,
		children: [
			{
				path: "/",
				index: true,
				Component: Home,
			},
			{
				path: "/login",
				Component: Login,
			},
			{
				path: "/signup",
				Component: Signup,
			},
		],
	},

	{
		path: "/",
		Component: PrivateLayout,
		children: [
			{
				path: "/dashboard",
				index: true,
				Component: Dashboard,
			},
			{
				path: "/rfps",
				Component: RFPLayout,
				children: [
					{
						index: true,
						Component: RFPS,
					},
					{
						path: "/rfps/:rfpId",
						Component: RFPView,
					},
					{
						path: "/rfps/create",
						Component: OrganisationRoutes,
						children: [
							{
								index: true,
								Component: CreateRFP,
							},
						],
					},
				],
			},
			{
				path: "/contract",
				index: true,
				Component: Contract,
			},
		],
	},
]);
