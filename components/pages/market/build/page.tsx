import { createLayout } from "@components/layout/layout";
import "@egjs/react-flicking/dist/flicking.css";
import React from "react";
import { http } from "@lib/services/http";
import { useQuery } from "@tanstack/react-query";
import { ProductSimple } from "@types";
import { Button } from "@components/atoms/Button";
import { CheckIcon } from "@lib/icons";
import Flicking from "@egjs/react-flicking";
import TextareaAutosize from "react-textarea-autosize";
import { CheckBox } from "@components/atoms/CheckBox";
import { Controller, useForm } from "react-hook-form";
import { MultiSelect } from "./components/MultiSelect";
import { Category } from "@lib/resources/category";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/router";
import { SingleSelect } from "./components/SingleSelect";

type BuildForm =
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
      type: "work";
      category: Category;
      title: string;
      content: string;
      pay: number;
    };

export default function Page() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BuildForm>({
    defaultValues: {
      type: "sell",
      content: "",
      title: "",
    },
  });
  const router = useRouter();
  const onSubmit = async (data: BuildForm) => {
    console.log(data);
    if (data.type === "sell") {
      const { category, content, height, price, suggest, title } = data;
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
      router.push(`/market/${id}`);
    }
  };
  const type = watch("type");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fixed bottom-0 z-50 flex justify-center w-full p-3 bg-white pb-7 md:hidden">
        <Button
          //type="button"
          //onClick={() => console.log(getValues())}
          type="submit"
          intent="primary"
          size="large"
          className="w-full max-w-xl"
        >
          등록하기
        </Button>
      </div>
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
                  className="hidden peer"
                />
                <label
                  htmlFor="type-sell"
                  className="flex items-center justify-center w-full bg-gray-100 cursor-pointer peer-checked:border aspect-square rounded-xl peer-checked:border-red"
                >
                  작품 판매
                </label>
              </li>
              <li>
                <input
                  {...register("type")}
                  type="radio"
                  id="type-work"
                  name="type"
                  value="work"
                  className="hidden peer"
                />
                <label
                  htmlFor="type-work"
                  className="flex items-center justify-center w-full bg-gray-100 cursor-pointer peer-checked:border aspect-square rounded-xl peer-checked:border-red"
                >
                  의뢰해요
                </label>
              </li>
              <li>
                <input
                  {...register("type")}
                  type="radio"
                  id="type-work2"
                  name="type"
                  value="work"
                  className="hidden peer"
                />
                <label
                  htmlFor="type-work2"
                  className="flex items-center justify-center w-full bg-gray-100 cursor-pointer peer-checked:border aspect-square rounded-xl peer-checked:border-red"
                >
                  작업해요
                </label>
              </li>
            </ul>
          </div>
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
            <Flicking
              bound
              align="prev"
              className="max-md:bleed"
              cameraClass="space-x-3"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="flex items-center justify-center w-24 whitespace-pre-line bg-gray-100 aspect-square rounded-xl"
                  draggable="false"
                ></span>
              ))}
            </Flicking>
          </div>
          <div>
            <p className="mb-3">제목</p>
            <input
              {...register("title", {
                required: true,
              })}
              placeholder="작품 제목"
              className={twMerge(
                "w-full px-4 py-3 bg-gray-100 rounded-xl placeholder:text-gray-600",
                errors.title && "ring-1 ring-red-500"
              )}
            />
          </div>
          <div>
            <p className="mb-3">{type === "sell" ? "가격" : "의뢰비"}</p>
            <span className="flex items-center space-x-8">
              <span className="flex items-center flex-1">
                <input
                  {...register("price", {
                    required: true,
                    shouldUnregister: true,
                    valueAsNumber: true,
                  })}
                  placeholder={type === "sell" ? "작품 가격" : "제시 의뢰비"}
                  type="number"
                  className={twMerge(
                    "w-full px-4 py-3 bg-gray-100 rounded-xl placeholder:text-gray-600",
                    (errors as any).price && "ring-1 ring-red-500"
                  )}
                />
                <span className="ml-4 text-lg font-bold">원</span>
              </span>
              {type === "sell" && (
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
              )}
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
                "w-full px-4 py-3 bg-gray-100 resize-none rounded-xl placeholder:text-gray-600",
                (errors as any).price && "ring-1 ring-red-500"
              )}
              minRows={3}
            />
          </div>
        </div>
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
      </div>
    </form>
  );
}
Page.getLayout = createLayout({
  rawHeader: (
    <>
      <div className="container relative flex items-center justify-between h-12 bg-white">
        <span className="absolute top-0 left-0 flex items-center justify-center w-full h-full font-bold">
          등록하기
        </span>
        <span>
          <img src="/assets/icons/back.svg" className="h-6" />
        </span>
        <span></span>
      </div>
    </>
  ),
});
