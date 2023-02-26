import React from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { twMerge } from "tailwind-merge";

import NoSsr from "@components/atoms/NoSsr";
import { logout } from "@lib/services/auth";
import { http } from "@lib/services/http";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { data } = useQuery<{
    products: any[];
    profile: {
      userId: number;
      myProfile: boolean;
      name: string;
      introduction: string;
      followingNumber: string;
      followerNumber: string;
      imageUrl: string;
      univ: string | null;
      cert_uni: boolean;
      isFollow: boolean;
    };
  }>(["profileTest"], async () => {
    return (await http.get(`/users/my-profile`)).data;
  });

  const { profile, products } = data || {};

  return (
    <NoSsr>
      <div className="container flex flex-col md:hidden">
        <div className="flex flex-col items-center justify-center space-y-4 py-7">
          {profile ? (
            <img
              alt="프로필 사진"
              src={profile?.imageUrl}
              className="block h-16 w-16 rounded-xl bg-gray-200"
            />
          ) : (
            <Skeleton className="block h-16 w-16 rounded-xl" />
          )}
          <div className="text-center">
            <p className="mb-1 text-xl font-bold leading-tight">
              {profile ? <>{profile.name}</> : <Skeleton className="w-12" />}
            </p>
            <p>
              {profile ? (
                profile.cert_uni && (
                  <p className="text-sm leading-snug">
                    {profile.cert_uni} verified
                  </p>
                )
              ) : (
                <Skeleton className="w-28" />
              )}
            </p>
            <p className="my-3 space-x-6">
              <span className="inline-flex items-center text-lg">
                {profile ? (
                  <>
                    <span className="mr-2 font-bold">
                      {profile?.followerNumber}
                    </span>
                    <span className="text-base">팔로워</span>
                  </>
                ) : (
                  <Skeleton className="w-16" />
                )}
              </span>
              <span className="inline-flex items-center text-lg">
                {data ? (
                  <>
                    <span className="mr-2 font-bold">
                      {profile?.followingNumber}
                    </span>
                    <span className="text-base">팔로잉</span>
                  </>
                ) : (
                  <Skeleton className="w-16" />
                )}
              </span>
            </p>
            <p className="whitespace-pre-line">
              {profile?.introduction || "자기소개 미작성"}
            </p>
          </div>
        </div>
        <div className="flex flex-col divide-y text-lg font-bold [&>*]:py-4">
          <Link href="/my/wish">스크랩 목록</Link>
          <Link href="/">의뢰해요</Link>
          <Link href="/">판매 작품</Link>
          <Link href="/">작업해요</Link>
        </div>
      </div>

      <div className="container hidden md:block">
        <div className="flex flex-col border-b pb-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {profile ? (
                <img
                  alt="프로필 사진"
                  src={profile?.imageUrl}
                  className="block h-14 w-14 rounded-xl bg-gray-200"
                />
              ) : (
                <Skeleton className="block h-14 w-14 rounded-xl" />
              )}
              <div>
                <p className="text-xl font-bold leading-tight">
                  {profile ? (
                    <>{profile.name}</>
                  ) : (
                    <Skeleton className="w-12" />
                  )}
                </p>
                <p className="flex space-x-1">
                  {profile ? (
                    profile.cert_uni && (
                      <p className="text-sm leading-snug">
                        {profile.cert_uni} verified
                      </p>
                    )
                  ) : (
                    <Skeleton className="w-28" />
                  )}
                </p>
              </div>
            </div>
            <button className="rounded-full border border-red px-8 py-1.5 font-medium text-red">
              프로필 편집
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-block h-14 w-14" />
            <div>
              <p className="my-3 space-x-6">
                <span className="inline-flex items-center">
                  {data ? (
                    <>
                      <span className="mr-2 font-bold">
                        {data.profile.followerNumber}
                      </span>
                      <span className="text-sm">팔로워</span>
                    </>
                  ) : (
                    <Skeleton className="w-16" />
                  )}
                </span>
                <span className="inline-flex items-center">
                  {data ? (
                    <>
                      <span className="mr-2 font-bold">
                        {data.profile.followerNumber}
                      </span>
                      <span className="text-sm">팔로잉</span>
                    </>
                  ) : (
                    <Skeleton className="w-16" />
                  )}
                </span>
              </p>
              <p
                className={twMerge(
                  "whitespace-pre-line text-sm",
                  !data?.profile.introduction && " text-gray-600"
                )}
              >
                {data?.profile.introduction || "자기소개 미작성"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-12 hidden md:block">
        <div className="flex">
          <div className="mr-7 flex-[0_0_16rem] pr-3.5">
            <div className="flex flex-col space-y-3 text-lg font-bold">
              <Link href="/my">MY</Link>
              <div className="h-3" />
              <Link href="/my/wish">스크랩 목록</Link>
              <Link href="/">의뢰해요</Link>
              <Link href="/">판매 작품</Link>
              <Link href="/">작업해요</Link>
              <div className="h-3" />
              <Link href="/">설정</Link>
              <button onClick={logout} className="text-left">
                로그아웃
              </button>
            </div>
          </div>
          <div className="flex flex-1 flex-col">{children}</div>
        </div>
      </div>
    </NoSsr>
  );
};

export default Layout;
