import { useMutation } from "@tanstack/react-query";

import { http } from "@lib/services/http";

export const useReportUserMutation = () => {
  return useMutation<
    unknown,
    unknown,
    {
      userId: number;
      reason: string;
    }
  >({
    mutationFn: async (data) => {
      return (await http.post.json(`/users/report`, data)).data;
    },
    onSuccess: () => {},
  });
};
