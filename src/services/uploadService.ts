/* eslint-disable no-useless-catch */
import axios from "axios";

export const upload = async (file: File, uploadUrl: string) => {
	try {
		await axios(uploadUrl, {
			method: "PUT",
			data: file,
			headers: {
				"Content-Type": file.type,
			},
		});
		return true;
	} catch (error) {
		console.error(error);
		throw false;
	}
};
