"use client";

import * as React from "react";
import {
	FilePenLine,
	LayoutDashboardIcon,
	ReceiptText,
	SignatureIcon,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { NavUser } from "./nav-user";

const data = [
	{
		name: "Dashboard",
		Icon: LayoutDashboardIcon,
		to: "/dashboard",
	},
	{
		name: "Request Proposals",
		Icon: FilePenLine,
		to: "/rfps",
	},
	{
		name: "Contracts",
		Icon: ReceiptText,
		to: "/contract",
	},
	{
		name: "Proposals",
		Icon: SignatureIcon,
		to: "/proposals",
	},
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader className="flex flex-row items-end gap-0">
				<span className="font-[fangsang] text-3xl bg-gray-500 text-white p-1 rounded-sm px-2">
					P
				</span>
				<span className="font-bold truncate font-[fangsang] text-4xl text-gray-500">
					rocurer
				</span>
			</SidebarHeader>
			<div className="h-4" />
			<SidebarContent>
				<SidebarMenu>
					{data.map(({ Icon, name, to }, index) => (
						<SidebarMenuItem key={index}>
							<SidebarMenuButton asChild>
								<Link to={to}>
									<Icon className="w-[16px] h-[16px]" />
									<span className="text-md">{name}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
