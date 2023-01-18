import "@egjs/react-flicking/dist/flicking.css";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { twMerge } from "tailwind-merge";

import { BackIcon, CloseIcon } from "@lib/icons";
import { Category } from "@lib/resources/category";
import { http } from "@lib/services/http";

import { Button } from "@components/atoms/Button";
import { CheckBox } from "@components/atoms/CheckBox";
import { createLayout } from "@components/layout/layout";

import { SingleSelect } from "./components/SingleSelect";

const ImageUpload = () => {
  const { control } = useFormContext<BuildForm>();

  const selectFiles = (
    value: [string, File][],
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    let images: [string, File][] = [];

    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      images.push([URL.createObjectURL(file), file]);
    }

    return [...value, ...images];
  };
  const deleteImage = (value: [string, File][], i: number) => {
    return value.filter((_, j) => i !== j);
  };

  return (
    <Controller
      control={control}
      name="images"
      rules={{
        required: true,
      }}
      render={({ field: { onChange, value } }) => (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-3">
          <span>
            <input
              id="input-file"
              type="file"
              multiple
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={(e) => onChange(selectFiles(value, e))}
            />
            <label
              htmlFor="input-file"
              className="flex aspect-square h-full w-full cursor-pointer items-center justify-center whitespace-pre-line rounded-xl bg-gray-100"
            >
              업로드
            </label>
          </span>
          {value
            .map((x) => x[0])
            .map((_, i) => (
              <span className="relative" key={i}>
                <img
                  alt=""
                  src={_}
                  className="flex aspect-square items-center justify-center whitespace-pre-line rounded-xl border bg-gray-100 object-cover"
                  draggable="false"
                />
                <button
                  onClick={() => onChange(deleteImage(value, i))}
                  type="button"
                  className="absolute top-0 right-0 grid h-5 w-5 translate-x-1/3 -translate-y-1/3 place-content-center rounded-full bg-red text-white"
                >
                  <CloseIcon />
                </button>
              </span>
            ))}
        </div>
      )}
    />
  );
};

type BuildFormMode =
  | {
      type: "sell";
      category: Category;
      content: string;
      height: number;
      price: number;
      suggest: boolean;
      title: string;
      vertical: number;
      width: number;
    }
  | {
      type: "workSell";
      category: Category;
      employment: false;
      title: string;
      content: string;
      price: number;
      suggest: boolean;
    }
  | {
      type: "workBuy";
      category: Category;
      title: string;
      content: string;
      price: number;
      suggest: boolean;
    };
type BuildForm = BuildFormMode & {
  images: [string, File][];
};

const uploadImages = async (
  endpoint: "works" | "products",
  id: string,
  images: File[]
) => {
  for (let image of images) {
    console.log("uploading...");
    console.log(image);
    const formData = new FormData();
    formData.append("multipartFile", image);
    await http.post.multipart(`/${endpoint}/${id}/image`, formData);
  }
};

export default function Page() {
  const methods = useForm<BuildForm>({
    defaultValues: {
      content: "",
      title: "",
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

  const router = useRouter();

  const onSubmit = async (data: BuildForm) => {
    if (data.type === "sell") {
      const { category, content, height, price, suggest, title, images } = data;
      const res = await http.post.json("/products/build", {
        category,
        content,
        height,
        price,
        suggest,
        title,
        vertical: 150,
        width: 120,
      });
      const id = res.data.id;
      await uploadImages(
        "products",
        id,
        images.map((x) => x[1])
      );
      router.push(`/market/${id}`);
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
        images.map((x) => x[1])
      );
      router.push(`/work/${id}`);
    }
  };
  const type = watch("type");

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {type && (
          <div className="fixed bottom-0 z-30 flex w-full justify-center bg-white p-3 pb-7 md:hidden">
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
        <div className="container max-w-2xl max-md:pt-3">
          <div className="mb-10 max-md:hidden">
            <p className="text-3xl font-bold">작품 등록하기</p>
          </div>
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
                          <CheckBox
                            ref={ref}
                            checked={value}
                            onCheckedChange={onChange}
                          >
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
                  <TextareaAutosize
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
        </div>
      </form>
    </FormProvider>
  );
}

const MobileHeader = () => {
  const router = useRouter();
  return (
    <>
      <div className="container relative flex h-12 items-center justify-start bg-white">
        <button onClick={() => router.back()}>
          <BackIcon />
        </button>
        <span className="absolute left-1/2 flex h-full -translate-x-1/2 items-center font-bold">
          등록하기
        </span>
      </div>
    </>
  );
};

Page.getLayout = createLayout({
  authenticated: true,
  rawHeader: <MobileHeader />,
});
