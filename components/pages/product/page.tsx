import { createLayout } from "@components/layout/layout";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { getCategoryText } from "@lib/resources/category";
import { http } from "@lib/services/http";
import { formatNumber, formatRelativeTime } from "@lib/services/intl/format";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductDetail } from "@types";
import { useRouter } from "next/router";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import { Fade, Pagination } from "@egjs/flicking-plugins";
import { useAuth } from "@lib/services/auth";
import Link from "next/link";
import { LikeFilledIcon, LikeIcon } from "@lib/icons";

const plugins = [new Fade(), new Pagination({ type: "bullet" })];

const useProductQuery = () => {
  const router = useRouter();

  return useQuery<ProductDetail>(
    ["productTest", Number(router.query.slug)],
    async () => {
      return (await http.post.default(`/products/${router.query.slug}`)).data;
    },
    {
      enabled: !!router.query.slug,
    }
  );
};

const useFollowMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    unknown,
    unknown,
    {
      mode: "follow" | "unfollow";
      userId: number;
    }
  >({
    mutationFn: async ({ mode, userId }) => {
      if (mode !== "follow" && mode !== "unfollow") throw Error();
      const res = await http.post.json(
        `/users/${mode === "follow" ? "follow" : "unfollow"}`,
        { userId }
      );
      return res;
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: ["productTest"],
        type: "active",
        predicate: ({ state }) =>
          (state.data as ProductDetail)?.userId === userId,
      });
    },
  });
};

const useLikeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    unknown,
    unknown,
    {
      mode: boolean;
      id: number;
    }
  >({
    mutationFn: async ({ mode, id }) => {
      const res = await http.post.json(`/products/likes`, { id, mode });
      return res;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["productTest", id],
      });
    },
  });
};

const LikeButtonPlaceholder = () => {
  return (
    <div className="flex flex-col items-center pr-4">
      <LikeIcon className="w-8 h-8 fill-gray-600" />
      <p className="mt-1 text-sm text-gray-600">
        <Skeleton className="w-8" />
      </p>
    </div>
  );
};

const LikeButton = ({
  likesCnt,
  isLike,
  userId,
  id,
}: {
  likesCnt: number;
  isLike: boolean;
  userId: number;
  id: number;
}) => {
  const { isLoading, mutate } = useLikeMutation();
  const { user } = useAuth();

  if (!user || user.userId === userId)
    return (
      <div className="flex flex-col items-center pr-4">
        <LikeIcon className="w-8 h-8 fill-gray-600" />
        <p className="mt-1 text-sm text-gray-600">{likesCnt}</p>
      </div>
    );

  return (
    <>
      <button
        onClick={() =>
          mutate({
            mode: !isLike,
            id,
          })
        }
        disabled={isLoading}
        className="flex flex-col items-center pr-4"
      >
        {isLike ? (
          <LikeFilledIcon className="w-8 h-8 fill-gray-600" />
        ) : (
          <LikeIcon className="w-8 h-8 fill-gray-600" />
        )}
        <p className="mt-1 text-sm text-gray-600">{likesCnt}</p>
      </button>
    </>
  );
};

const FollowingButton = ({
  isFollowing,
  userId,
}: {
  isFollowing: boolean;
  userId: number;
}) => {
  const { isLoading, mutate } = useFollowMutation();
  const { user } = useAuth();

  if (!user)
    return (
      <Link
        href="/auth/signin"
        className={
          "px-4 py-1 font-medium border rounded-full border-red text-red"
        }
      >
        팔로우
      </Link>
    );
  if (user.userId === userId) return null;

  return (
    <>
      {isFollowing ? (
        <button
          onClick={() =>
            mutate({
              mode: "unfollow",
              userId,
            })
          }
          disabled={isLoading}
          className={
            "px-4 py-1 font-medium text-white border rounded-full border-red bg-red"
          }
        >
          팔로잉
        </button>
      ) : (
        <button
          onClick={() =>
            mutate({
              mode: "follow",
              userId,
            })
          }
          disabled={isLoading}
          className={
            "px-4 py-1 font-medium border rounded-full border-red text-red"
          }
        >
          팔로우
        </button>
      )}
    </>
  );
};

export default function Page() {
  const { data } = useProductQuery();
  const { user } = useAuth();

  return (
    <>
      <div className="bg-gray-100 lg:w-full md:pt-7 sm:bg-transparent lg:bg-gray-100 lg:py-7">
        <Flicking
          key={data?.images?.length}
          plugins={plugins}
          circular={true}
          clrcularFallback="bound"
          align="center"
          hideBeforeInit={true}
          className="sm:pb-[1.125rem] sm:-mb-[1.125rem]"
        >
          {data?.images && data?.images.length
            ? data.images.map((_, i) => (
                <div
                  className="relative w-full mr-3 overflow-hidden bg-gray-100 sm:border sm:border-gray-200 lg:mr-7 sm:w-2/5 aspect-4/3 sm:rounded-xl"
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
                  className="w-full mr-3 bg-gray-100 border border-gray-200 lg:mr-7 sm:w-2/5 aspect-4/3 sm:rounded-xl"
                  key={i}
                />
              ))}
          <ViewportSlot>
            <div
              className={
                "bottom-3 sm:bottom-0 flicking-pagination" +
                ((data?.images?.length || 0) < 1 ? " hidden" : "")
              }
            ></div>
          </ViewportSlot>
        </Flicking>
      </div>
      <div className="container max-w-4xl">
        <div className="h-5 md:h-7" />
        <div className="flex">
          <div className="flex-1">
            <p className="mb-2 text-sm text-gray-800 divide-x md:mb-3 md:text-base">
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
            <div className="flex text-lg divide-x max-md:hidden mt-7">
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
          {data && data?.userId !== user?.userId && (
            <div className="max-md:hidden flex-[0_0_12rem] flex flex-col text-lg font-bold space-y-3">
              <button className="p-2 text-white rounded-full bg-red">
                거래 문의하기
              </button>
              <button className="box-border p-2 bg-white rounded-full text-red ring-red ring-inset ring-1">
                가격 제안하기
              </button>
            </div>
          )}
        </div>
        <hr className="my-5 md:my-7" />
        <div className="flex items-center justify-between">
          <Link
            href={data ? `/profile/${data.userId}` : "javascript:;"}
            className="flex items-center flex-1 space-x-4"
          >
            <span className="inline-block w-12 h-12 bg-gray-100 rounded-xl" />
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
        <hr className="my-5 md:my-7" />
        <div>
          <p className="mb-3 font-bold">상세 사이즈</p>
          <div className="grid max-w-xl grid-cols-3">
            <p className="contents">
              <span>가로</span>
              <span>12.3</span>
              <span>cm</span>
            </p>
            <p className="contents">
              <span>세로</span>
              <span>45.6</span>
              <span>cm</span>
            </p>
          </div>
          <hr className="my-5 md:my-7" />
          <div className="text-left whitespace-pre-wrap">{data?.content}</div>
        </div>
      </div>
    </>
  );
}

const MobileNav = () => {
  const { data } = useProductQuery();

  return (
    <div className="flex items-start w-full px-3 pt-3 pb-2 space-x-2">
      <div className="flex text-lg divide-x mt-1.5 px-4">
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
      <div className="flex flex-col flex-1">
        <button className="flex items-center justify-center p-2 font-bold text-white rounded-full bg-red">
          <img
            alt="ask"
            src="/assets/icons/ask.svg"
            className="mr-1 h-7 invert brightness-0"
          />
          거래 문의하기
        </button>
        <button className="mt-1 text-sm font-bold text-purple">
          가격 제안하기
        </button>
      </div>
    </div>
  );
};

Page.getLayout = createLayout({
  mobileNav: <MobileNav />,
  rawHeader: (
    <>
      <div className="container relative flex items-center justify-between h-12 bg-white">
        <span>
          <img src="/assets/icons/back.svg" className="h-6" />
        </span>
        <span>
          <img src="/assets/icons/menu.svg" className="h-6" />
        </span>
      </div>
    </>
  ),
});
