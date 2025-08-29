import { PhotoIcon, DocumentTextIcon } from "@heroicons/react/24/solid";
import {
	type ChangeEvent,
	type Dispatch,
	type DragEvent,
	type FC,
	type SetStateAction,
} from "react";
import { FileList } from "./FileList";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface IProps {
	files: File[];
	setFiles: Dispatch<SetStateAction<File[]>>;
	handleUpload: () => void;
	isUploading: boolean;
}

const FileUpload: FC<IProps> = ({
	files,
	setFiles,
	handleUpload,
	isUploading,
}) => {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFiles([...files, ...event.target.files!]);
	};

	const handleDrag = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (files.length < 10) {
			const _files = event.dataTransfer.files;
			setFiles((prev) => [...prev, ..._files]);
		}
	};

	const removeFile = (filename: string) => {
		setFiles((_files) => [
			..._files.filter((file) => file.name !== filename),
		]);
	};

	return (
		<div className="flex flex-col w-full">
			<div className="flex justify-end">
				<Button onClick={handleUpload}>Upload</Button>
			</div>
			<div
				onDropCapture={handleDrag}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				className="col-span-full"
			>
				<label
					htmlFor="cover-photo"
					className="block text-sm/6 font-medium text-white"
				>
					Cover photo
				</label>
				<div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
					<div className="text-center">
						<div className="flex">
							<PhotoIcon
								aria-hidden="true"
								className="mx-auto size-12 text-gray-600"
							/>
							<DocumentTextIcon
								aria-hidden="true"
								className="mx-auto size-12 text-gray-600"
							/>
						</div>
						<div className="mt-4 flex text-sm/6 text-gray-400">
							<label
								htmlFor="file-upload"
								className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300"
							>
								<span>Upload a file</span>
								<input
									id="file-upload"
									name="file-upload"
									type="file"
									className="sr-only"
									multiple
									onChange={handleChange}
								/>
							</label>
							<p className="pl-1">or drag and drop</p>
						</div>
						<p className="text-xs/5 text-gray-400">
							PDF, PNG, JPG, GIF up to 10MB
						</p>
					</div>
				</div>
			</div>
			<Card className="flex w-full">
				<CardContent>
					<FileList
						isUploading={isUploading}
						remove={removeFile}
						files={files}
					/>
				</CardContent>
			</Card>
		</div>
	);
};

export default FileUpload;
