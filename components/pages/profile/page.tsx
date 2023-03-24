import React, { useCallback } from "react";
import NiceModal from "@ebay/nice-modal-react";
import { Listbox } from "@headlessui/react";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { twMerge } from "tailwind-merge";

import { Button } from "@components/atoms/Button";
import { CheckBox } from "@components/atoms/CheckBox";
import { Menu } from "@components/atoms/Menu";
import { FollowingButton } from "@components/elements/FollowingButton";
import { ProductElement } from "@components/elements/ProductElement";
import { createLayout } from "@components/layout/layout";
import { AlignIcon, MenuIcon } from "@lib/icons";
import { useAuth } from "@lib/services/auth";

import { useUserProfileQuery } from "./queries/useUserProfileQuery";
import { ReportPopup } from "../item/components/ReportPopup";

const options = [
  { id: "recommend", name: "신작추천순" },
  { id: "popular", name: "인기순" },
  { id: "recent", name: "최신순" },
  { id: "low", name: "낮은가격순" },
  { id: "high", name: "높은가격순" },
];

const MarketFilter = () => {
  return (
    <>
      <span className="inline-flex items-center font-medium text-gray-800">
        <CheckBox>판매중 작품만 보기</CheckBox>
      </span>
      <Listbox defaultValue={options[0]}>
        {({ open }) => (
          <>
            {open && (
              <div className="fixed top-0 left-0 z-30 h-full w-full bg-black opacity-50 md:hidden" />
            )}
            <div className="relative font-medium text-gray-800">
              <Listbox.Button className="relative block">
                {({ value }) => (
                  <span className="flex items-center">
                    <AlignIcon />
                    <span className="ml-1">{value.name}</span>
                  </span>
                )}
              </Listbox.Button>
              <Listbox.Options className="z-30">
                <div className="fixed right-0 z-30 mt-2 min-w-[8rem] max-w-lg cursor-pointer rounded-t-3xl bg-white px-4 py-4 text-lg shadow-md ring-1 ring-gray-100 max-md:bottom-0 max-md:right-1/2 max-md:w-full max-md:translate-x-1/2 max-md:divide-y md:absolute md:space-y-2 md:rounded-xl md:py-2 md:text-base">
                  {options.map((option) => (
                    <Listbox.Option
                      className="hover:text-black max-md:py-2"
                      key={option.id}
                      value={option}
                    >
                      {option.name}
                    </Listbox.Option>
                  ))}
                </div>
              </Listbox.Options>
            </div>
          </>
        )}
      </Listbox>
    </>
  );
};

const useUserId = () => {
  const router = useRouter();
  return Number(router.query.slug);
};

export default function Page() {
  const userId = useUserId();
  const { user } = useAuth();

  const { data } = useUserProfileQuery({
    variables: { userId },
  });

  const showReportPopup = useCallback(() => {
    NiceModal.show(ReportPopup, {
      userId,
    });
  }, [userId]);

  return (
    <div className="container max-w-4xl">
      <div className="grid grid-cols-[3rem,1fr] gap-x-4 border-b pb-4">
        {data ? (
          <img
            alt="프로필"
            src={data.profile.imageUrl}
            className="h-12 w-12 rounded-xl bg-gray-100"
          />
        ) : (
          <Skeleton className="block h-12 w-12 rounded-xl" />
        )}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <p className="text-lg font-bold leading-snug">
              {data ? <>{data.profile.name}</> : <Skeleton className="w-12" />}
            </p>
            {data?.profile.cert_uni && (
              <p className="text-sm leading-snug">
                {data.profile.univ} verified
              </p>
            )}
          </div>
          <div className="flex space-x-2">
            {data && user?.userId !== userId && (
              <>
                <FollowingButton
                  isFollowing={data.profile.follow}
                  userId={userId}
                />
                <Menu
                  button={
                    <Button className="aspect-square rounded-full px-0 text-gray-800">
                      <MenuIcon />
                    </Button>
                  }
                >
                  <Menu.Item onClick={showReportPopup}>신고하기</Menu.Item>
                </Menu>
              </>
            )}
          </div>
        </div>
        <div></div>
        <div>
          <p className="my-3 space-x-6">
            <span className="inline-flex items-center">
              {data ? (
                <>
                  <span className="mr-2 font-bold tabular-nums">
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
                  <span className="mr-2 font-bold tabular-nums">
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
      {!!data?.products.length && (
        <>
          <div className="mb-6 mt-10 text-2xl font-bold">작품 목록</div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 md:gap-x-7">
            {data?.products.map((product) => (
              <React.Fragment key={product.id}>
                <ProductElement
                  type="market"
                  showPrice={false}
                  data={product}
                />
              </React.Fragment>
            ))}
          </div>
        </>
      )}
      {!!data?.works.length && (
        <>
          <div className="mb-6 mt-12 text-2xl font-bold md:mt-16">
            의뢰 목록
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 md:gap-x-7">
            {data?.works.map((product) => (
              <React.Fragment key={product.id}>
                <ProductElement type="work" showPrice={false} data={product} />
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

Page.getLayout = createLayout({
  mobileNav: true,
  rawHeader: (
    <>
      <div className="container relative flex h-12 items-center justify-between bg-white">
        <span className="absolute top-0 left-0 flex h-full w-full items-center justify-center font-bold">
          프로필
        </span>
      </div>
    </>
  ),
});
