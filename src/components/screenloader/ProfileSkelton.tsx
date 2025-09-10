import { Skeleton } from "../ui/skeleton";

const ProfileSkelton = () => {
	return (
		<div className="space-y-12">
			<div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div className="sm:col-span-3 flex flex-col gap-2">
					<Skeleton className="h-4 w-[250px] bg-gray-200" />
					<Skeleton className="h-12 bg-gray-200" />
				</div>
				<div className="sm:col-span-3 flex flex-col gap-2">
					<Skeleton className="h-4 w-[250px] bg-gray-200" />
					<Skeleton className="h-12 bg-gray-200" />
				</div>
				<div className="col-span-full flex flex-col gap-2">
					<Skeleton className="h-4 w-[250px] bg-gray-200" />
					<Skeleton className="h-20 bg-gray-200" />
				</div>
			</div>
			<div className="border-t border-white/10 pb-12">
				<div className="flex flex-col gap-2">
					<Skeleton className="h-4 w-[300px] bg-gray-200" />
					<Skeleton className="h-4 w-[500px] bg-gray-200" />
				</div>
				<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
					<div className="sm:col-span-3 flex flex-col gap-2">
						<Skeleton className="h-4 w-[250px] bg-gray-200" />
						<Skeleton className="h-12 bg-gray-200" />
					</div>
					<div className="sm:col-span-3 flex flex-col gap-2">
						<Skeleton className="h-4 w-[250px] bg-gray-200" />
						<Skeleton className="h-12 bg-gray-200" />
					</div>
					<div className="sm:col-span-3 flex flex-col gap-2">
						<Skeleton className="h-4 w-[250px] bg-gray-200" />
						<Skeleton className="h-12 bg-gray-200" />
					</div>
					<div className="sm:col-span-3 flex flex-col gap-2">
						<Skeleton className="h-4 w-[250px] bg-gray-200" />
						<Skeleton className="h-12 bg-gray-200" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileSkelton;
