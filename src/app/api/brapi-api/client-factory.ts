import { useQuery } from "@tanstack/react-query";

export const getBrapiAvailableStocks = (search = "") => {
	const useQueryData = useQuery({
		queryKey: ["brapi-api-available-stocks", search],
		retry: false,
		queryFn: async () => {
			const apiResponse = await fetch("/api/brapi-api/stock-market/available");
			const response = await apiResponse.json();
			if (!response.ok) {
				throw new Error(response.message);
			}
			return response.data;
		},
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	return useQueryData;
};
