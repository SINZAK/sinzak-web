import { useMemo } from "react";
import { createQuery } from "react-query-kit";

import { useAuth } from "@lib/services/auth";
import { http } from "@lib/services/http";

type Response = [number, string][];

export const useSearchHistoryQuery = (
  arg: Parameters<typeof query<Response>>[0]
) => {
  const { user } = useAuth();
  const query = useMemo(
    () =>
      createQuery<any, void>({
        primaryKey: "/users/history",
        queryFn: async ({ queryKey: [primaryKey] }) => {
          return (await http.get(primaryKey)).data;
        },
        enabled: !!user,
        cacheTime: 0,
        staleTime: 0,
      }),
    [user]
  );

  return query(arg);
};
