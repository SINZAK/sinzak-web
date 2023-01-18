import { http } from "@lib/services/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const useDeleteMarketItemMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      return (await http.post.default(`/products/${router.query.slug}/delete`))
        .data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["market"],
      });
      queryClient.invalidateQueries({
        queryKey: ["market-item", Number(router.query.slug)],
      });
      router.push("/market");
    },
  });
};
