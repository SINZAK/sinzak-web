import { useState } from "react";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@components/atoms/Button";

import { ContentField } from "./fields/ContentField";
import { DimensionsField } from "./fields/DimensionsField";
import { ImageField } from "./fields/ImageField";
import { PriceField } from "./fields/PriceField";
import { TitleField } from "./fields/TitleField";
import { UploadPopup } from "./UploadPopup";
import { useEditForm } from "../hooks/useEditForm";
import { BuildForm } from "../types";

export const EditForm = ({
  id,
  defaultValues,
}: {
  id: number;
  defaultValues?: Partial<BuildForm>;
}) => {
  const methods = useForm<BuildForm>({
    defaultValues,
  });

  const { handleSubmit, watch } = methods;

  const [uploadText, setUploadText] = useState("");
  const router = useRouter();
  const type = watch("type");

  const onSubmit = useEditForm({
    id,
    onUpload: () => setUploadText("게시글 업로드 중..."),
    onImageUpload: () => setUploadText("이미지 업로드 중..."),
    onComplete: (type, id) => {
      router.push(`/${type}/${id}`);
    },
  });

  return (
    <FormProvider {...methods}>
      <UploadPopup text={uploadText} isOpen={!!uploadText} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {type && (
          <div className="fixed bottom-0 left-0 z-30 flex w-full justify-center bg-white p-3 pb-7 md:hidden">
            <Button
              type="submit"
              intent="primary"
              size="large"
              className="w-full max-w-xl"
            >
              수정하기
            </Button>
          </div>
        )}
        <div className="flex flex-col space-y-7">
          {type && (
            <>
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
              수정하기
            </Button>
          </div>
        )}
      </form>
    </FormProvider>
  );
};
