import { useMutation } from "@tanstack/react-query";

import { http } from "@lib/services/http";

export const useCheckMailCertifyMutation = () => {
  return useMutation({
    mutationFn: async ({
      univName,
      email,
      code,
    }: {
      univName: string;
      email: string;
      code: number;
    }) => {
      return (
        await http.post.json<{
          success: boolean;
        }>(`/certify/mail/receive`, {
          code,
          univName,
          univ_email: email,
        })
      ).data;
    },
  });
};
