"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect, useState } from "react";

if (typeof window !== "undefined") {
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "", {
		api_host: "/ingest",
		ui_host: "https://us.posthog.com",
	});
}

function PostHogAuthWrapper({ children }: { children: React.ReactNode }) {
	const auth = useAuth();
	const userInfo = useUser();

	useEffect(() => {
		if (userInfo.user) {
			posthog.identify(userInfo.user.id, {
				email: userInfo.user.emailAddresses[0]?.emailAddress,
				name: userInfo.user.username,
			});
		} else if (!auth.isSignedIn) {
			posthog.reset();
		}
	}, [auth, userInfo]);

	return children;
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
	return (
		<PostHogProvider client={posthog}>
			<PostHogAuthWrapper>{children}</PostHogAuthWrapper>
		</PostHogProvider>
	);
}

export const ReactQueryProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const [client] = useState(new QueryClient());

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
