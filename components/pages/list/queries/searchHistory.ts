import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@lib/services/auth";
import { http } from "@lib/services/http";

export const useSearchHistoryQuery = () => {
  const { user } = useAuth();
  return useQuery<
    {
      [val: number]: string;
    }[]
  >({
    queryKey: ["/users/history"],
    queryFn: async () => {
      return (await http.get("/users/history")).data;
    },
    enabled: !!user,
  });
};
