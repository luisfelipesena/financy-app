import { ToastDemo } from "~/app/components/toast-button";
import { Button } from "~/app/components/ui/button";
import { getUsers } from "~/server/queries";
import { TestApiButton } from "~/app/components/test-api-button";

export const dynamic = "force-dynamic";

export default function HomePage() {
	return (
		<main>
			<div className="flex justify-center gap-12 px-4 py-16">
				<h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
					<span className="text-[hsl(280,100%,70%)]">LOVE U</span> Rai ai
				</h1>

				<form
					action={async () => {
						"use server";

						const users = await getUsers();
						console.log({ users });
					}}
				>
					<Button>Users Banco de dados</Button>
				</form>
			</div>
			<div className="flex flex-wrap gap-4 justify-center">
				<ToastDemo />
				<TestApiButton />
			</div>
		</main>
	);
}
