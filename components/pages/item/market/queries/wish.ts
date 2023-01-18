import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WishMutationVariables } from "@types";

import { http } from "@lib/services/http";

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
