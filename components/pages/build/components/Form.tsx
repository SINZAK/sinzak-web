import { useState } from "react";
import { useRouter } from "next/router";
import { useForm, FormProvider, Controller } from "react-hook-form";
import ReactTextareaAutosize from "react-textarea-autosize";
import { twMerge } from "tailwind-merge";

import { Button } from "@components/atoms/Button";
import { CheckBox } from "@components/atoms/CheckBox";

import { ImageUpload } from "./ImageUpload";
import { SingleSelect } from "./SingleSelect";
import { UploadPopup } from "./UploadPopup";
import { useUploadForm } from "../hooks/useUploadForm";
import { BuildForm } from "../types";

export const Form = () => {
  const methods = useForm<BuildForm>({
    defaultValues: {
      images: [],
    },
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const [uploadText, setUploadText] = useState("");
  const router = useRouter();
  const type = watch("type");

  const onSubmit = useUploadForm({
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
              등록하기
            </Button>
          </div>
        )}
        <div className="flex flex-col space-y-7">
          <div>
            <p className="mb-3">분야를 선택해주세요.</p>
            <ul className="grid max-w-sm grid-cols-3 gap-3">
              <li>
                <input
                  {...register("type")}
                  type="radio"
                  id="type-sell"
                  name="type"
                  value="sell"
                  required
                  className="peer hidden"
                />
                <label
                  htmlFor="type-sell"
                  className="flex aspect-square w-full cursor-pointer items-center justify-center rounded-xl bg-gray-100 peer-checked:border peer-checked:border-red"
                >
                  작품 판매
                </label>
              </li>
              <li>
                <input
                  {...register("type")}
                  type="radio"
                  id="type-workSell"
                  name="type"
                  value="workSell"
                  className="peer hidden"
                />
                <label
                  htmlFor="type-workSell"
                  className="flex aspect-square w-full cursor-pointer items-center justify-center rounded-xl bg-gray-100 peer-checked:border peer-checked:border-red"
                >
                  의뢰해요
                </label>
              </li>
              <li>
                <input
                  {...register("type")}
                  type="radio"
                  id="type-workBuy"
                  name="type"
                  value="workBuy"
                  className="peer hidden"
                />
                <label
                  htmlFor="type-workBuy"
                  className="flex aspect-square w-full cursor-pointer items-center justify-center rounded-xl bg-gray-100 peer-checked:border peer-checked:border-red"
                >
                  작업해요
                </label>
              </li>
            </ul>
          </div>
          {type && (
            <>
              <div>
                <p className="mb-3">카테고리를 선택해주세요.</p>
                {type === "sell" ? (
                  <Controller
                    shouldUnregister
                    control={control}
                    name="category"
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange } }) => (
                      <SingleSelect
                        onChange={onChange}
                        data={[
                          "painting",
                          "orient",
                          "sculpture",
                          "print",
                          "craft",
                          "other",
                        ]}
                      />
                    )}
                  />
                ) : (
                  <Controller
                    shouldUnregister
                    control={control}
                    name="category"
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange } }) => (
                      <SingleSelect
                        onChange={onChange}
                        data={[
                          "portrait",
                          "illustration",
                          "logo",
                          "poster",
                          "design",
                          "editorial",
                          "label",
                        ]}
                      />
                    )}
                  />
                )}
              </div>
              <div>
                <p className="mb-3">사진 등록</p>
                <ImageUpload />
              </div>
              <div>
                <p className="mb-3">제목</p>
                <input
                  {...register("title", {
                    required: true,
                  })}
                  placeholder="작품 제목"
                  className={twMerge(
                    "w-full rounded-xl bg-gray-100 px-4 py-3 placeholder:text-gray-600",
                    errors.title && "ring-1 !ring-red-500"
                  )}
                />
              </div>
              <div>
                <p className="mb-3">{type === "sell" ? "가격" : "의뢰비"}</p>
                <span className="flex items-center space-x-8">
                  <span className="flex flex-1 items-center">
                    <input
                      {...register("price", {
                        required: true,
                        shouldUnregister: true,
                        valueAsNumber: true,
                      })}
                      placeholder={
                        type === "sell" ? "작품 가격" : "제시 의뢰비"
                      }
                      type="number"
                      className={twMerge(
                        "w-full rounded-xl bg-gray-100 px-4 py-3 placeholder:text-gray-600",
                        (errors as any).price && "ring-1 !ring-red-500"
                      )}
                    />
                    <span className="ml-4 text-lg font-bold">원</span>
                  </span>
                  {/* {type === "sell" && ( */}
                  <span className="flex items-center">
                    <Controller
                      shouldUnregister
                      defaultValue={false}
                      control={control}
                      name="suggest"
                      render={({ field: { ref, value, onChange } }) => (
                        <CheckBox ref={ref} checked={value} onChange={onChange}>
                          가격제안 받기
                        </CheckBox>
                      )}
                    />
                  </span>
                  {/* )} */}
                </span>
              </div>
              <div>
                <p className="mb-3">내용</p>
                <ReactTextareaAutosize
                  {...register("content", {
                    required: true,
                  })}
                  placeholder={
                    type === "sell"
                      ? "작품 의도, 작업 기간, 재료, 거래 방법 등을 자유롭게 표현해보세요."
                      : "원하는 의뢰의 형태, 분위기, 재료 등을 자유롭게 설명해주세요!"
                  }
                  className={twMerge(
                    "w-full resize-none rounded-xl bg-gray-100 px-4 py-3 placeholder:text-gray-600",
                    (errors as any).price && "ring-1 !ring-red-500"
                  )}
                  minRows={3}
                />
              </div>
              {type === "sell" && (
                <div className="space-y-4">
                  <p className="mb-3">작품 사이즈 (선택)</p>
                  <p className="flex items-center space-x-4">
                    <span className="shrink-0 text-lg font-bold">가로</span>
                    <input
                      {...register("width", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      className="flex-1 rounded-xl bg-gray-100 px-4 py-3 placeholder:text-gray-600"
                    />
                    <span className="shrink-0 text-lg font-bold">cm</span>
                  </p>
                  <p className="flex items-center space-x-4">
                    <span className="shrink-0 text-lg font-bold">세로</span>
                    <input
                      {...register("vertical", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      className="flex-1 rounded-xl bg-gray-100 px-4 py-3 placeholder:text-gray-600"
                    />
                    <span className="shrink-0 text-lg font-bold">cm</span>
                  </p>
                  <p className="flex items-center space-x-4">
                    <span className="shrink-0 text-lg font-bold">높이</span>
                    <input
                      {...register("height", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      className="flex-1 rounded-xl bg-gray-100 px-4 py-3 placeholder:text-gray-600"
                    />
                    <span className="shrink-0 text-lg font-bold">cm</span>
                  </p>
                </div>
              )}
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
