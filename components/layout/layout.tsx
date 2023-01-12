import { WithAuth } from "@lib/services/auth";
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
            <div className="fixed bottom-0 z-50 w-full bg-white md:hidden">
              {mobileNav}
            </div>
          ) : (
            <div className="fixed bottom-0 z-50 flex justify-center w-full h-16 bg-white md:hidden">
              <div className="grid items-center w-full h-full max-w-xl grid-cols-5 px-2 text-xs">
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
                <Link href="/chat" className="flex flex-col items-center">
                  <img
                    alt="chat"
                    src="/assets/icons/chat.svg"
                    className="h-8"
                  />
                  <p className="leading-tight">채팅</p>
                </Link>
                <Link href="/my" className="flex flex-col items-center">
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
          <div className="sticky top-0 z-50 md:hidden">{rawHeader}</div>
        )}
        <header className="sticky top-0 z-50 justify-center hidden bg-white md:flex">
          <div className="container flex items-center justify-between h-16">
            <span className="flex items-center">
              <Link href="/">
                <img alt="logo" src="/assets/logo-type.svg" className="h-7" />
              </Link>
              <span className="w-16" />
              <span className="space-x-8 text-lg font-bold">
                <Link href="/">홈</Link>
                <Link href="/market">마켓</Link>
                <Link href="/">의뢰</Link>
              </span>
            </span>
            <span className="flex items-center space-x-4">
              <WithAuth>
                {({ user, isLoading }) =>
                  isLoading ? null : user === null ? (
                    <Link
                      href="/auth/signin"
                      className="flex items-center justify-center h-8 px-4 font-bold text-white rounded-full bg-red"
                    >
                      로그인
                    </Link>
                  ) : (
                    <>
                      <Link href="/chat">
                        <img
                          alt="chat"
                          src="/assets/icons/chat.svg"
                          className="h-8"
                        />
                      </Link>
                      <Link href="/my">
                        <img
                          alt="noti"
                          src="/assets/icons/noti.svg"
                          className="h-8"
                        />
                      </Link>
                      <Link href="/my">
                        <img
                          alt="profile"
                          src="/assets/icons/profile.svg"
                          className="h-8"
                        />
                      </Link>
                    </>
                  )
                }
              </WithAuth>
            </span>
          </div>
        </header>
        <main>
          <div className="hidden h-12 md:block" />
          {children}
        </main>
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
