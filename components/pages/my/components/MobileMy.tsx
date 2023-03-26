import { useCallback } from "react";
import NiceModal from "@ebay/nice-modal-react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { twMerge } from "tailwind-merge";

import { Button } from "@components/atoms/Button";
import { VerifiedIcon } from "@lib/icons";

import { EditProfilePopup } from "./EditProfilePopup";
import { useMyProfileQuery } from "../queries/useMyProfileQuery";

export const MobileMy = () => {
  const { data } = useMyProfileQuery();
  const { profile } = data || {};

  const showEditProfilePopup = useCallback(() => {
    NiceModal.show(EditProfilePopup);
  }, []);

  return (
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
              <p className="text-sm leading-snug">
                {profile.cert_uni ? (
                  <>
                    <VerifiedIcon />
                    <span>{profile.univ}</span>
                  </>
                ) : (
                  <span className="text-gray-600">학교 미인증</span>
                )}
              </p>
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
          <p
            className={twMerge(
              "whitespace-pre-line",
              !data?.profile.introduction && " text-gray-600"
            )}
          >
            {profile?.introduction || "자기소개 미작성"}
          </p>
        </div>
        <Button
          className="!mt-6"
          onClick={showEditProfilePopup}
          intent="primary"
          outline
        >
          프로필 편집
        </Button>
      </div>
      <div className="flex flex-col divide-y text-lg font-bold [&>*]:py-4">
        <Link href="/my/wish">스크랩 목록</Link>
        <Link href="/my/market">내 판매 작품</Link>
        <Link href="/my/work-employ">내 의뢰해요</Link>
        <Link href="/my/work">내 작업해요</Link>
      </div>
    </div>
  );
};
