import { useMutation, useQueryClient } from "@tanstack/react-query";

import { http } from "@lib/services/http";
import { WishMutationVariables } from "@types";

import { useMarketItemQuery } from "./useMarketItemQuery";

export const useWishMarketItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, WishMutationVariables>({
    mutationFn: async ({ mode, id }) => {
      const res = await http.post.json(`/products/wish`, { id, mode });
      return res;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: useMarketItemQuery.getKey({ id }),
      });
    },
  });
};
