import { useQuery } from "@tanstack/react-query";

export const bidScraping = () => {
	const useQueryData = useQuery({
		queryKey: ["bid-scraping"],
		queryFn: () => fetch("/api/bid-scraping").then((res) => res.json()),
		staleTime: 10 * 1000,
	});

	return useQueryData;
};
