import React, { useCallback } from "react";
import NiceModal from "@ebay/nice-modal-react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { twMerge } from "tailwind-merge";

import { Button } from "@components/atoms/Button";
import NoSsr from "@components/atoms/NoSsr";
import { logout } from "@lib/services/auth";

import { EditProfilePopup } from "./components/EditProfilePopup";
import { useMyProfileQuery } from "./queries/useMyProfileQuery";

const DesktopLayout = ({ children }: { children?: React.ReactNode }) => {
  const { data } = useMyProfileQuery();

  const showEditProfilePopup = useCallback(() => {
    NiceModal.show(EditProfilePopup, {
      onOk: () => {},
      initialProfile: data?.profile,
    });
  }, [data?.profile]);

  const { profile } = data || {};

  return (
    <NoSsr>
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
                    <p className="text-sm leading-snug">
                      {profile.cert_uni ? (
                        <span>{profile.univ} verified</span>
                      ) : (
                        <span className="text-gray-600">학교 미인증</span>
                      )}
                    </p>
                  ) : (
                    <Skeleton className="w-28" />
                  )}
                </p>
              </div>
            </div>
            <Button onClick={showEditProfilePopup} intent="primary" outline>
              프로필 편집
            </Button>
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
                        {data.profile.followingNumber}
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
      <div className="container mt-12">
        <div className="hidden md:flex">
          <div className="flex-[0_0_12rem]">
            <div className="flex flex-col space-y-3 text-lg font-bold">
              <Link href="/my">MY</Link>
              <div className="h-3" />
              <Link href="/my/wish">스크랩 목록</Link>
              <Link href="/my/market">내 판매 작품</Link>
              <Link href="/my/work-employ">내 의뢰해요</Link>
              <Link href="/my/work">내 작업해요</Link>
              <div className="h-3" />
              <Link href="/my/setting">설정</Link>
              <button onClick={logout} className="text-left">
                로그아웃
              </button>
            </div>
          </div>
          <div className="w-[calc(100%-12rem)]">{children}</div>
        </div>
      </div>
    </NoSsr>
  );
};

export default DesktopLayout;
