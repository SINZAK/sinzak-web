import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { http } from "@lib/services/http";

export const useDeleteWorkItemMutation = (id?: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      if (!id) throw Error();
      return (await http.post.default(`/works/${id}/delete`)).data;
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
