import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { http } from "@lib/services/http";
import { MarketItemDetail } from "@types";

export const useMarketItemQuery = (id: number | undefined) => {
  return useQuery<MarketItemDetail>({
    queryKey: ["/products", id],
    queryFn: async () => {
      return (await http.post.default(`/products/${id}`)).data;
    },
    enabled: !!id,
  });
};
