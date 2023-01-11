import { ProductElement } from "@components/elements/product/ProductElement";
import { createLayout } from "@components/layout/layout";
import { logout } from "@lib/services/auth";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="container flex flex-col md:hidden">
        <div className="flex flex-col items-center justify-center space-y-4 py-7">
          <span className="inline-block w-16 h-16 bg-gray-200 rounded-xl" />
          <div className="text-center">
            <p className="mb-1 text-xl font-bold leading-tight">홍길동</p>
            <p>홍익대학교 verified</p>
            <p className="my-3 space-x-6">
              <span className="inline-flex items-center">
                <span className="mr-2 text-lg font-bold">32</span> 팔로워
              </span>
              <span className="inline-flex items-center">
                <span className="mr-2 text-lg font-bold">25</span> 팔로잉
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
      <div className="container hidden mt-12 md:block">
        <div className="flex">
          <div className="flex-[0_0_16rem] h-screen mr-7 pr-3.5">
            <div className="flex flex-col space-y-3 text-lg font-bold">
              <Link href="/profile/bookmark">스크랩 목록</Link>
              <Link href="/">의뢰해요</Link>
              <Link href="/">판매 작품</Link>
              <Link href="/">작업해요</Link>
              <div className="h-3" />
              <Link href="/">설정</Link>
              <button onClick={logout} className="text-left">
                로그아웃
              </button>
            </div>
          </div>
          <div className="flex flex-col flex-1"></div>
        </div>
      </div>
    </>
  );
}

Page.getLayout = createLayout({
  mobileNav: true,
  rawHeader: (
    <>
      <div className="container relative flex items-center justify-between h-12 bg-white">
        <span></span>
        <span>
          <img src="/assets/icons/setting.svg" className="h-7" />
        </span>
      </div>
    </>
  ),
});
