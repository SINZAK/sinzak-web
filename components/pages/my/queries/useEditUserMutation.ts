import { useQueryClient } from "@tanstack/react-query";
import { createMutation } from "react-query-kit";

import { http } from "@lib/services/http";

import { useMyProfileQuery } from "./useMyProfileQuery";

export const useEditUserMutation = createMutation({
  mutationFn: async ({
    introduction,
    name,
    imageFile,
  }: {
    introduction?: string;
    name: string;
    imageFile?: File;
  }) => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("multipartFile", imageFile);
      await http.post.multipart(`/users/edit/image`, formData);
    }
    const res = await http.post.json(`/users/edit`, {
      introduction,
      name,
    });
    return res;
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
