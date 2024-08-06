import Link from "next/link";
import { AuthButtons } from "./auth-buttons";

export function TopNav() {
	return (
		<nav className="sticky mb-4 top-0 z-10 flex sm:text-xl font-semibold rounded-b items-center justify-between w-full p-4 gap-8 bg-white">
			<div className="flex flex-wrap gap-4 justify-center text-black">
				<Link href="/" className="text-black">
					Home
				</Link>
				<Link href="/layer" className="text-black">
					Page 2
				</Link>
				<Link href="/dashboards" className="text-black">
					Dashboards
				</Link>
			</div>
			<AuthButtons />
		</nav>
	);
}
