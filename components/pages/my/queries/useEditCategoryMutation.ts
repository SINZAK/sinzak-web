import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createMutation } from "react-query-kit";

import { http } from "@lib/services/http";

export const useEditCategoryMutation = (
  ...args: Parameters<typeof editUserMutation>
) => {
  const queryClient = useQueryClient();
  const editUserMutation = useMemo(
    () =>
      createMutation({
        mutationFn: async ({ category }: { category: string[] }) => {
          const res = await http.post.json(`/users/edit/category`, {
            categoryLike: category.join(","),
          });
          return res.data;
        },
        onSuccess: () => {
          queryClient.invalidateQueries(["/users/my-profile"]);
        },
      }),
    [queryClient]
  );
  return editUserMutation(...args);
};
