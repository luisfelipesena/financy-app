import { useQuery } from "@tanstack/react-query";

export const getBrapiAvailableStocks = (search = "") => {
	const useQueryData = useQuery({
		queryKey: [`brapi-api-available-stocks-${search}`],
		queryFn: () =>
			fetch("/api/brapi-api/stock-market/available").then((res) => res.json()),
		staleTime: Number.POSITIVE_INFINITY,
	});

	return useQueryData;
};
