import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useMarketItemQuery } from "@components/pages/item/market/queries/item";
import { http } from "@lib/services/http";

import { useUploadImages } from "./useUploadImages";
import { BuildForm } from "../types";

const useEditFormMutation = ({
  uploadImages,
}: {
  uploadImages: ReturnType<typeof useUploadImages>;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: BuildForm }) => {
      const { type, content, price, suggest, title, images } = data;
      if (!type) throw Error();
      const imageFiles = images
        .filter((x) => x.type === "preview")
        .map((x) => (x.type === "preview" ? x.file : undefined) as File);
      const deleteImageFiles = images
        .filter((x) => x.type === "delete")
        .map((x) => (x.type === "delete" ? x.src : undefined) as string);
      if (type === "sell") {
        const { vertical, width, height } = data;
        await http.post.json(`/products/${id}/edit`, {
          content,
          price,
          suggest,
          title,
          vertical,
          width,
          height,
        });
      } else {
        await http.post.json(`/works/${id}/edit`, {
          content,
          price,
          suggest,
          title,
        });
      }
      const mode = type === "sell" ? "products" : "works";
      for (let url of deleteImageFiles)
        await http.post
          .json(`/${mode}/${id}/deleteimage`, {
            url,
          })
          .catch();
      if (imageFiles.length > 0) await uploadImages(mode, id, imageFiles);
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: useMarketItemQuery.getKey({ id }),
      });
    },
  });
};

export const useEditForm = ({
  id,
  onUpload,
  onImageUpload,
  onComplete,
}: {
  id: number;
  onUpload: () => void;
  onImageUpload: () => void;
  onComplete: (type: string, id: number) => void;
}) => {
  const uploadImages = useUploadImages({
    onLoad: onImageUpload,
  });

  const { mutate } = useEditFormMutation({ uploadImages });

  const uploadForm = useCallback(
    async (data: BuildForm) => {
      onUpload();
      mutate(
        {
          id,
          data,
        },
        {
          onSuccess: () => {
            onComplete(data.type === "sell" ? "market" : "work", id);
          },
          onError: (e: any) =>
            alert(e.message || "알 수 없는 오류가 발생했습니다."),
        }
      );
    },
    [id, mutate, onComplete, onUpload]
  );
  return uploadForm;
};
