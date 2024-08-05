"use client";
import { bidScraping } from "~/app/api/bid-scraping/client-factory";
import { Button } from "../ui/button";

export const TestApiButton = () => {
	const { data, isLoading, refetch } = bidScraping();

	return (
		<Button onClick={() => refetch()}>
			TestApiButton
			{isLoading && <span>Loading...</span>}
			{data && <span>Data: {JSON.stringify(data)}</span>}
		</Button>
	);
};
