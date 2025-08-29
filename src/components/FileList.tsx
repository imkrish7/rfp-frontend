import { TrashIcon } from "lucide-react";
import type { FC } from "react";
import { Button } from "./ui/button";

interface IProps {
	files: File[];
	remove: (filename: string) => void;
	isUploading: boolean;
}

export const FileList: FC<IProps> = ({ files, remove, isUploading }) => {
	return (
		<div id="detailed-pricing" className="w-full h-[350px] ">
			<div className="relative">
				<div className="h-[50px]absolute top-0 left-0 right-0 w-full z-10">
					<div className="grid grid-cols-3 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
						<div className="flex items-center">Name</div>
						<div>Type</div>
						<div>Actions</div>
					</div>
				</div>
				<div className="-z-3 h-[300px] overflow-y-auto overflow-hidden">
					{files.length > 0 &&
						files.map((file, index) => {
							return (
								<div
									key={index}
									className="grid grid-cols-3 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700"
								>
									<div className="text-gray-500 dark:text-gray-400">
										{file.name}
									</div>
									<div>
										{file.type
											.split("/")[1]
											.toLocaleUpperCase()}
									</div>
									<div className="flex items-center gap-2">
										{!isUploading ? (
											<Button
												onClick={() => {
													remove(file.name);
												}}
												className="cursor-pointer"
											>
												<TrashIcon />
											</Button>
										) : (
											<button
												type="button"
												className="inline-flex cursor-not-allowed items-center rounded-md bg-gray-500 px-4 py-2 text-sm leading-6 font-semibold text-white transition duration-150 ease-in-out hover:bg-gray-400"
												disabled
											>
												<svg
													className="mr-3 -ml-1 size-5 animate-spin text-white"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
												>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														stroke-width="4"
													></circle>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													></path>
												</svg>
												Uploading....
											</button>
										)}
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};
