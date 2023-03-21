import { createQuery } from "react-query-kit";

import { http } from "@lib/services/http";
import { MarketItemDetail } from "@types";

export const useMarketItemQuery = createQuery<
  MarketItemDetail,
  { id: number | undefined }
>({
  primaryKey: "/products/",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    return (await http.post.default(`${primaryKey}${variables.id}`)).data;
  },
  enabled: (_, { id }) => !!id,
});
