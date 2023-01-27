import { useMutation, useQueryClient } from "@tanstack/react-query";

import { http } from "@lib/services/http";
import { LikeMutationVariables } from "@types";

export const useLikeWorkItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, LikeMutationVariables>({
    mutationFn: async ({ mode, id }) => {
      const res = await http.post.json(`/works/likes`, { id, mode });
      return res;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["work-item", id],
      });
    },
  });
};
