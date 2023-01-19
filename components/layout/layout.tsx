import Link from "next/link";
import React from "react";

import {
  ChatFilledIcon,
  ChatIcon,
  HomeFilledIcon,
  HomeIcon,
  MarketFilledIcon,
  MarketIcon,
  ProfileFilledIcon,
  ProfileIcon,
  TaskFilledIcon,
  TaskIcon,
} from "@lib/icons";
import { WithAuth } from "@lib/services/auth";

import { Authenticated } from "@components/atoms/Authenticated";

import { MobileNavLink } from "./NavLink";

interface LayoutProps {
  authenticated?: boolean;
  rawHeader?: React.ReactNode;
  mobileNav?: boolean | React.ReactNode;
}

const LayoutWrapper = ({
  authenticated,
  children,
  rawHeader,
  mobileNav,
}: React.PropsWithChildren<LayoutProps>) => {
  return React.createElement(
    authenticated ? Authenticated : React.Fragment,
    {},
    <>
      <div className="min-h-screen">
        {mobileNav &&
          (typeof mobileNav !== "boolean" ? (
            <div className="fixed bottom-0 z-30 w-full bg-white md:hidden">
              {mobileNav}
            </div>
          ) : (
            <nav className="fixed bottom-0 z-30 flex h-16 w-full justify-center bg-white md:hidden">
              <ul className="grid h-full w-full max-w-xl grid-cols-5 items-center px-2 text-sm">
                <MobileNavLink
                  href="/"
                  exact
                  icon={HomeIcon}
                  activeIcon={HomeFilledIcon}
                  text="홈"
                />
                <MobileNavLink
                  href="/market"
                  icon={MarketIcon}
                  activeIcon={MarketFilledIcon}
                  text="마켓"
                />
                <MobileNavLink
                  href="/work"
                  icon={TaskIcon}
                  activeIcon={TaskFilledIcon}
                  text="의뢰"
                />
                <MobileNavLink
                  href="/chat"
                  icon={ChatIcon}
                  activeIcon={ChatFilledIcon}
                  text="채팅"
                />
                <MobileNavLink
                  href="/my"
                  icon={ProfileIcon}
                  activeIcon={ProfileFilledIcon}
                  text="프로필"
                />
              </ul>
            </nav>
          ))}
        {rawHeader && (
          <div className="sticky top-0 z-30 md:hidden">{rawHeader}</div>
        )}
        <header className="sticky top-0 z-30 hidden justify-center bg-white md:flex">
          <div className="container flex h-16 items-center justify-between">
            <span className="flex items-center">
              <Link href="/">
                <img alt="logo" src="/assets/logo-type.svg" className="h-7" />
              </Link>
              <span className="w-16" />
              <span className="space-x-8 text-lg font-bold">
                <Link href="/">홈</Link>
                <Link href="/market">마켓</Link>
                <Link href="/work">의뢰</Link>
              </span>
            </span>
            <span className="flex items-center space-x-4">
              <WithAuth>
                {({ user, isLoading }) =>
                  isLoading ? null : user === null ? (
                    <Link
                      href="/auth/signin"
                      className="flex h-8 items-center justify-center rounded-full bg-red px-4 font-bold text-white"
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
        <main className="pb-24">
          <div className="hidden h-12 md:block" />
          {children}
        </main>
      </div>
      <footer className="container border-t max-md:hidden">
        <div className="flex items-center space-x-8 py-7">
          <img
            alt="logo"
            src="/assets/logo-type.svg"
            className="h-5 opacity-50 saturate-0"
          />
          <p className="flex flex-1 items-center justify-between text-sm text-gray-800">
            <span className="space-x-4">
              <span>프로젝트 소개</span>
              <span>이용약관</span>
              <span>개인정보처리방침</span>
            </span>
            <span>© SINZAK Team. All Rights Reserved.</span>
          </p>
        </div>
      </footer>
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
