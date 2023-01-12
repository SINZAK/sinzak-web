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

export default function Page() {
  const { data, isLoading } = useQuery<{
    content: ProductSimple[];
  }>(["marketTest"], async () => {
    return (await http.post.default("/products")).data;
  });

  return (
    <>
      <div className="fixed bottom-0 z-50 flex justify-center w-full p-3 bg-white pb-7 md:hidden">
        <Button intent="primary" size="large" className="w-full max-w-xl">
          등록하기
        </Button>
      </div>
      <div className="container flex flex-col max-w-2xl space-y-7 max-md:pt-3">
        <div className="pb-3">
          <p className="text-3xl font-bold">작품 등록하기</p>
        </div>
        <div>
          <p className="mb-3">분야를 선택해주세요.</p>
          <div className="grid max-w-sm grid-cols-3 gap-3">
            <span className="flex items-center justify-center w-full bg-gray-100 aspect-square rounded-xl">
              작품 판매
            </span>
            <span className="flex items-center justify-center w-full bg-gray-100 aspect-square rounded-xl">
              의뢰해요
            </span>
            <span className="flex items-center justify-center w-full bg-gray-100 aspect-square rounded-xl">
              작업해요
            </span>
          </div>
        </div>
        <div>
          <p className="mb-3">카테고리를 선택해주세요. (최대 3개)</p>
          <div className="flex flex-wrap gap-3">
            <Button intent="primary">
              <CheckIcon className="w-7 h-7 -my-0.5 -ml-1.5" />
              회화일반
            </Button>
            <Button>
              <CheckIcon className="w-7 h-7 -my-0.5 -ml-1.5" />
              동양화
            </Button>
            <Button>
              <CheckIcon className="w-7 h-7 -my-0.5 -ml-1.5" />
              조소
            </Button>
            <Button>
              <CheckIcon className="w-7 h-7 -my-0.5 -ml-1.5" />
              판화
            </Button>
            <Button>
              <CheckIcon className="w-7 h-7 -my-0.5 -ml-1.5" />
              공예
            </Button>
            <Button>
              <CheckIcon className="w-7 h-7 -my-0.5 -ml-1.5" />
              기타
            </Button>
          </div>
        </div>
        <div>
          <p className="mb-3">사진 등록</p>
          <Flicking
            bound
            align="prev"
            className="bleed"
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
            placeholder="작품 제목"
            className="w-full px-4 py-3 bg-gray-100 resize-none rounded-xl placeholder:text-gray-600"
          />
        </div>
        <div>
          <p className="mb-3">가격</p>
          <span className="flex items-center space-x-8">
            <span className="flex items-center flex-1">
              <input
                placeholder="작품 가격"
                type="number"
                className="w-full px-4 py-3 bg-gray-100 resize-none rounded-xl placeholder:text-gray-600"
              />
              <span className="ml-4 text-lg font-bold">원</span>
            </span>
            <span className="flex items-center">
              <CheckBox>가격제안 받기</CheckBox>
            </span>
          </span>
        </div>
        <div>
          <p className="mb-3">내용</p>
          <TextareaAutosize
            placeholder="작품 의도, 작업 기간, 재료, 거래 방법 등을 자유롭게 표현해보세요."
            className="w-full px-4 py-3 bg-gray-100 resize-none rounded-xl placeholder:text-gray-600"
            minRows={3}
          />
        </div>
        <div className="pt-7">
          <Button
            intent="primary"
            size="large"
            className="w-full max-md:hidden"
          >
            등록하기
          </Button>
        </div>
      </div>
    </>
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
