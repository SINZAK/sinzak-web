import { useQueryClient } from "@tanstack/react-query";
import { createMutation } from "react-query-kit";

import { http } from "@lib/services/http";
import { ProductType } from "@types";

import { useMyProfileQuery } from "./useMyProfileQuery";

export const useChangeProductCompleteMutation = createMutation({
  mutationFn: async ({ type, id }: { type: ProductType; id: number }) => {
    const res = await http.post.json(
      `/${type === "market" ? "products" : "works"}/sell`,
      {
        postId: id,
      }
    );
    return res.data;
  },
  useDefaultOptions: () => {
    const queryClient = useQueryClient();
    return {
      onSuccess: () => {
        queryClient.invalidateQueries(useMyProfileQuery.getKey());
      },
    };
  },
});
