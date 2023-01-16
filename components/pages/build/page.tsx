import { createLayout } from "@components/layout/layout";
import "@egjs/react-flicking/dist/flicking.css";
import React, { useRef, useState } from "react";
import { http } from "@lib/services/http";
import { Button } from "@components/atoms/Button";
import { CloseIcon } from "@lib/icons";
import TextareaAutosize from "react-textarea-autosize";
import { CheckBox } from "@components/atoms/CheckBox";
import { Controller, useForm } from "react-hook-form";
import { Category } from "@lib/resources/category";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/router";
import { SingleSelect } from "./components/SingleSelect";

const ImageUpload = () => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const [message, setMessage] = useState([]);
  const [imageInfos, setImageInfos] = useState([]);
  const progressInfosRef = useRef(null);

  const selectFiles: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files) return;
    let images: string[] = [];

    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]));
    }

    setImagePreviews((_) => [..._, ...images]);
    // setProgressInfos({ val: [] });
    // setMessage([]);
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-3">
      <span>
        <input
          id="input-file"
          type="file"
          multiple
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={selectFiles}
        />
        <label
          htmlFor="input-file"
          className="flex items-center justify-center w-full h-full whitespace-pre-line bg-gray-100 cursor-pointer aspect-square rounded-xl"
        >
          업로드
        </label>
      </span>
      {/* <Flicking
        bound
        align="prev"
        className="max-md:bleed"
        cameraClass="space-x-3"
      > */}
      {imagePreviews.map((_, i) => (
        <span className="relative" key={i}>
          <img
            alt=""
            src={_}
            className="flex items-center justify-center object-cover whitespace-pre-line bg-gray-100 border aspect-square rounded-xl"
            draggable="false"
          />
          <button
            onClick={() => setImagePreviews((x) => x.filter((_, j) => i !== j))}
            type="button"
            className="absolute top-0 right-0 grid w-5 h-5 text-white rounded-full translate-x-1/3 -translate-y-1/3 bg-red place-content-center"
          >
            <CloseIcon />
          </button>
        </span>
      ))}
      {/* </Flicking> */}
    </div>
  );
};

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
    } else {
      const { type, category, content, price, suggest, title } = data;
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
      router.push(`/work/${id}`);
    }
  };
  const type = watch("type");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fixed bottom-0 z-50 flex justify-center w-full p-3 bg-white pb-7 md:hidden">
        <Button
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
                  id="type-workSell"
                  name="type"
                  value="workSell"
                  className="hidden peer"
                />
                <label
                  htmlFor="type-workSell"
                  className="flex items-center justify-center w-full bg-gray-100 cursor-pointer peer-checked:border aspect-square rounded-xl peer-checked:border-red"
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
                  className="hidden peer"
                />
                <label
                  htmlFor="type-workBuy"
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
                "w-full px-4 py-3 bg-gray-100 rounded-xl placeholder:text-gray-600",
                errors.title && "ring-1 !ring-red-500"
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
                "w-full px-4 py-3 bg-gray-100 resize-none rounded-xl placeholder:text-gray-600",
                (errors as any).price && "ring-1 !ring-red-500"
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
  authenticated: true,
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
