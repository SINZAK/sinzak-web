import { createQuery } from "react-query-kit";

import { http } from "@lib/services/http";
import { ItemSimple } from "@types";

export interface Featured {
  recommend?: ItemSimple[];
  following?: ItemSimple[];
  new?: ItemSimple[];
  hot?: ItemSimple[];
}

export const useFeaturedQuery = createQuery<Featured>({
  primaryKey: "/home/products",
  queryFn: async ({ queryKey: [primaryKey] }) => {
    return (await http.post.default(primaryKey)).data;
  },
});
