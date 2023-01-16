import { http } from "@lib/services/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      return (await http.post.default(`/products/${router.query.slug}/delete`))
        .data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["marketTest"],
      });
      queryClient.invalidateQueries({
        queryKey: ["productTest", Number(router.query.slug)],
      });
      router.push("/market");
    },
  });
};
