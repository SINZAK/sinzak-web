import { useQuery } from "@tanstack/react-query";
import { createQuery } from "react-query-kit";

import { http } from "@lib/services/http";

export interface SimpleProduct {
  complete: boolean;
  date: string;
  id: number;
  thumbnail: null | string;
  title: string;
}

export interface MyProfile {
  productWishes: SimpleProduct[];
  workWishes: SimpleProduct[];
}

export const useMyWishQuery = createQuery<MyProfile>({
  primaryKey: "/users/wish",
  queryFn: async () => {
    return (await http.get(`/users/wish`)).data;
  },
});
