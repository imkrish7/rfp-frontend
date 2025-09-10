import { Skeleton } from "../ui/skeleton";

export function Splash() {
	return (
		<div className="flex h-screen bg-gray-50 dark:bg-gray-900">
			{/* Sidebar */}
			<aside className="w-64 p-4 bg-white dark:bg-gray-800 space-y-4">
				<Skeleton className="h-10 w-32 bg-gray-200" />
				<Skeleton className="h-8 w-full bg-gray-200" />
				<Skeleton className="h-8 w-full bg-gray-200" />
				<Skeleton className="h-8 w-full bg-gray-200" />
				<Skeleton className="h-8 w-3/4 bg-gray-200" />
			</aside>

			{/* Main content area */}
			<div className="flex-1 flex flex-col">
				{/* Header */}
				<header className="p-4 bg-gray-200 dark:bg-gray-800 shadow-sm">
					<Skeleton className="h-8 w-48" />
				</header>

				{/* Dashboard content */}
				<main className="flex-1 p-6 space-y-6 overflow-y-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<Skeleton className="h-48 w-full bg-gray-200" />
						<Skeleton className="h-48 w-full bg-gray-200" />
						<Skeleton className="h-48 w-full bg-gray-200" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Skeleton className="h-32 w-full bg-gray-200" />
						<Skeleton className="h-32 w-full bg-gray-200" />
					</div>
				</main>
			</div>
		</div>
	);
}
