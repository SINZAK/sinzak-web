import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createInfiniteQuery, InfiniteQueryHook } from "react-query-kit";

import useIsClient from "@lib/hooks/useIsClient";
import { http } from "@lib/services/http";
import { ItemSimple, inferRawData } from "@types";

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

export const useWorkQuery = (arg: Parameters<typeof query<Response>>[0]) => {
  const queryClient = useQueryClient();
  const isClient = useIsClient();
  const query = useMemo(
    () =>
      createInfiniteQuery<Response, Variables>({
        primaryKey: "/works",
        queryFn: async ({
          queryKey: [primaryKey, { filter }],
          pageParam = 0,
        }) => {
          return (
            await http.post.default(primaryKey, {
              ...filter,
              page: pageParam,
            })
          ).data;
        },
        enabled: isClient,
        keepPreviousData: true,
        getNextPageParam: (data) =>
          data.last ? undefined : data.pageable.pageNumber + 1,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["/users/history"],
          });
        },
      }),
    [queryClient, isClient]
  );

  return query(arg);
};

export type WorkQueryResult = ReturnType<typeof useWorkQuery>;
