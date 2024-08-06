import { auth } from "@clerk/nextjs/server";
import { kv, type VercelKV } from "@vercel/kv";
import { KvRedis } from "./kv-redis";

class RateLimiter extends KvRedis {
	private maxRequests = 10;
	private ttl = 10;

	async isRateLimitReached(key: string) {
		return await this.isLimitReached(key, this.maxRequests, this.ttl);
	}
}

export const ratelimiter = new RateLimiter(kv);

export const checkRateLimit = async () => {
	const { userId } = auth();
	if (!userId) throw new Error("Usuário não está logado");
	const rateLimitResponse = await ratelimiter.isRateLimitReached(userId);
	if (!rateLimitResponse) {
		throw new Error("Limite de requisições excedido");
	}
};
