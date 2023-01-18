import { NextPage } from "next";
import { AppProps } from "next/app";

export * from "./query";

export type CustomNextPage<T extends {} = {}> = NextPage<T> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
  authorized?: boolean;
};

export type CustomAppProps = AppProps & {
  Component: CustomNextPage;
  pageProps: Record<string, any>;
};

export interface UserProfile {
  cert_uni: boolean;
  followerNumber: string;
  followingNumber: string;
  ifFollow: boolean;
  imageUrl: string;
  introduction: string;
  myProfile: boolean;
  name: string;
  univ: string;
  userId: number;
}

export interface ItemSimple {
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

export interface MarketItemDetail {
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

export interface WorkItemDetail {
  id: number;
  userId: number;
  author: string;
  author_picture: any;
  univ: string;
  cert_uni: boolean;
  cert_celeb: boolean;
  followerNum: string;
  images: string[];
  title: string;
  category: string;
  date: string;
  content: string;
  price: number;
  suggest: boolean;
  likesCnt: number;
  views: number;
  wishCnt: number;
  chatCnt: number;
  complete: boolean;
  employment: boolean;
  like: boolean;
  wish: boolean;
  following: boolean;
}
