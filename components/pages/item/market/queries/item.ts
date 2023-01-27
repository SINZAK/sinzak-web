import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { http } from "@lib/services/http";
import { MarketItemDetail } from "@types";

export const useMarketItemQuery = () => {
  const router = useRouter();

  return useQuery<MarketItemDetail>(
    ["market-item", Number(router.query.slug)],
    async () => {
      return (await http.post.default(`/products/${router.query.slug}`)).data;
    },
    {
      enabled: !!router.query.slug,
    }
  );
};
