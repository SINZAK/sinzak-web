import { createLayout } from "@components/layout/layout";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  return (
    <>
      {JSON.stringify(router.query)}
      <div className="lg:w-full md:pt-7 lg:bg-gray-100 lg:py-7">
        <Flicking
          circular={true}
          clrcularFallback="bound"
          align="center"
          hideBeforeInit={true}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              className="w-full mr-3 bg-gray-200 lg:mr-7 sm:w-2/5 aspect-4/3 sm:rounded-xl"
              key={i}
            ></div>
          ))}
        </Flicking>
      </div>
      <div className="container max-w-4xl">
        <div className="h-5 md:h-7" />
        <div className="flex">
          <div className="flex-1">
            <p className="mb-2 text-sm text-gray-800 divide-x md:mb-3 md:text-base">
              <span className="pr-2">회화일반</span>
              <span className="pl-2">방금 전</span>
            </p>
            <p className="text-xl font-bold">환상</p>
            <p className="text-xl font-bold">43,000원</p>
            <div className="flex text-lg divide-x max-md:hidden mt-7">
              <button className="flex flex-col items-center pr-4">
                <img
                  alt="like"
                  src="/assets/icons/like.svg"
                  className="h-8 opacity-50"
                />
                <p className="mt-1 text-sm text-gray-600">123</p>
              </button>
              <button className="flex flex-col items-center pl-4">
                <img
                  alt="bookmark"
                  src="/assets/icons/bookmark.svg"
                  className="h-8 opacity-50"
                />
                <p className="mt-1 text-sm text-gray-600">찜하기</p>
              </button>
            </div>
          </div>
          <div className="max-md:hidden flex-[0_0_12rem] flex flex-col text-lg font-bold space-y-3">
            <button className="p-2 text-white rounded-full bg-red">
              거래 문의하기
            </button>
            <button className="box-border p-2 bg-white rounded-full text-red ring-red ring-inset ring-1">
              가격 제안하기
            </button>
          </div>
        </div>
        <hr className="my-5 md:my-7" />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="inline-block w-12 h-12 bg-gray-100 rounded-xl" />
            <div>
              <p className="text-lg font-bold leading-tight">홍길동</p>
              <p className="flex space-x-1 text-sm">
                <span>홍익대verified</span>
                <span>·</span>
                <span>팔로우 15</span>
              </p>
            </div>
          </div>
          <button className="px-3 py-1 font-medium border rounded-full border-red text-red">
            팔로우
          </button>
        </div>
        <hr className="my-5 md:my-7" />
        <div>
          <p className="mb-3 font-bold">상세 사이즈</p>
          <div className="grid max-w-xl grid-cols-3">
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
          <div className="text-left whitespace-pre-wrap">{`나의 뭐시기를 표현한 작품. 캔버스 10호. 아크릴. 택배 거래 안돼요,
어쩌구 저쩌구. 홍대입구에서 직거래 선호합니다.`}</div>
        </div>
      </div>
    </>
  );
}
Page.getLayout = createLayout({
  mobileNav: (
    <div className="flex items-start w-full px-3 pt-3 pb-2 space-x-2">
      <div className="flex text-lg divide-x mt-1.5 px-4">
        <button className="flex flex-col items-center pr-4">
          <img
            alt="like"
            src="/assets/icons/like.svg"
            className="h-8 opacity-50"
          />
          <p className="mt-1 text-sm text-gray-600">123</p>
        </button>
        <button className="flex flex-col items-center pl-4">
          <img
            alt="bookmark"
            src="/assets/icons/bookmark.svg"
            className="h-8 opacity-50"
          />
          <p className="mt-1 text-sm text-gray-600">찜하기</p>
        </button>
      </div>
      <div className="flex flex-col flex-1">
        <button className="flex items-center justify-center p-2 font-bold text-white rounded-full bg-red">
          <img
            alt="ask"
            src="/assets/icons/ask.svg"
            className="mr-1 h-7 invert brightness-0"
          />
          거래 문의하기
        </button>
        <button className="mt-1 text-sm font-bold text-purple">
          가격 제안하기
        </button>
      </div>
    </div>
  ),
  rawHeader: (
    <>
      <div className="container relative flex items-center justify-between h-12 bg-white">
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
