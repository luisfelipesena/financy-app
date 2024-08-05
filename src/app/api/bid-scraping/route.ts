import { checkRateLimit } from "~/server/rate-limiter";
import { bidHtmlScraper } from "./scraper";

export async function GET() {
	await checkRateLimit();
	try {
		const scraperResponse = await bidHtmlScraper.getBidHtml();
		console.debug({ scraperResponse }, "Scraper response");
	} catch (error) {
		console.error({ error });
	}

	return Response.json({ message: Math.random() });
}
