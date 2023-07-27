import { useState } from "react";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@components/atoms/Button";

import { CategoryField } from "./fields/CategoryField";
import { ContentField } from "./fields/ContentField";
import { DimensionsField } from "./fields/DimensionsField";
import { ImageField } from "./fields/ImageField";
import { PriceField } from "./fields/PriceField";
import { TitleField } from "./fields/TitleField";
import { TypeField } from "./fields/TypeField";
import { UploadPopup } from "./UploadPopup";
import { useUploadForm } from "../hooks/useUploadForm";
import { BuildForm } from "../types";

export const Form = () => {
  const methods = useForm<BuildForm>();

  const { handleSubmit, watch } = methods;

  const [uploadText, setUploadText] = useState("");
  const router = useRouter();
  const type = watch("type");

  const onSubmit = useUploadForm({
    onUpload: () => setUploadText("게시글 업로드 중..."),
    onImageUpload: () => setUploadText("이미지 업로드 중..."),
    onComplete: (type, id) => {
      router.push(`/${type}/${id}`);
    },
    onError: async (e: any) => {
      setUploadText("");
      if (e instanceof Response) {
        const json = await e.json();
        if ("message" in json) {
          toast.error(json.message);
          return;
        }
      }
      toast.error("알 수 없는 오류가 발생했습니다.");
    },
  });

  return (
    <FormProvider {...methods}>
      <UploadPopup text={uploadText} isOpen={!!uploadText} />
      <form
        onSubmit={handleSubmit(onSubmit, (e) => {
          if (e.category) toast.error("카테고리를 선택해주세요.");
          if (e.images) toast.error("이미지를 한 장 이상 등록해주세요.");
        })}
      >
        {type && (
          <div className="fixed bottom-0 left-0 z-30 flex w-full justify-center bg-white p-3 pb-7 md:hidden">
            <Button
              type="submit"
              intent="primary"
              size="large"
              className="w-full max-w-xl"
            >
              등록하기
            </Button>
          </div>
        )}
        <div className="flex flex-col space-y-7">
          <TypeField />
          {type && (
            <>
              <CategoryField />
              <ImageField />
              <TitleField />
              <PriceField />
              <ContentField />
              {type === "sell" && <DimensionsField />}
            </>
          )}
        </div>
        {type && (
          <div className="mt-10">
            <Button
              type="submit"
              intent="primary"
              size="large"
              className="w-full max-md:hidden"
            >
              등록하기
            </Button>
          </div>
        )}
      </form>
    </FormProvider>
  );
};
