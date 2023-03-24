import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createMutation } from "react-query-kit";

import { http } from "@lib/services/http";

import { useMyProfileQuery } from "./useMyProfileQuery";

export const useEditCategoryMutation = (
  ...args: Parameters<typeof mutation>
) => {
  const queryClient = useQueryClient();
  const mutation = useMemo(
    () =>
      createMutation({
        mutationFn: async ({ category }: { category: string[] }) => {
          const res = await http.post.json(`/users/edit/category`, {
            categoryLike: category.join(","),
          });
          return res.data;
        },
        onSuccess: () => {
          queryClient.invalidateQueries(useMyProfileQuery.getKey());
        },
      }),
    [queryClient]
  );
  return mutation(...args);
};
