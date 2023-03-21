import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { http } from "@lib/services/http";

import { useMarketItemQuery } from "./item";

export const useDeleteMarketItemMutation = (id?: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      if (!id) throw Error();
      return (await http.post.default(`/products/${id}/delete`)).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["market"],
      });
      queryClient.invalidateQueries({
        queryKey: useMarketItemQuery.getKey({ id }),
      });
      router.push("/market");
    },
  });
};
