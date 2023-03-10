import Link from "next/link";
import Skeleton from "react-loading-skeleton";

import { Button } from "@components/atoms/Button";
import { FollowingButton } from "@components/elements/FollowingButton";
import { createLayout } from "@components/layout/layout";
import { ChatMiniIcon, ScrapMiniIcon, ViewMiniIcon } from "@lib/icons";
import { getCategoryText } from "@lib/resources/category";
import { useAuth } from "@lib/services/auth";
import { formatNumber, formatRelativeTime } from "@lib/services/intl/format";

import { useDeleteWorkItemMutation } from "./queries/delete";
import { useWorkItemQuery } from "./queries/item";
import { useLikeWorkItemMutation } from "./queries/like";
import { useSuggestPriceWorkItemMutation } from "./queries/suggest";
import { useWishWorkItemMutation } from "./queries/wish";
import { ImageViewer } from "../components/Image/ImageViewer";
import { LikeButton, LikeButtonPlaceholder } from "../components/LikeButton";
import { DesktopMenuButton } from "../components/Menu/DesktopMenuButton";
import { MobileHeader } from "../components/MobileHeader";
import { MobileNav } from "../components/MobileNav";
import { SuggestPriceButton } from "../components/SuggestPriceButton";
import { WishButton, WishButtonPlaceholder } from "../components/WishButton";
import "@egjs/react-flicking/dist/flicking.css";
import {
  QueryProvider,
  useQueryContext,
  WorkQueryContextValue,
} from "../states/QueryProvider";

export default function Page() {
  return (
    <QueryProvider
      value={{
        type: "work",
        useItemQuery: useWorkItemQuery,
        useDeleteItemMutation: useDeleteWorkItemMutation,
        useWishMutation: useWishWorkItemMutation,
        useLikeMutation: useLikeWorkItemMutation,
        useSuggestPriceMutation: useSuggestPriceWorkItemMutation,
      }}
    >
      <Main />
    </QueryProvider>
  );
}

function Main() {
  const { user } = useAuth();

  const { useItemQuery } = useQueryContext<WorkQueryContextValue>();
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
        <>{formatNumber(data?.price)}???</>
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
        <WishButton
          id={data.id}
          userId={data.userId}
          isWish={data.wish}
          wishCnt={data.wishCnt}
        />
      ) : (
        <WishButtonPlaceholder />
      )}
    </div>
  );

  const Chat = () =>
    user?.userId ? (
      data?.userId !== user?.userId ? (
        <div className="flex flex-[0_0_12rem] flex-col space-y-3 font-bold max-md:hidden">
          <Button intent="primary" size="large">
            <img
              alt="ask"
              src="/assets/icons/ask.svg"
              className="mr-1 brightness-0 invert"
            />
            <span>?????? ????????????</span>
          </Button>
          <div className="flex space-x-3">
            <SuggestPriceButton
              render={({ onClick }) => (
                <Button
                  onClick={onClick}
                  intent="primary"
                  outline
                  size="large"
                  className="flex-1"
                />
              )}
            />
            <DesktopMenuButton />
          </div>
        </div>
      ) : (
        <div className="flex h-fit space-x-3 text-lg font-bold max-md:hidden">
          <Button as={Link} href="/chat" intent="primary">
            <img
              alt="ask"
              src="/assets/icons/ask.svg"
              className="mr-1 h-7 brightness-0 invert"
            />
            ?????? ?????? ????????? {data?.chatCnt || 0}
          </Button>
          <DesktopMenuButton />
        </div>
      )
    ) : (
      <div className="flex flex-[0_0_12rem] flex-col space-y-3 font-bold max-md:hidden">
        <Button intent="primary" size="large" as={Link} href="/auth/signin">
          <img
            alt="ask"
            src="/assets/icons/ask.svg"
            className="mr-1 brightness-0 invert"
          />
          <span>?????? ????????????</span>
        </Button>
        <Button
          intent="primary"
          outline
          size="large"
          as={Link}
          href="/auth/signin"
        >
          ?????? ????????????
        </Button>
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
                {data?.univ && (
                  <>
                    <span>{data.univ}</span>
                    <span>??</span>
                  </>
                )}
                <span>????????? {data?.followerNum || 0}</span>
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
          <Content />
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
