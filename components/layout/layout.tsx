import React from "react";

interface LayoutProps {}

const LayoutWrapper = ({ children }: React.PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <div className="min-h-screen">
        <header className="sticky top-0 md:flex justify-center hidden z-50 bg-white">
          <div className="container flex justify-between h-16 items-center">
            <span className="flex items-center">
              <img alt="logo" src="/assets/logo-type.svg" className="h-7" />
              <span className="w-16" />
              <span className="text-lg font-bold space-x-8">
                <span>홈</span>
                <span>마켓</span>
                <span>의뢰</span>
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
