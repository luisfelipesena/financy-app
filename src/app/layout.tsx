import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { ptBR } from "@clerk/localizations";
import { dark } from "@clerk/themes";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import { TopNav } from "~/components/top-nav";
import { Toaster } from "~/components/ui/sonner";
import { GoogleAnalytics, ReactQueryProvider } from "./providers";

export const metadata: Metadata = {
	title: "Financy App",
	description: "Site de Finanças Brasileiras",
	icons: [
		{
			rel: "icon",
			url: "https://utfs.io/f/c580bee1-84dd-4bec-8698-97cc421ff571-1jnzkx.png",
		},
	],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClerkProvider
			localization={ptBR}
			appearance={{
				baseTheme: dark,
			}}
		>
			<html lang="pt" className={`${GeistSans.variable}`}>
				<GoogleAnalytics />
				<ReactQueryProvider>
					<body>
						<Toaster />
						<TopNav />
						<main className="p-4">{children}</main>
					</body>
				</ReactQueryProvider>
			</html>
		</ClerkProvider>
	);
}
