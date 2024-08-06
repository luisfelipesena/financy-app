"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { GoogleAnalytics as GoogleAnalyticsComponent } from "@next/third-parties/google";

export const ReactQueryProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const [client] = useState(new QueryClient());

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export const GoogleAnalytics = () => {
	return (
		<GoogleAnalyticsComponent
			gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? ""}
		/>
	);
};
