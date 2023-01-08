import { NextPage } from "next";
import { AppProps } from "next/app";

export type CustomNextPage<T extends {} = {}> = NextPage<T> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
  authorized?: boolean;
};

export type CustomAppProps = AppProps & {
  Component: CustomNextPage;
  pageProps: Record<string, any>;
};
