import { useCallback } from "react";

import { http } from "@lib/services/http";

import { useUploadImages } from "./useUploadImages";
import { BuildForm } from "../types";

export const useUploadForm = ({
  onUpload,
  onImageUpload,
  onComplete,
}: {
  onUpload: () => void;
  onImageUpload: () => void;
  onComplete: (type: string, id: number) => void;
}) => {
  const uploadImages = useUploadImages({
    onLoad: onImageUpload,
  });

  const uploadForm = useCallback(
    async (data: BuildForm) => {
      onUpload();
      if (data.type === "sell") {
        const {
          category,
          content,
          price,
          suggest,
          title,
          images,
          vertical,
          width,
          height,
        } = data;
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
        if (images.length > 0)
          await uploadImages(
            "products",
            id,
            images
              .filter((x) => x.type === "preview")
              .map((x) => (x.type === "preview" ? x.file : undefined) as File)
          );
        onComplete("market", id);
        // router.push(`/market/${id}`);
      } else {
        const { type, category, content, price, suggest, title, images } = data;
        const employment = type === "workBuy";
        const res = await http.post.json("/works/build", {
          category,
          content,
          employment,
          price,
          suggest,
          title,
        });
        const id = res.data.id;
        await uploadImages(
          "works",
          id,
          images
            .filter((x) => x.type === "preview")
            .map((x) => (x.type === "preview" ? x.file : undefined) as File)
        );
        onComplete("work", id);
        // router.push(`/work/${id}`);
      }
    },
    [onComplete, onUpload, uploadImages]
  );
  return uploadForm;
};
