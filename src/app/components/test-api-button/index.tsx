"use client";
import { financyScraping } from "~/app/api/financy-scraping/client-factory";
import { Button } from "../ui/button";

export const TestApiButton = () => {
	const { data, isLoading, refetch } = financyScraping();

	return (
		<Button onClick={() => refetch()}>
			TestApiButton
			{isLoading && <span>Loading...</span>}
			{data && <span>Data: {JSON.stringify(data)}</span>}
		</Button>
	);
};
