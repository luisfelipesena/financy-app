import { auth } from "@clerk/nextjs/server";
import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis"; // see below for cloudflare and fastly adapters

// Create a new ratelimiter, that allows 10 requests per 10 seconds
export const ratelimiter = new Ratelimit({
	redis: Redis.fromEnv(),
	limiter: Ratelimit.slidingWindow(10, "10 s"),
	analytics: true,
	/**
	 * Optional prefix for the keys used in redis. This is useful if you want to share a redis
	 * instance with other applications and want to avoid key collisions. The default prefix is
	 * "@upstash/ratelimit"
	 */
	prefix: "@upstash/ratelimit",
});

export const checkRateLimit = async () => {
	const { userId } = auth();
	if (!userId) throw new Error("User not signed in");
	const rateLimitResponse = await ratelimiter.limit(userId);
	if (!rateLimitResponse.success) {
		throw new Error("Rate limit exceeded");
	}
};
