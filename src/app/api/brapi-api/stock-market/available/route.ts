import { checkRateLimit } from "~/server/rate-limiter";
import type { AxiosResponse } from "axios";
import { logger } from "~/logger";
import { brapiAxiosInstance } from "~/server/axios-instances";
import type { NextRequest } from "next/server";

const log = logger.child({ name: "BrapiApiAvailableStocks" });

const fetchBrapiApi = async (search = ""): Promise<AxiosResponse> => {
	const searchParams = new URLSearchParams({
		search,
	}).toString();

	log.info("Fetching available stocks", { searchParams });
	const response = await brapiAxiosInstance.get(`/available?${searchParams}`);
	return response;
};

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const search = searchParams.get("search") ?? "";

		await checkRateLimit();
		const availableStocks = await fetchBrapiApi(search);
		return Response.json({ data: availableStocks.data, ok: true });
	} catch (error: any) {
		log.error(
			{ errorMessage: error.message },
			"Error fetching available stocks",
		);
		return Response.json({ message: error.message, ok: false });
	}
}
