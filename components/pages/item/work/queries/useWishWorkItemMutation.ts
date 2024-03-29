import { useMutation, useQueryClient } from "@tanstack/react-query";

import { http } from "@lib/services/http";
import { WishMutationVariables } from "@types";

import { useWorkItemQuery } from "./useWorkItemQuery";

export const useWishWorkItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, WishMutationVariables>({
    mutationFn: async ({ mode, id }) => {
      const res = await http.post.json(`/works/wish`, { id, mode });
      return res;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: useWorkItemQuery.getKey({ id }),
      });
    },
  });
};
