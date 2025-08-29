import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { SiteHeader } from "./site-header";
import PrivateRoutes from "@/routes/PrivateRoutes";
import { ThemeProvider } from "@/providers/ThemeProvider";

export default function PrivateLayout() {
	return (
		<ThemeProvider>
			<SidebarProvider
				style={
					{
						"--sidebar-width": "calc(var(--spacing) * 72)",
						"--header-height": "calc(var(--spacing) * 12)",
					} as React.CSSProperties
				}
			>
				<AppSidebar variant="inset" />
				<SidebarInset>
					<SiteHeader />
					<div className="flex flex-1 flex-col">
						<PrivateRoutes />
					</div>
				</SidebarInset>
			</SidebarProvider>
		</ThemeProvider>
	);
}
