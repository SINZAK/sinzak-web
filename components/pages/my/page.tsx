import { ProductElement } from "@components/elements/product/ProductElement";
import { createLayout } from "@components/layout/layout";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="bg-gray-100 py-7 hidden md:block">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4 items-center">
              <span className="inline-block w-14 h-14 rounded-xl bg-gray-200" />
              <div>
                <p className="text-xl leading-tight font-bold">홍길동</p>
                <p className="flex space-x-1">
                  <span>홍익대학교 verified</span>
                </p>
              </div>
            </div>
            <button className="border-red border text-red rounded-full px-8 py-1.5 font-medium">
              프로필 편집
            </button>
          </div>
        </div>
      </div>
      <div className="container mt-7">
        <div className="flex">
          <div className="md:block flex-[0_0_16rem] h-screen hidden mr-7 pr-3.5 text-lg font-bold">
            <div className="flex flex-col space-y-3">
              <Link href="/">스크랩 목록</Link>
              <Link href="/">의뢰해요</Link>
              <Link href="/">판매 작품</Link>
              <Link href="/">작업해요</Link>
              <div className="h-3" />
              <Link href="/">설정</Link>
              <Link href="/">로그아웃</Link>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <p className="flex items-center justify-between mb-7">
              <span className="text-2xl font-bold">스크랩 목록</span>
              <span>판매중 작품만 보기</span>
            </p>
            <div className="flex flex-wrap gap-x-3 md:gap-x-7 gap-y-7">
              {Array.from({ length: 10 }).map((_, i) => (
                <ProductElement
                  className="flex-[1_1_40%] sm:flex-[1_1_240px]"
                  key={i}
                />
              ))}{" "}
              {Array.from({ length: 2 }).map((_, i) => (
                <div className="flex-[1_1_40%] sm:flex-[1_1_240px]" key={i} />
              ))}
            </div>
          </div>
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
