import { ProductElement } from "@components/elements/product/ProductElement";
import { createLayout } from "@components/layout/layout";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="lg:w-full md:pt-7 lg:bg-gray-100 lg:py-7">
        <Flicking
          circular={true}
          clrcularFallback="bound"
          align="center"
          hideBeforeInit={true}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              className="mr-3 lg:mr-7 w-full sm:w-2/5 aspect-4/3 bg-gray-400 sm:rounded-xl"
              key={i}
            ></div>
          ))}
        </Flicking>
      </div>
      <div className="container max-w-4xl">
        <div className="h-5 md:h-7" />
        <div className="flex">
          <div className="flex-1">
            <p className="text-gray-800 mb-2 md:mb-3 text-sm md:text-base divide-x">
              <span className="pr-2">회화일반</span>
              <span className="pl-2">방금 전</span>
            </p>
            <p className="text-xl font-bold">환상</p>
            <p className="text-xl font-bold">43,000원</p>
            <div className="max-md:hidden flex mt-7 text-lg divide-x">
              <button className="flex flex-col items-center pr-4">
                <img
                  alt="like"
                  src="/assets/icons/like.svg"
                  className="h-8 opacity-50"
                />
                <p className="text-sm text-gray-600 mt-1">123</p>
              </button>
              <button className="flex flex-col items-center pl-4">
                <img
                  alt="bookmark"
                  src="/assets/icons/bookmark.svg"
                  className="h-8 opacity-50"
                />
                <p className="text-sm text-gray-600 mt-1">찜하기</p>
              </button>
            </div>
          </div>
          <div className="max-md:hidden flex-[0_0_12rem] flex flex-col text-lg font-bold space-y-3">
            <button className="bg-red text-white rounded-full p-2">
              거래 문의하기
            </button>
            <button className="bg-white text-red ring-red ring-inset ring-1 box-border rounded-full p-2">
              가격 제안하기
            </button>
          </div>
        </div>
        <hr className="my-5 md:my-7" />
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <span className="inline-block w-12 h-12 rounded-xl bg-gray-100" />
            <div>
              <p className="text-lg leading-tight font-bold">홍길동</p>
              <p className="flex space-x-1 text-sm">
                <span>홍익대verified</span>
                <span>·</span>
                <span>팔로우 15</span>
              </p>
            </div>
          </div>
          <button className="border-red border text-red rounded-full px-3 py-1 font-medium">
            팔로우
          </button>
        </div>
        <hr className="my-5 md:my-7" />
        <div>
          <p className="font-bold mb-3">상세 사이즈</p>
          <div className="grid grid-cols-3 max-w-xl">
            <p className="contents">
              <span>가로</span>
              <span>12.3</span>
              <span>cm</span>
            </p>
            <p className="contents">
              <span>세로</span>
              <span>45.6</span>
              <span>cm</span>
            </p>
          </div>
          <hr className="my-5 md:my-7" />
          <div className="whitespace-pre-wrap text-left">{`나의 뭐시기를 표현한 작품. 캔버스 10호. 아크릴. 택배 거래 안돼요,
어쩌구 저쩌구. 홍대입구에서 직거래 선호합니다.`}</div>
        </div>
      </div>
    </>
  );
}
Page.getLayout = createLayout({
  mobileNav: (
    <div className="w-full flex items-start pb-2 pt-3 space-x-2 px-3">
      <div className="flex text-lg divide-x mt-1.5 px-4">
        <button className="flex flex-col items-center pr-4">
          <img
            alt="like"
            src="/assets/icons/like.svg"
            className="h-8 opacity-50"
          />
          <p className="text-sm text-gray-600 mt-1">123</p>
        </button>
        <button className="flex flex-col items-center pl-4">
          <img
            alt="bookmark"
            src="/assets/icons/bookmark.svg"
            className="h-8 opacity-50"
          />
          <p className="text-sm text-gray-600 mt-1">찜하기</p>
        </button>
      </div>
      <div className="flex-1 flex flex-col">
        <button className="bg-red text-white rounded-full p-2 font-bold flex items-center justify-center">
          <img
            alt="ask"
            src="/assets/icons/ask.svg"
            className="h-7 invert brightness-0 mr-1"
          />
          거래 문의하기
        </button>
        <button className="text-purple font-bold mt-1 text-sm">
          가격 제안하기
        </button>
      </div>
    </div>
  ),
  rawHeader: (
    <>
      <div className="h-12 flex container items-center justify-between bg-white relative">
        <span>
          <img src="/assets/icons/back.svg" className="h-6" />
        </span>
        <span>
          <img src="/assets/icons/menu.svg" className="h-6" />
        </span>
      </div>
    </>
  ),
});
