import type { VercelKV } from "@vercel/kv";

export class KvRedis {
	private kv: VercelKV;
	constructor(kv: VercelKV) {
		this.kv = kv;
	}

	async isLimitReached(key: string, maxRequests: number, ttl: number) {
		const validKey = `financy-app-kv-redis-${key}`;
		const currentRequests = await this.getRequests(key);
		if (currentRequests >= maxRequests) {
			return false;
		}
		await this.incrementRequests(key);
		setTimeout(() => this.decrementRequests(key), ttl * 1000);
		return true;
	}

	protected async getRequests(key: string) {
		const value = await this.kv.get<string>(key);
		return value ? Number.parseInt(value) : 0;
	}

	protected async incrementRequests(key: string) {
		await this.kv.incr(key);
	}

	protected async decrementRequests(key: string) {
		await this.kv.decr(key);
	}
}
