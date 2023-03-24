import { createQuery } from "react-query-kit";

import { useAuth } from "@lib/services/auth";
import { http } from "@lib/services/http";

type Response = [number, string][];

export const useSearchHistoryQuery = createQuery<Response, void>({
  primaryKey: "/users/history",
  queryFn: async ({ queryKey: [primaryKey] }) => {
    return (await http.get(primaryKey)).data;
  },
  cacheTime: 0,
  staleTime: 0,
  useDefaultOptions: () => {
    const { user } = useAuth();

    return {
      enabled: !!user,
    };
  },
});
