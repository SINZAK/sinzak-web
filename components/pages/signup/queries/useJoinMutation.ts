import { useMutation } from "@tanstack/react-query";

import { http } from "@lib/services/http";

export const useJoinMutation = () => {
  return useMutation({
    mutationFn: async ({
      cate,
      nickName,
      term,
    }: {
      cate: string[];
      nickName: string;
      term: boolean;
    }) => {
      return (
        await http.post.json(`/join`, {
          category_like: cate.join(","),
          nickName,
          term,
        })
      ).data;
    },
  });
};
