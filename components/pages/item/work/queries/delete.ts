import { http } from "@lib/services/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const useDeleteWorkItemMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      return (await http.post.default(`/works/${router.query.slug}/delete`))
        .data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["work"],
      });
      queryClient.invalidateQueries({
        queryKey: ["work-item", Number(router.query.slug)],
      });
      router.push("/work");
    },
  });
};
