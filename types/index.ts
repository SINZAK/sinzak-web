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

export interface Product {
  id: number;
  title: string;
  content: string;
  author: string;
  price: number;
  thumbnail: string;
  date: string;
  suggest: boolean;
  likesCnt: number;
  complete: boolean;
  popularity: number;
  like: boolean;
}
