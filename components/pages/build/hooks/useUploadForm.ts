import { useCallback } from "react";

import { http } from "@lib/services/http";

import { useUploadImages } from "./useUploadImages";
import { BuildForm } from "../types";

export const useUploadForm = ({
  onUpload,
  onImageUpload,
  onComplete,
  onError,
}: {
  onUpload: () => void;
  onImageUpload: () => void;
  onComplete: (type: string, id: number) => void;
  onError: (e: unknown) => void;
}) => {
  const uploadImages = useUploadImages({
    onLoad: onImageUpload,
  });

  const uploadForm = useCallback(
    async (data: BuildForm) => {
      try {
        onUpload();
        const { type, category, content, price, suggest, title, images } = data;
        const imageFiles = images
          .filter((x) => x.type === "preview")
          .map((x) => (x.type === "preview" ? x.file : undefined) as File);
        if (type === "sell") {
          const { vertical, width, height } = data;
          const res = await http.post.json("/products/build", {
            category,
            content,
            price,
            suggest,
            title,
            vertical,
            width,
            height,
          });
          const id = res.data.id;
          if (imageFiles.length > 0)
            await uploadImages("products", id, imageFiles);
          onComplete("market", id);
        } else {
          const employment = type === "workBuy";
          const res = await http.post.json("/works/build", {
            category,
            employment,
            content,
            price,
            suggest,
            title,
          });
          const id = res.data.id;
          if (imageFiles.length > 0)
            await uploadImages("works", id, imageFiles);
          onComplete("work", id);
        }
      } catch (e) {
        onError(e);
      }
    },
    [onComplete, onError, onUpload, uploadImages]
  );
  return uploadForm;
};
