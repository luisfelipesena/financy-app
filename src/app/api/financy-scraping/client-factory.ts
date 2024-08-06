import { useQuery } from "@tanstack/react-query";

export const financyScraping = () => {
	const useQueryData = useQuery({
		queryKey: ["financy-scraping"],
		queryFn: () => fetch("/api/financy-scraping").then((res) => res.json()),
		staleTime: 10 * 1000,
	});

	return useQueryData;
};
