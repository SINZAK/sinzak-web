import { http } from "@lib/services/http";
import { useQuery } from "@tanstack/react-query";
import { MarketItemDetail } from "@types";
import { useRouter } from "next/router";

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
