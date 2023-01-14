import { http } from "@lib/services/http";
import { useQuery } from "@tanstack/react-query";
import { ProductSimple } from "@types";
import { Filter } from "../states/filter";

export const useProductQuery = (filter: Filter) => {
  const query = useQuery<{
    content: ProductSimple[];
  }>(
    ["marketTest", filter],
    async () => {
      return (await http.post.default("/products", filter)).data;
    },
    {
      keepPreviousData: true,
    }
  );

  return query;
};

export type ProductQueryResult = ReturnType<typeof useProductQuery>;
