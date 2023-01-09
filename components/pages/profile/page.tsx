import { ProductElement } from "@components/elements/product/ProductElement";
import { createLayout } from "@components/layout/layout";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="md:hidden container flex flex-col">
        <div className="flex flex-col items-center justify-center space-y-4 py-7">
          <span className="inline-block w-16 h-16 rounded-xl bg-gray-200" />
          <div className="text-center">
            <p className="text-xl leading-tight font-bold mb-1">홍길동</p>
            <p>홍익대학교 verified</p>
            <p className="space-x-6 my-3">
              <span className="inline-flex items-center">
                <span className="font-bold text-lg mr-2">32</span> 팔로워
              </span>
              <span className="inline-flex items-center">
                <span className="font-bold text-lg mr-2">25</span> 팔로잉
              </span>
            </p>
            <p className="whitespace-pre-line">
              자유롭게 작업합니다.
              <br />
              인스타그램 ㅁㄴㅇㄹ
            </p>
          </div>
        </div>
        <div className="flex flex-col text-lg font-bold divide-y [&>*]:py-4">
          <Link href="/profile/bookmark">스크랩 목록</Link>
          <Link href="/">의뢰해요</Link>
          <Link href="/">판매 작품</Link>
          <Link href="/">작업해요</Link>
        </div>
      </div>
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
      <div className="container mt-12 md:block hidden">
        <div className="flex">
          <div className="flex-[0_0_16rem] h-screen mr-7 pr-3.5">
            <div className="flex flex-col space-y-3 text-lg font-bold">
              <Link href="/profile/bookmark">스크랩 목록</Link>
              <Link href="/">의뢰해요</Link>
              <Link href="/">판매 작품</Link>
              <Link href="/">작업해요</Link>
              <div className="h-3" />
              <Link href="/">설정</Link>
              <Link href="/">로그아웃</Link>
            </div>
          </div>
          <div className="flex-1 flex flex-col"></div>
        </div>
      </div>
    </>
  );
}

Page.getLayout = createLayout({
  mobileNav: true,
  rawHeader: (
    <>
      <div className="h-12 flex container items-center justify-between bg-white relative">
        <span></span>
        <span>
          <img src="/assets/icons/setting.svg" className="h-7" />
        </span>
      </div>
    </>
  ),
});
