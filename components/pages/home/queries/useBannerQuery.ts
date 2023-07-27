import { createQuery } from "react-query-kit";

import { http } from "@lib/services/http";

export type Banner = {
  content: string;
  href: string;
  id: number;
  pcImageUrl: string;
  imageUrl: string;
}[];

export const useBannerQuery = createQuery<Banner>({
  primaryKey: "/banner",
  queryFn: async ({ queryKey: [primaryKey] }) => {
    return (await http.get(primaryKey)).data;
  },
});
