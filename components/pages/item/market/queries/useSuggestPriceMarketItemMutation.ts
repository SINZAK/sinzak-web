import { useMutation } from "@tanstack/react-query";

import { http } from "@lib/services/http";
import { SuggestPriceMutationVariables } from "@types";

export const useSuggestPriceMarketItemMutation = () => {
  return useMutation<unknown, unknown, SuggestPriceMutationVariables>({
    mutationFn: async (data) => {
      const res = await http.post.json(`/products/suggest`, data);
      return res;
    },
  });
};
