import { createQuery } from "react-query-kit";

import { http } from "@lib/services/http";

export interface SimpleProduct {
  complete: boolean;
  date: string;
  id: number;
  thumbnail: null | string;
  title: string;
}

export interface MyWish {
  productWishes: SimpleProduct[];
  workWishes: SimpleProduct[];
}

export const useMyWishQuery = createQuery<MyWish>({
  primaryKey: "/users/wish",
  queryFn: async ({ queryKey: [primaryKey] }) => {
    return (await http.get(primaryKey)).data;
  },
});
