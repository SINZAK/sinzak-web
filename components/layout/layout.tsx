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
            <span>
              <span>아이콘</span>
              <span>아이콘</span>
              <span>아이콘</span>
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
