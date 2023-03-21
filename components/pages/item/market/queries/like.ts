import { useMutation, useQueryClient } from "@tanstack/react-query";

import { http } from "@lib/services/http";
import { LikeMutationVariables } from "@types";

import { useMarketItemQuery } from "./item";

export const useLikeMarketItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, LikeMutationVariables>({
    mutationFn: async ({ mode, id }) => {
      const res = await http.post.json(`/products/likes`, { id, mode });
      return res;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: useMarketItemQuery.getKey({ id }),
      });
    },
  });
};
