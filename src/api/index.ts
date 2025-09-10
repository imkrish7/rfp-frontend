import axios from "axios";

export const api = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_API,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(function (config) {
	if (localStorage.getItem("RFP_ACCESS_TOKEN")) {
		config.headers.Authorization = `Bearer ${localStorage.getItem(
			"RFP_ACCESS_TOKEN"
		)}`;
	}
	return config;
});
