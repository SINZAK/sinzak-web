import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createMutation } from "react-query-kit";

import { http } from "@lib/services/http";
import { ProductType } from "@types";

export const useChangeProductCompleteMutation = (
  ...args: Parameters<typeof mutation>
) => {
  const queryClient = useQueryClient();
  const mutation = useMemo(
    () =>
      createMutation({
        mutationFn: async ({ type, id }: { type: ProductType; id: number }) => {
          const res = await http.post.json(
            `/${type === "market" ? "products" : "works"}/sell`,
            {
              postId: id,
            }
          );
          return res.data;
        },
        onSuccess: () => {
          queryClient.invalidateQueries(["/users/my-profile"]);
        },
      }),
    [queryClient]
  );
  return mutation(...args);
};
