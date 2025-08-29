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
import type { IRFP } from "@/types/rfp";
import { useAuth } from "@/context/AuthContext";

const RFPCellActions: FC<CellContext<IRFP, unknown>> = ({ row, table }) => {
	const auth = useAuth();
	const [redirect, setRedirect] = useState<string | null>(null);
	const role = auth.getSnapshot().context.loginResponse?.role;

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
				{role === "PROCUREMENT" && (
					<DropdownMenuItem
						onClick={() => {
							setRedirect(`/rfps/edit/${row.original.id}`);
						}}
					>
						Edit
					</DropdownMenuItem>
				)}
				<DropdownMenuItem
					onClick={() => {
						setRedirect(`/rfps/${row.original.id}`);
					}}
				>
					View
				</DropdownMenuItem>
				{role === "VENDOR" && (
					<DropdownMenuItem
						onClick={() => {
							setRedirect(`/rfps/${row.original.id}`);
						}}
					>
						Submit Proposals
					</DropdownMenuItem>
				)}
				{role === "PROCUREMENT" && (
					<DropdownMenuItem
						onClick={() => {
							if (table.options.meta) {
								table.options.meta.handleDelete(row.original);
							}
						}}
						variant="destructive"
					>
						Delete
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default RFPCellActions;
