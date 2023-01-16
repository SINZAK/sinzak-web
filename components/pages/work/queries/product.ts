import useIsClient from "@lib/hooks/useIsClient";
import { http } from "@lib/services/http";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ProductSimple } from "@types";
import { Filter } from "../states/filter";

export const useWorkQuery = (filter: Filter) => {
  const isClient = useIsClient();
  const query = useInfiniteQuery<{
    content: ProductSimple[];
    last: boolean;
    pageable: {
      pageNumber: number;
    };
  }>({
    queryKey: ["worksTest", filter],
    queryFn: async ({ pageParam = 0 }) => {
      return (
        await http.post.default("/works", {
          ...filter,
          page: pageParam,
        })
      ).data;
    },
    enabled: isClient,
    keepPreviousData: true,
    getNextPageParam: (data) =>
      data.last ? undefined : data.pageable.pageNumber + 1,
  });

  return query;
};

export type WorkQueryResult = ReturnType<typeof useWorkQuery>;
