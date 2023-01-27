import { useMutation, useQueryClient } from "@tanstack/react-query";

import { http } from "@lib/services/http";
import { WishMutationVariables } from "@types";

export const useWishMarketItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, WishMutationVariables>({
    mutationFn: async ({ mode, id }) => {
      const res = await http.post.json(`/products/wish`, { id, mode });
      return res;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["market-item", id],
      });
    },
  });
};
