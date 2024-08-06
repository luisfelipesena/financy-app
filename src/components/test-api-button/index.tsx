"use client";
import { getBrapiAvailableStocks } from "~/app/api/brapi-api/client-factory";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";

export const TestApiButton = () => {
	const { data, isLoading, refetch, isRefetching, error, isError } =
		getBrapiAvailableStocks();

	useEffect(() => {
		if (isError) {
			toast.error(error.message);
		}
	}, [isError]);

	return (
		<div className="flex flex-col flex-wrap gap-4">
			<Button
				className="w-36"
				onClick={() => refetch()}
				loading={isLoading || isRefetching}
			>
				TestApiButton
			</Button>
			<div className="flex flex-row flex-wrap gap-4 ">
				{data?.stocks?.map((stock: any, index: number) => (
					<div key={index}>
						<span>{stock}</span>
					</div>
				))}
			</div>
		</div>
	);
};
