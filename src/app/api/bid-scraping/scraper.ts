import axios from "axios";
import * as cheerio from "cheerio";
import type { Team } from "./models";
import { logger } from "~/logger";

const BID_HOST_URL = "https://bid.cbf.com.br";
const BID_JSON_URL = "https://bid.cbf.com.br/combo-clubes-json";
const BID_CAPTCHA_URL = "https://bid.cbf.com.br/get-captcha-base64";

class BidHtmlScraper {
	private log = logger.child({ name: "BidHtmlScraper" });
	private captchaText: string | undefined;
	private cookies: string | undefined;
	private csrfToken: string | undefined;
	private teams: Team.Default[] = [];

	public async getBidHtml(): Promise<Team.Default[]> {
		try {
			this.log.info("Initiating scraping...");
			const html = await this.getInitialHtml();
			this.setCsrfToken(html);
			this.log.info(
				{ csrfToken: this.csrfToken },
				"CSRF token found, getting captcha...",
			);
			const captcha = await this.getBidCaptcha();
			this.log.info("Getting captcha text...");
			const text = await this.readCaptcha(captcha);
			this.log.info(
				{ captchaText: text },
				"Captcha text found, getting JSONs...",
			);
			const jsonData = await this.getBidJsonData();
			await this.setTeams(jsonData);
			this.log.info({ amount: this.teams.length }, "Teams found, returning...");
			return this.teams;
		} catch (error) {
			this.log.error((error as any).message);
			return [];
		}
	}

	private async getInitialHtml(): Promise<string> {
		const response = await axios.get(BID_HOST_URL);
		this.cookies = response.headers["set-cookie"]?.join("; ") ?? "";
		return response.data;
	}

	private setCsrfToken(html: string): void {
		const $ = cheerio.load(html);
		const csrfToken = $("meta[name='csrf-token']").attr("content");
		if (!csrfToken) throw new Error("CSRF token not found");
		this.csrfToken = csrfToken;
	}

	private async getBidCaptcha(): Promise<string> {
		const response = await axios.get(BID_CAPTCHA_URL, {
			headers: { cookie: this.cookies ?? "", ...this.getDefaultHeaders() },
		});
		return response.data;
	}

	private async readCaptcha(base64: string): Promise<string> {
		const testext = "TODO: capcha solver";
		return testext;
	}

	private async getBidJsonData(): Promise<Team.ApiResponse[]> {
		const response = await axios.post<Team.ApiResponse[]>(
			BID_JSON_URL,
			this.captchaText,
			{
				headers: {
					cookie: this.cookies ?? "",
					Origin: BID_HOST_URL,
					"X-Csrf-Token": this.csrfToken ?? "",
					...this.getDefaultHeaders(),
				},
			},
		);
		return response.data;
	}

	private async setTeams(data: Team.ApiResponse[]): Promise<void> {
		this.teams = data.map((team: Team.ApiResponse) => ({
			codigoClube: team.codigo_clube,
			clube: team.clube.replace(/\((\d+)\)/g, ""),
			uf: team.uf,
			tipoClube: team.tipo_clube,
			isformador: team.isformador,
		}));
		this.log.info({ teams: this.teams[100] }, "Teams found, returning...");
	}

	private getDefaultHeaders(): Record<string, string> {
		return {
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
			Accept:
				"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
			"Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
			"Cache-Control": "max-age=0",
			Connection: "keep-alive",
			"Upgrade-Insecure-Requests": "1",
			Host: new URL(BID_HOST_URL).hostname,
			Referer: BID_HOST_URL,
		};
	}
}

export const bidHtmlScraper = new BidHtmlScraper();
