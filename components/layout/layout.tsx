import { Authenticated } from "@components/atoms/Authenticated";
import {
  ChatFilledIcon,
  ChatIcon,
  HomeFilledIcon,
  HomeIcon,
  MarketFilledIcon,
  MarketIcon,
  ProfileFilledIcon,
  ProfileIcon,
  TaskIcon,
} from "@lib/icons";
import { WithAuth } from "@lib/services/auth";
import Link from "next/link";
import React from "react";
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
            <div className="fixed bottom-0 z-50 w-full bg-white md:hidden">
              {mobileNav}
            </div>
          ) : (
            <nav className="fixed bottom-0 z-50 flex justify-center w-full h-16 bg-white md:hidden">
              <ul className="grid items-center w-full h-full max-w-xl grid-cols-5 px-2 text-sm">
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
                  href="/404"
                  icon={TaskIcon}
                  activeIcon={HomeFilledIcon}
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
