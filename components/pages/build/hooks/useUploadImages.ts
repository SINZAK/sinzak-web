import { useCallback } from "react";

import { http } from "@lib/services/http";

export const useUploadImages = ({ onLoad }: { onLoad: () => void }) => {
  const uploadImages = useCallback(
    async (
      endpoint: "works" | "products",
      id: string | number,
      images: File[]
    ) => {
      onLoad();
      const formData = new FormData();
      for (let image of images) {
        formData.append("multipartFile", image);
      }
      await http.post.multipart(`/${endpoint}/${id}/image`, formData);
    },
    [onLoad]
  );
  return uploadImages;
};
