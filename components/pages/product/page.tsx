import { ProductElement } from "@components/elements/product/ProductElement";
import { createLayout } from "@components/layout/layout";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";

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
      <div className="container max-w-4xl py-7">
        <div className="flex">
          <div className="flex-1">
            <p className="text-gray-800 mb-3">회화일반 | 방금 전</p>
            <p className="text-xl font-bold">환상</p>
            <p className="text-xl font-bold">43,000원</p>
            <div className="flex mt-7 text-lg divide-x">
              <div className="flex flex-col items-center pr-4">
                <button className="w-8 h-8 inline-block bg-gray-200" />
                <p className="text-sm text-gray-600 mt-1">123</p>
              </div>
              <div className="flex flex-col items-center pl-4">
                <button className="w-8 h-8 inline-block bg-gray-200" />
                <p className="text-sm text-gray-600 mt-1">찜하기</p>
              </div>
            </div>
          </div>
          <div className="flex-[0_0_12rem] flex flex-col text-lg font-bold space-y-3">
            <button className="bg-red text-white rounded-full p-2">
              거래 문의하기
            </button>
            <button className="bg-white text-red ring-red ring-inset ring-1 box-border rounded-full p-2">
              가격 제안하기
            </button>
          </div>
        </div>
        <hr className="my-7" />
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
          <div className="border-red border text-red rounded-full px-3 py-1 font-medium">
            팔로우
          </div>
        </div>
        <hr className="my-7" />
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
          <hr className="my-7" />
          <div className="whitespace-pre-wrap text-left">{`나의 뭐시기를 표현한 작품. 캔버스 10호. 아크릴. 택배 거래 안돼요,
어쩌구 저쩌구. 홍대입구에서 직거래 선호합니다.`}</div>
        </div>
      </div>
    </>
  );
}
Page.getLayout = createLayout({
  rawHeader: (
    <>
      <div className="h-11 flex container items-center justify-between bg-white relative">
        <span>뒤로</span>
        <span>메뉴</span>
      </div>
    </>
  ),
});
