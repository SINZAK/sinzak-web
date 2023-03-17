import { useMutation } from "@tanstack/react-query";

import { http } from "@lib/services/http";

export const useSubmitPhotoCertifyMutation = () => {
  return useMutation({
    mutationFn: async ({
      univName,
      email,
      imageFile,
    }: {
      univName: string;
      email: string;
      imageFile: File;
    }) => {
      const univResult = await http.post.json<{
        success: true;
        id: number;
      }>("/certify/univ", {
        univ: univName,
        univ_email: email,
      });

      const formData = new FormData();
      formData.append("multipartFile", imageFile);
      const result = await http.post.multipart<{ success: true }>(
        `/certify/${univResult.data.id}/image`,
        formData
      );
      return result.data;
    },
  });
};
