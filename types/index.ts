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

export interface ProductSimple {
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

export interface ProductDetail {
  author: string;
  author_picture: string;
  category: string;
  cert_celeb: boolean;
  cert_uni: boolean;
  chatCnt: number;
  complete: boolean;
  content: string;
  date: string;
  followerNum: number;
  following: boolean;
  height: number;
  id: number;
  images: string[];
  like: boolean;
  likesCnt: number;
  price: number;
  suggest: boolean;
  title: string;
  trading: boolean;
  univ: string;
  userId: number;
  vertical: number;
  views: number;
  width: number;
  wish: boolean;
  wishCnt: number;
}
