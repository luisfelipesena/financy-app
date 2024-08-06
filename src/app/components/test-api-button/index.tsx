"use client";
import { getBrapiAvailableStocks } from "~/app/api/brapi-api/client-factory";
import { Button } from "../ui/button";

export const TestApiButton = () => {
	const { data, isLoading, refetch, isRefetching } = getBrapiAvailableStocks();
	return (
		<div className="flex flex-col flex-wrap gap-4">
			<Button onClick={() => refetch()} disabled={isLoading || isRefetching}>
				TestApiButton
				{isLoading && <span>Loading...</span>}
			</Button>
			<div className="flex flex-row flex-wrap gap-4">
				{data?.stocks?.map((stock: any, index: number) => (
					<div key={index}>
						<span>{stock}</span>
					</div>
				))}
			</div>
		</div>
	);
};
