import { createLayout } from "@components/layout/layout";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { getCategoryText } from "@lib/resources/category";
import { formatNumber, formatRelativeTime } from "@lib/services/intl/format";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import { Fade, Pagination } from "@egjs/flicking-plugins";
import { useAuth } from "@lib/services/auth";
import Link from "next/link";
import { FollowingButton } from "./components/FollowingButton";
import { LikeButton, LikeButtonPlaceholder } from "./components/LikeButton";
import { MobileNav } from "./components/MobileNav";
import { useProductQuery } from "./queries/product";

import "@egjs/react-flicking/dist/flicking.css";
import { BackIcon, MenuIcon } from "@lib/icons";
import { useRouter } from "next/router";

const plugins = [new Fade(), new Pagination({ type: "bullet" })];
export default function Page() {
  const { data } = useProductQuery();
  const { user } = useAuth();

  return (
    <>
      <div className="bg-gray-100 sm:bg-transparent lg:w-full lg:bg-gray-100 lg:py-7 lg:pt-7">
        <Flicking
          key={data?.images?.length}
          plugins={plugins}
          circular={true}
          clrcularFallback="bound"
          align="center"
          hideBeforeInit={true}
          className="sm:-mb-[1.125rem] sm:pb-[1.125rem]"
        >
          {data?.images && data?.images.length
            ? data.images.map((_, i) => (
                <div
                  className="relative mr-3 aspect-4/3 w-full max-w-xl overflow-hidden bg-gray-100 sm:w-3/5 sm:border md:rounded-xl md:border-gray-200 lg:mr-7 lg:w-2/5"
                  draggable="false"
                  key={i}
                >
                  <Image
                    draggable="false"
                    alt=""
                    unoptimized
                    src={_}
                    fill
                    className="object-cover"
                  />
                </div>
              ))
            : Array.from({ length: 1 }).map((_, i) => (
                <div
                  className="mr-3 aspect-4/3 w-full max-w-xl border border-gray-200 bg-gray-100 sm:w-3/5 sm:rounded-xl lg:mr-7 lg:w-2/5"
                  key={i}
                />
              ))}
          <ViewportSlot>
            <div
              className={
                "flicking-pagination bottom-3 sm:bottom-0" +
                ((data?.images?.length || 0) < 1 ? " hidden" : "")
              }
            ></div>
          </ViewportSlot>
        </Flicking>
      </div>
      <div className="container max-w-4xl">
        <div className="h-5 sm:h-7" />
        <div className="flex">
          <div className="flex-1">
            <p className="mb-2 divide-x text-sm text-gray-800 md:mb-3 md:text-base">
              {data ? (
                <>
                  <span className="pr-2">
                    {getCategoryText(data?.category)}
                  </span>
                  <span className="px-2">{formatRelativeTime(data?.date)}</span>
                  <span className="pl-2">조회수 {data?.views}</span>
                </>
              ) : (
                <Skeleton className="w-28" />
              )}
            </p>
            <p className="text-xl font-bold">
              {data ? <> {data?.title}</> : <Skeleton className="w-48" />}
            </p>
            <p className="text-xl font-bold">
              {data ? (
                <>{formatNumber(data?.price)}원</>
              ) : (
                <Skeleton className="w-20" />
              )}
            </p>
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
              <button className="flex flex-col items-center pl-4">
                <img
                  alt="bookmark"
                  src="/assets/icons/bookmark.svg"
                  className="h-8 opacity-50"
                />
                <p className="mt-1 text-sm text-gray-600">찜하기</p>
              </button>
            </div>
          </div>
          {data &&
            (data?.userId !== user?.userId ? (
              <div className="flex flex-[0_0_12rem] flex-col space-y-3 text-lg font-bold max-md:hidden">
                <button className="flex items-center justify-center rounded-full bg-red p-2 align-bottom text-white">
                  <img
                    alt="ask"
                    src="/assets/icons/ask.svg"
                    className="mr-1 brightness-0 invert"
                  />
                  <span>거래 문의하기</span>
                </button>
                <button className="box-border rounded-full bg-white p-2 text-red ring-1 ring-inset ring-red">
                  가격 제안하기
                </button>
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
                <button className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-800">
                  <MenuIcon />
                </button>
              </div>
            ))}
        </div>
        <hr className="my-5 md:my-7" />
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
            <FollowingButton
              isFollowing={data?.following}
              userId={data?.userId}
            />
          )}
        </div>
        {data ? (
          <>
            {(typeof data.height === "number" ||
              typeof data.width === "number") && (
              <>
                <hr className="my-5 md:my-7" />
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
            )}
            <hr className="my-5 md:my-7" />
            <div className="whitespace-pre-wrap text-left">{data?.content}</div>
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

const MobileHeader = () => {
  const router = useRouter();
  return (
    <>
      <div className="container relative flex h-12 items-center justify-between bg-white">
        <button onClick={() => router.back()}>
          <BackIcon />
        </button>
        <span>
          <MenuIcon />
        </span>
      </div>
    </>
  );
};
Page.getLayout = createLayout({
  mobileNav: <MobileNav />,
  rawHeader: <MobileHeader />,
});
