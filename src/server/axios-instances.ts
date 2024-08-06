import axios from "axios";

export const brapiAxiosInstance = axios.create({
	baseURL: "https://brapi.dev/api",
	headers: {
		Authorization: `Bearer ${process.env.BRAPI_API_TOKEN}`,
	},
});
