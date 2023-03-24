import { useQueryClient } from "@tanstack/react-query";
import { createMutation } from "react-query-kit";

import { http } from "@lib/services/http";

import { useMyProfileQuery } from "./useMyProfileQuery";

export const useEditCategoryMutation = createMutation({
  mutationFn: async ({ category }: { category: string[] }) => {
    const res = await http.post.json(`/users/edit/category`, {
      categoryLike: category.join(","),
    });
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
