import Link from "next/link";
import Skeleton from "react-loading-skeleton";

import { ChatMiniIcon, ScrapMiniIcon, ViewMiniIcon } from "@lib/icons";
import { getCategoryText } from "@lib/resources/category";
import { useAuth } from "@lib/services/auth";
import { formatNumber, formatRelativeTime } from "@lib/services/intl/format";

import { createLayout } from "@components/layout/layout";

import { FollowingButton } from "../components/FollowingButton";
import { ImageViewer } from "../components/Image/ImageViewer";
import { LikeButton, LikeButtonPlaceholder } from "../components/LikeButton";
import { DesktopMenuButton } from "../components/Menu/DesktopMenuButton";
import { MobileHeader } from "../components/MobileHeader";
import { MobileNav } from "../components/MobileNav";
import { WishButton, WishButtonPlaceholder } from "../components/WishButton";
import {
  MarketQueryContextValue,
  QueryProvider,
  useQueryContext,
} from "../states/QueryProvider";
import { useDeleteMarketItemMutation } from "./queries/delete";
import { useMarketItemQuery } from "./queries/item";
import { useLikeMarketItemMutation } from "./queries/like";
import { useWishMarketItemMutation } from "./queries/wish";

export default function Page() {
  return (
    <QueryProvider
      value={{
        type: "market",
        useItemQuery: useMarketItemQuery,
        useDeleteItemMutation: useDeleteMarketItemMutation,
        useWishMutation: useWishMarketItemMutation,
        useLikeMutation: useLikeMarketItemMutation,
      }}
    >
      <Main />
    </QueryProvider>
  );
}

function Main() {
  const { user } = useAuth();

  const { useItemQuery } = useQueryContext<MarketQueryContextValue>();
  const { data } = useItemQuery();

  const Info = () => (
    <p className="mb-2 md:mb-3">
      {data ? (
        <>
          <span className="divide-x text-sm text-gray-800 md:text-base">
            <span className="pr-2">{getCategoryText(data?.category)}</span>
            <span className="pl-2">{formatRelativeTime(data?.date)}</span>
          </span>
        </>
      ) : (
        <Skeleton className="w-28" />
      )}
    </p>
  );

  const Title = () => (
    <p className="text-xl font-bold">
      {data ? <> {data?.title}</> : <Skeleton className="w-48" />}
    </p>
  );

  const Price = () => (
    <p className="text-xl font-bold">
      {data ? (
        <>{formatNumber(data?.price)}원</>
      ) : (
        <Skeleton className="w-20" />
      )}
    </p>
  );

  const Actions = () => (
    <div className="mt-7 flex divide-x text-lg max-md:hidden">
      {data ? (
        <LikeButton
          id={data.id}
          userId={data.userId}
          likesCnt={data.likesCnt}
          isLike={data.like}
        />
      ) : (
        <LikeButtonPlaceholder />
      )}
      {data ? (
        <WishButton id={data.id} userId={data.userId} isWish={data.wish} />
      ) : (
        <WishButtonPlaceholder />
      )}
    </div>
  );

  const Chat = () =>
    data?.userId !== user?.userId ? (
      <div className="flex flex-[0_0_12rem] flex-col space-y-3 text-lg font-bold max-md:hidden">
        <button className="flex items-center justify-center rounded-full bg-red p-2 align-bottom text-white">
          <img
            alt="ask"
            src="/assets/icons/ask.svg"
            className="mr-1 brightness-0 invert"
          />
          <span>거래 문의하기</span>
        </button>
        <div className="flex space-x-3">
          <button className="box-border flex-1 rounded-full bg-white p-2 text-red ring-1 ring-inset ring-red">
            가격 제안하기
          </button>
          <DesktopMenuButton />
        </div>
      </div>
    ) : (
      <div className="flex h-fit space-x-3 text-lg font-bold max-md:hidden">
        <button className="flex h-11 items-center rounded-full bg-red px-5 text-white">
          <img
            alt="ask"
            src="/assets/icons/ask.svg"
            className="mr-1 h-7 brightness-0 invert"
          />
          문의 중인 채팅방 {data?.chatCnt || 0}
        </button>
        <DesktopMenuButton />
      </div>
    );

  const Profile = () => (
    <div className="flex items-center justify-between">
      <Link
        href={data ? `/profile/${data.userId}` : "#"}
        className="flex flex-1 items-center space-x-4"
      >
        <span className="inline-block h-12 w-12 rounded-xl bg-gray-100" />
        <div>
          <p className="text-lg font-bold leading-tight">
            {data ? <>{data.author}</> : <Skeleton className="w-16" />}
          </p>
          <p className="flex space-x-1 text-sm">
            {data ? (
              <>
                <span>{data?.univ}</span>
                <span>·</span>
                <span>팔로우 {data?.followerNum || 0}</span>
              </>
            ) : (
              <Skeleton className="w-28" />
            )}
          </p>
        </div>
      </Link>
      {data && (
        <FollowingButton isFollowing={data?.following} userId={data?.userId} />
      )}
    </div>
  );

  const Size = () =>
    data &&
    (typeof data.height === "number" || typeof data.width === "number") ? (
      <>
        <div>
          <p className="mb-3 font-bold">상세 사이즈</p>
          <div className="grid max-w-xl grid-cols-3">
            {typeof data.width === "number" && (
              <p className="contents">
                <span>가로</span>
                <span>{data.width}</span>
                <span>cm</span>
              </p>
            )}
            {typeof data.height === "number" && (
              <p className="contents">
                <span>세로</span>
                <span>{data.height}</span>
                <span>cm</span>
              </p>
            )}
          </div>
        </div>
      </>
    ) : null;

  const Content = () => (
    <>
      <p>
        <span className="space-x-2 text-sm text-gray-800 md:text-base">
          <span>
            <ScrapMiniIcon className="mr-0.5 inline-block h-5 w-5 align-text-top" />
            {data?.wishCnt}
          </span>
          <span>
            <ViewMiniIcon className="mr-0.5 inline-block h-5 w-5 align-text-top" />
            {data?.views}
          </span>
          <span>
            <ChatMiniIcon className="mr-0.5 inline-block h-5 w-5 align-text-top" />
            {data?.chatCnt}
          </span>
        </span>
      </p>
      <div className="h-5 md:h-7" />
      <div className="whitespace-pre-wrap text-left">{data?.content}</div>
    </>
  );

  return (
    <>
      <MobileNav />
      <MobileHeader />

      <ImageViewer images={data?.images} />
      <div className="container max-w-4xl">
        <div className="h-5 sm:h-7" />
        <div className="flex">
          <div className="flex-1">
            <Info />
            <Title />
            <Price />
            <Actions />
          </div>
          {data && <Chat />}
        </div>
        <hr className="my-5 md:my-7" />
        <Profile />
        <hr className="my-5 md:my-7" />
        {data ? (
          <>
            <Size />
            <hr className="my-5 md:my-7" />
            <Content />
          </>
        ) : (
          <div className="text-lg">
            <Skeleton count={4} />
            <Skeleton className="w-2/3" />
          </div>
        )}
      </div>
    </>
  );
}

Page.getLayout = createLayout();
