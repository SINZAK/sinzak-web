import { http } from "@lib/services/http";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ProductSimple } from "@types";
import { Filter } from "../states/filter";

export const useProductQuery = (filter: Filter) => {
  const query = useInfiniteQuery<{
    content: ProductSimple[];
    last: boolean;
    pageable: {
      pageNumber: number;
    };
  }>({
    queryKey: ["marketTest", filter],
    queryFn: async ({ pageParam = 0 }) => {
      return (
        await http.post.default("/products", { ...filter, page: pageParam })
      ).data;
    },
    keepPreviousData: true,
    getNextPageParam: (data) =>
      data.last ? undefined : data.pageable.pageNumber + 1,
  });

  return query;
};

export type ProductQueryResult = ReturnType<typeof useProductQuery>;
