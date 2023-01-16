import { http } from "@lib/services/http";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useLikeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    unknown,
    unknown,
    {
      mode: boolean;
      id: number;
    }
  >({
    mutationFn: async ({ mode, id }) => {
      const res = await http.post.json(`/products/likes`, { id, mode });
      return res;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["productTest", id],
      });
    },
  });
};
