import Link from "next/link";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";

import { Button } from "@components/atoms/Button";
import { FollowingButton } from "@components/elements/FollowingButton";
import { createLayout } from "@components/layout/layout";
import {
  ChatMiniIcon,
  ScrapMiniIcon,
  VerifiedIcon,
  ViewMiniIcon,
} from "@lib/icons";
import { getCategoryText } from "@lib/resources/category";
import { useAuth } from "@lib/services/auth";
import { formatNumber, formatRelativeTime } from "@lib/services/intl/format";

import { useDeleteWorkItemMutation } from "./queries/delete";
import { useWorkItemQuery } from "./queries/item";
import { useLikeWorkItemMutation } from "./queries/like";
import { useSuggestPriceWorkItemMutation } from "./queries/suggest";
import { useWishWorkItemMutation } from "./queries/wish";
import {
  ChatButton,
  ChatButtonPlaceholder,
  MyChatButton,
} from "../components/ChatButton";
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
  const router = useRouter();
  const id = Number(router.query.slug) || undefined;

  return (
    <QueryProvider
      value={{
        id,
        type: "work",
        useItemQuery: () =>
          useWorkItemQuery({
            variables: { id },
          }),
        useDeleteItemMutation: () => useDeleteWorkItemMutation(id),
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
        <>{formatNumber(data?.price)}원</>
      ) : (
        <Skeleton className="w-20" />
      )}
    </p>
  );

  const Actions = () => (
    <div className="mt-7 flex divide-x text-lg max-md:hidden">
      {data?.userId ? (
        <LikeButton
          id={data.id}
          userId={data.userId}
          likesCnt={data.likesCnt}
          isLike={data.like}
        />
      ) : (
        <LikeButtonPlaceholder />
      )}
      {data?.userId ? (
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
    data && user?.userId ? (
      data?.userId !== user?.userId ? (
        <div className="flex flex-[0_0_12rem] flex-col space-y-3 font-bold max-md:hidden">
          <ChatButton disabled={data.userId === null} id={data.id} />
          <div className="flex space-x-3">
            <SuggestPriceButton
              render={(props) => (
                <Button
                  disabled={data.userId === null}
                  {...props}
                  intent="primary"
                  outline
                  size="large"
                  className="flex-1"
                />
              )}
            />
            {data?.userId && <DesktopMenuButton />}
          </div>
        </div>
      ) : (
        <div className="flex h-fit space-x-3 text-lg font-bold max-md:hidden">
          <MyChatButton chatCnt={data.chatCnt} />
          <DesktopMenuButton />
        </div>
      )
    ) : (
      <div className="flex flex-[0_0_12rem] flex-col space-y-3 font-bold max-md:hidden">
        <ChatButtonPlaceholder />
        <Button
          intent="primary"
          outline
          size="large"
          as={Link}
          href="/auth/signin"
        >
          가격 제안하기
        </Button>
      </div>
    );

  const Profile = () => (
    <div className="flex items-center justify-between">
      <Link
        href={data?.userId ? `/profile/${data.userId}` : "javascript:void(0)"}
        className="flex flex-1 items-center space-x-4"
      >
        {data?.author_picture ? (
          <img
            alt="사진"
            src={data.author_picture}
            className="inline-block h-12 w-12 rounded-xl bg-gray-200"
          />
        ) : (
          <span className="inline-block h-12 w-12 rounded-xl bg-gray-200" />
        )}
        <div>
          <p className="text-lg font-bold leading-tight">
            {data ? (
              <>
                <span className="align-middle">{data.author}</span>
                {data.cert_celeb && (
                  <VerifiedIcon className="ml-0.5 text-[0.9em]" />
                )}
              </>
            ) : (
              <Skeleton className="w-16" />
            )}
          </p>
          <p className="flex space-x-1 text-sm">
            {data ? (
              <>
                {data?.univ && (
                  <>
                    <span>{data.univ}</span>
                    <span>·</span>
                  </>
                )}
                <span>팔로우 {data?.followerNum || 0}</span>
              </>
            ) : (
              <Skeleton className="w-28" />
            )}
          </p>
        </div>
      </Link>
      {data?.userId && (
        <FollowingButton isFollowing={data?.following} userId={data?.userId} />
      )}
    </div>
  );

  const Content = () => (
    <>
      <p>
        <span className="space-x-2 text-sm text-gray-800 md:text-base">
          <span className="inline-flex items-center">
            <ScrapMiniIcon className="mr-0.5 inline-block h-5 w-5" />
            {data?.wishCnt}
          </span>
          <span className="inline-flex items-center">
            <ViewMiniIcon className="mr-0.5 inline-block h-5 w-5" />
            {data?.views}
          </span>
          <span className="inline-flex items-center">
            <ChatMiniIcon className="mr-0.5 inline-block h-5 w-5" />
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
