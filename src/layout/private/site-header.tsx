import { ModeToggle } from "@/components/ModeTogggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useMatches } from "react-router";

export function SiteHeader() {
	const matches = useMatches();
	const { header } = matches.filter((match) => match.handle)[0]
		.handle! as unknown as { header: string };

	return (
		<header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="mx-2 data-[orientation=vertical]:h-4"
				/>
				<h1 className="text-base font-medium">{header}</h1>
				<div className="ml-auto flex items-center gap-2"></div>
			</div>
			<div className="pr-4">
				<ModeToggle />
			</div>
		</header>
	);
}
