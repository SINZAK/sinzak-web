import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LikeMutationVariables } from "@types";

import { http } from "@lib/services/http";

export const useLikeWorkItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, LikeMutationVariables>({
    mutationFn: async ({ mode, id }) => {
      const res = await http.post.json(`/products/likes`, { id, mode });
      return res;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["market-item", id],
      });
    },
  });
};
