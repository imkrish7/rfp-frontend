import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { IconDotsVertical } from "@tabler/icons-react";
import { Navigate } from "react-router";
import { useState, type FC } from "react";
import type { CellContext } from "@tanstack/react-table";
import type z from "zod";
import type { rfpSchema } from "@/schema/rfp";

const RFPCellActions: FC<CellContext<z.infer<typeof rfpSchema>, unknown>> = ({
	row,
}) => {
	const [redirect, setRedirect] = useState<string | null>(null);
	if (redirect) {
		return <Navigate to={redirect} />;
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
					size="icon"
				>
					<IconDotsVertical />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-32">
				<DropdownMenuItem
					onClick={() => {
						setRedirect(`/rfps/edit/${row.original.id}`);
					}}
				>
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						setRedirect(`/rfps/${row.original.id}`);
					}}
				>
					View
				</DropdownMenuItem>
				<DropdownMenuItem variant="destructive">
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default RFPCellActions;
