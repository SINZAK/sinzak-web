import Link from "next/link";
import React from "react";

interface LayoutProps {
  rawHeader?: React.ReactNode;
  mobileNav?: boolean | React.ReactNode;
}

const LayoutWrapper = ({
  children,
  rawHeader,
  mobileNav,
}: React.PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <div className="min-h-screen">
        {mobileNav &&
          (typeof mobileNav !== "boolean" ? (
            <div className="md:hidden fixed bottom-0 bg-white w-full z-50">
              {mobileNav}
            </div>
          ) : (
            <div className="h-16 md:hidden fixed bottom-0 bg-white w-full z-50 flex justify-center">
              <div className="max-w-xl w-full px-2 text-xs grid grid-cols-5 items-center h-full">
                <Link href="/" className="flex flex-col items-center">
                  <img
                    alt="chat"
                    src="/assets/icons/home.svg"
                    className="h-8"
                  />
                  <p className="leading-tight">홈</p>
                </Link>
                <Link href="/market" className="flex flex-col items-center">
                  <img
                    alt="chat"
                    src="/assets/icons/market.svg"
                    className="h-8"
                  />
                  <p className="leading-tight">마켓</p>
                </Link>
                <Link href="/" className="flex flex-col items-center">
                  <img
                    alt="chat"
                    src="/assets/icons/task.svg"
                    className="h-8"
                  />
                  <p className="leading-tight">의뢰</p>
                </Link>
                <Link
                  href="/auth/signin"
                  className="flex flex-col items-center"
                >
                  <img
                    alt="chat"
                    src="/assets/icons/chat.svg"
                    className="h-8"
                  />
                  <p className="leading-tight">채팅</p>
                </Link>
                <Link href="/profile" className="flex flex-col items-center">
                  <img
                    alt="chat"
                    src="/assets/icons/profile.svg"
                    className="h-8"
                  />
                  <p className="leading-tight">프로필</p>
                </Link>
              </div>
            </div>
          ))}
        {rawHeader && (
          <div className="md:hidden sticky top-0 z-50">{rawHeader}</div>
        )}
        <header className="sticky top-0 md:flex justify-center hidden z-50 bg-white">
          <div className="container flex justify-between h-16 items-center">
            <span className="flex items-center">
              <Link href="/">
                <img alt="logo" src="/assets/logo-type.svg" className="h-7" />
              </Link>
              <span className="w-16" />
              <span className="text-lg font-bold space-x-8">
                <Link href="/">홈</Link>
                <Link href="/market">마켓</Link>
                <Link href="/">의뢰</Link>
              </span>
            </span>
            <span className="flex space-x-4 items-center">
              <Link href="/profile">
                <img alt="chat" src="/assets/icons/chat.svg" className="h-8" />
              </Link>
              <Link href="/profile">
                <img alt="noti" src="/assets/icons/noti.svg" className="h-8" />
              </Link>
              <Link href="/profile">
                <img
                  alt="profile"
                  src="/assets/icons/profile.svg"
                  className="h-8"
                />
              </Link>
              <Link
                href="/auth/signin"
                className="bg-red h-8 px-4 text-white flex justify-center items-center rounded-full font-bold"
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
