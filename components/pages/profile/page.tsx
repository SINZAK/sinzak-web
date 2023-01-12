import { CheckBox } from "@components/atoms/CheckBox";
import { ProductElement } from "@components/elements/product/ProductElement";
import { createLayout } from "@components/layout/layout";
import React from "react";
import { Listbox } from "@headlessui/react";
import { AlignIcon } from "@lib/icons";
import { http } from "@lib/services/http";
import { useQuery } from "@tanstack/react-query";
import { ProductSimple, UserProfile } from "@types";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/router";

const options = [
  { id: "recommend", name: "신작추천순" },
  { id: "popular", name: "인기순" },
  { id: "recent", name: "최신순" },
  { id: "low", name: "낮은가격순" },
  { id: "high", name: "높은가격순" },
];

export const useUserProfileQuery = () => {
  const router = useRouter();

  return useQuery<UserProfile>(
    ["userProfileTest", Number(router.query.slug)],
    async () => {
      return (await http.get(`/users/${router.query.slug}/profile`)).data;
    },
    {
      enabled: !!router.query.slug,
    }
  );
};

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
              <div className="fixed top-0 left-0 z-50 w-full h-full bg-black opacity-50 md:hidden" />
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
              <Listbox.Options className="z-50">
                <div className="z-50 fixed max-w-lg text-lg md:text-base max-md:bottom-0 max-md:w-full md:absolute mt-2 right-0 max-md:right-1/2 max-md:translate-x-1/2 px-4 py-4 md:py-2 ring-gray-100 ring-1 min-w-[8rem] rounded-t-3xl md:rounded-xl bg-white max-md:divide-y md:space-y-2 shadow-md cursor-pointer">
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

export default function Page() {
  const { data, isLoading } = useUserProfileQuery();

  return (
    <>
      <div className="container flex flex-col">
        <div className="pt-3 pb-4 space-y-4 md:hidden">mobile</div>
        <div className="items-center hidden h-16 md:flex space-x-7 pb-7">
          <span className="flex-[0_0_16rem] font-bold"></span>
          <span className="flex items-center justify-end flex-1 space-x-4">
            <MarketFilter />
          </span>
        </div>
        <div className="flex">
          <div className="md:block flex-[0_0_16rem] h-screen hidden mr-7 pr-3.5">
            <div className="flex flex-col items-center justify-center space-y-4">
              <span className="inline-block w-16 h-16 bg-gray-200 rounded-xl" />
              <div className="text-center">
                <p className="mb-1 text-xl font-bold leading-tight">
                  {data ? <>{data.name}</> : <Skeleton className="w-12" />}
                </p>
                <p>
                  {data ? (
                    <>{data.univ} verified</>
                  ) : (
                    <Skeleton className="w-28" />
                  )}
                </p>
                <p className="my-3 space-x-6">
                  <span className="inline-flex items-center text-lg">
                    {data ? (
                      <>
                        <span className="mr-2 font-bold">
                          {data?.followerNumber}
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
                          {data?.followerNumber}
                        </span>
                        <span className="text-base">팔로잉</span>
                      </>
                    ) : (
                      <Skeleton className="w-16" />
                    )}
                  </span>
                </p>
                <p className="whitespace-pre-line">
                  {data?.introduction || "자기소개 미작성"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap flex-1 gap-x-3 md:gap-x-7 gap-y-7">
            {/* {(isLoading
              ? Array.from({ length: 16 }, () => undefined)
              : data?.content || []
            ).map((_, i) => (
              <ProductElement
                data={_}
                className="flex-[1_1_40%] sm:flex-[1_1_240px]"
                key={i}
              />
            ))} */}
            {Array.from({ length: 2 }).map((_, i) => (
              <div className="flex-[1_1_40%] sm:flex-[1_1_240px]" key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
Page.getLayout = createLayout({
  mobileNav: true,
  rawHeader: (
    <>
      <div className="container relative flex items-center justify-between h-12 bg-white">
        <span className="absolute top-0 left-0 flex items-center justify-center w-full h-full font-bold">
          마켓
        </span>
        <span></span>
        <span>
          <img src="/assets/icons/search.svg" className="h-6" />
        </span>
      </div>
    </>
  ),
});
