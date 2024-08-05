import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function AuthButtons() {
	return (
		<div className="flex flex-wrap gap-4 justify-center text-black">
			<SignedOut>
				<SignInButton mode="modal">Entrar</SignInButton>
			</SignedOut>
			<SignedIn>
				<UserButton userProfileMode="modal" />
			</SignedIn>
		</div>
	);
}
