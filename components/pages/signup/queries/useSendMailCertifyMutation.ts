import { useMutation } from "@tanstack/react-query";

import { http } from "@lib/services/http";

export const useSendMailCertifyMutation = () => {
  return useMutation({
    mutationFn: async ({
      univName,
      email,
    }: {
      univName: string;
      email: string;
    }) => {
      return (
        await http.post.json<{
          success: boolean;
        }>(`/certify/mail/send`, {
          univName,
          univ_email: email,
        })
      ).data;
    },
  });
};
