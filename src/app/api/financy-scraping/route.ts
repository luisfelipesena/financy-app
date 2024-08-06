import { checkRateLimit } from "~/server/rate-limiter";
import { financyHtmlScraper } from "./scraper";

export async function GET() {
	await checkRateLimit();
	try {
		const scraperResponse = await financyHtmlScraper.getFinancyHtml();
		console.debug({ scraperResponse }, "Scraper response");
	} catch (error) {
		console.error({ error });
	}

	return Response.json({ message: Math.random() });
}
