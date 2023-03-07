import { useMutation } from "@tanstack/react-query";

import { http } from "@lib/services/http";

export const useCheckNicknameMutation = () => {
  return useMutation({
    mutationFn: async (nickName: string) => {
      return (
        await http.post.json<{
          success: boolean;
        }>(`/check/nickname`, {
          nickName,
        })
      ).data;
    },
  });
};
