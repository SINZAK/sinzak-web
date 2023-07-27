import { useQueryClient } from "@tanstack/react-query";
import { createInfiniteQuery } from "react-query-kit";

import useIsClient from "@lib/hooks/useIsClient";
import { http } from "@lib/services/http";
import { ItemSimple } from "@types";

import { Filter } from "../states/filter";

type Response = {
  content: ItemSimple[];
  last: boolean;
  pageable: {
    pageNumber: number;
  };
};
type Variables = {
  filter: Filter;
};

export const useWorkQuery = createInfiniteQuery<Response, Variables>({
  primaryKey: "/works",
  queryFn: async ({ queryKey: [primaryKey, { filter }], pageParam = 0 }) => {
    return (
      await http.post.default(primaryKey, {
        ...filter,
        page: pageParam,
      })
    ).data;
  },
  keepPreviousData: true,
  getNextPageParam: (data) =>
    data.last ? undefined : data.pageable.pageNumber + 1,
  useDefaultOptions: () => {
    const queryClient = useQueryClient();
    const isClient = useIsClient();
    return {
      enabled: isClient,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["/users/history"],
        });
      },
    };
  },
});

export type WorkQueryResult = ReturnType<typeof useWorkQuery>;
