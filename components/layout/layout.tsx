import Link from "next/link";
import React from "react";

interface LayoutProps {
  rawHeader: React.ReactNode;
}

const LayoutWrapper = ({
  children,
  rawHeader,
}: React.PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <div className="min-h-screen">
        <div className="md:hidden fixed bottom-0 h-14 bg-white flex justify-between items-center w-full px-7 z-50">
          <Link href="/">홈</Link>
          <Link href="/market">마켓</Link>
          <Link href="/">의뢰</Link>
          <Link href="/">채팅</Link>
          <Link href="/">프로필</Link>
        </div>
        {rawHeader && (
          <div className="md:hidden sticky top-0 z-50">{rawHeader}</div>
        )}
        <header className="sticky top-0 md:flex justify-center hidden z-50 bg-white">
          <div className="container flex justify-between h-16 items-center">
            <span className="flex items-center">
              <img alt="logo" src="/assets/logo-type.svg" className="h-7" />
              <span className="w-16" />
              <span className="text-lg font-bold space-x-8">
                <Link href="/">홈</Link>
                <Link href="/market">마켓</Link>
                <Link href="/">의뢰</Link>
              </span>
            </span>
            <span className="flex space-x-4">
              <span className="inline-block w-8 h-8 bg-gray-200 whitespace-nowrap">
                채팅
              </span>
              <span className="inline-block w-8 h-8 bg-gray-200 whitespace-nowrap">
                알림
              </span>
              <Link
                href="/auth/signin"
                className="inline-block w-8 h-8 bg-gray-200 whitespace-nowrap"
              >
                로그인
              </Link>
            </span>
          </div>
        </header>
        <main>{children}</main>
      </div>
      <footer className="container h-32"></footer>
    </>
  );
};

const PageLayout = ({
  children,
  ...props
}: React.PropsWithChildren<LayoutProps>) => {
  return <LayoutWrapper {...props}>{children}</LayoutWrapper>;
};

export const createLayout =
  // eslint-disable-next-line react/display-name
  (options?: LayoutProps) => (page: React.ReactElement) =>
    React.createElement(PageLayout, options, page);
