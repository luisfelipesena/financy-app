import { checkRateLimit } from "~/server/rate-limiter";
import type { AxiosResponse } from "axios";
import { logger } from "~/logger";
import { brapiAxiosInstance } from "~/server/axios-instances";

const log = logger.child({ name: "BrapiApiAvailableStocks" });

const fetchBrapiApi = async (search = ""): Promise<AxiosResponse> => {
	const searchParams = new URLSearchParams({
		search,
	}).toString();

	log.info("Fetching available stocks", { searchParams });
	const response = await brapiAxiosInstance.get(`/available?${searchParams}`);
	return response;
};

export async function GET() {
	await checkRateLimit();
	try {
		const availableStocks = await fetchBrapiApi();
		return Response.json(availableStocks.data);
	} catch (error) {
		log.error("Error fetching available stocks", { error });
		return Response.error();
	}
}
