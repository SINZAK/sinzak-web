import { ProductElement } from "@components/elements/product/ProductElement";
import { createLayout } from "@components/layout/layout";
import { logout } from "@lib/services/auth";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="hidden bg-gray-100 py-7 md:block">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="inline-block bg-gray-200 w-14 h-14 rounded-xl" />
              <div>
                <p className="text-xl font-bold leading-tight">홍길동</p>
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
      <div className="container mt-12">
        <div className="flex">
          <div className="md:block flex-[0_0_16rem] h-screen hidden mr-7 pr-3.5 text-lg font-bold">
            <div className="flex flex-col space-y-3">
              <Link href="/">스크랩 목록</Link>
              <Link href="/">의뢰해요</Link>
              <Link href="/">판매 작품</Link>
              <Link href="/">작업해요</Link>
              <div className="h-3" />
              <Link href="/">설정</Link>
              <button onClick={logout}>로그아웃</button>
            </div>
          </div>
          <div className="flex flex-col flex-1">
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
              ))}
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
      <div className="container relative flex items-center justify-between h-12 bg-white">
        <span className="absolute top-0 left-0 flex items-center justify-center w-full h-full font-bold">
          스크랩 목록
        </span>
        <span>
          <img src="/assets/icons/back.svg" className="h-6" />
        </span>
        <span></span>
      </div>
    </>
  ),
});
