import { Button } from "~/components/ui/button";
import { getUsers } from "~/server/queries";
import { TestApiButton } from "~/components/test-api-button";

export const dynamic = "force-dynamic";

export default function HomePage() {
	return (
		<main>
			<div className="flex justify-center gap-12 px-4 py-16">
				<h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
					<span className="text-[hsl(280,100%,70%)]">LOVE U</span> Rai ai
				</h1>
			</div>
			<div className="flex flex-wrap gap-4 justify-center">
				<TestApiButton />
				<form
					action={async () => {
						"use server";

						const users = await getUsers();
						console.log({ users });
					}}
				>
					<Button className="w-36">Users DB</Button>
				</form>
			</div>
		</main>
	);
}
