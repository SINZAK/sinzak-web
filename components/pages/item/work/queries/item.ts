import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { http } from "@lib/services/http";
import { WorkItemDetail, MarketItemDetail } from "@types";

export const useWorkItemQuery = (id?: number) => {
  return useQuery<WorkItemDetail>({
    queryKey: ["/works", id],
    queryFn: async () => {
      return (await http.post.default(`/works/${id}`)).data;
    },
    enabled: !!id,
  });
};
