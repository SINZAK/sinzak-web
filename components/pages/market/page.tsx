import { CheckBox } from "@components/atoms/CheckBox";
import { ProductElement } from "@components/elements/product/ProductElement";
import { createLayout } from "@components/layout/layout";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import React from "react";
import { Listbox } from "@headlessui/react";
import { AlignIcon } from "@lib/icons";
import { http } from "@lib/services/http";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@types";

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
  const { data, isLoading } = useQuery<{
    content: Product[];
  }>(["productsTest"], async () => {
    return (await http.post.default("/products")).data;
  });

  return (
    <>
      <div className="hidden h-12 md:block" />
      <div className="container flex flex-col">
        <div className="pt-3 pb-4 space-y-4 md:hidden">
          <Flicking
            bound
            moveType="freeScroll"
            align="prev"
            className="bleed"
            cameraClass="[&>*]:mr-3"
          >
            <div className="px-3 py-1 font-bold text-gray-600 border border-gray-600 rounded-full">
              ✓ 전체
            </div>
            <div className="px-3 py-1 font-bold border rounded-full border-red text-red">
              ✓ 회화일반
            </div>
            <div className="px-3 py-1 font-bold text-gray-600 border border-gray-600 rounded-full">
              ✓ 동양화
            </div>
            <div className="px-3 py-1 font-bold text-gray-600 border border-gray-600 rounded-full">
              ✓ 조소
            </div>
            <div className="px-3 py-1 font-bold text-gray-600 border border-gray-600 rounded-full">
              ✓ 판화
            </div>
            <div className="px-3 py-1 font-bold text-gray-600 border border-gray-600 rounded-full">
              ✓ 공예
            </div>
            <div className="px-3 py-1 font-bold text-gray-600 border border-gray-600 rounded-full">
              ✓ 기타
            </div>
          </Flicking>
          <span className="flex justify-between text-sm">
            <MarketFilter />
          </span>
        </div>
        <div className="items-center hidden md:flex space-x-7 pb-7">
          <span className="flex-[0_0_16rem] text-3xl font-bold">마켓</span>
          <span className="flex items-center justify-end flex-1 space-x-4">
            <MarketFilter />
          </span>
        </div>
        <div className="flex">
          <div className="md:block flex-[0_0_16rem] h-screen hidden mr-7 pr-3.5">
            <input
              className="bg-gray-100 rounded-xl focus:ring-[1.5px] focus:ring-gray-200 block w-full px-3 py-2 placeholder-gray-800"
              placeholder="작품 통합 검색"
            />
            <div className="h-8" />
            <div className="flex flex-col items-start space-y-3">
              <div className="px-3 py-1 font-bold text-gray-600 border border-gray-600 rounded-full">
                ✓ 전체
              </div>
              <div className="px-3 py-1 font-bold border rounded-full border-red text-red">
                ✓ 회화일반
              </div>
              <div className="px-3 py-1 font-bold text-gray-600 border border-gray-600 rounded-full">
                ✓ 동양화
              </div>
              <div className="px-3 py-1 font-bold text-gray-600 border border-gray-600 rounded-full">
                ✓ 조소
              </div>
              <div className="px-3 py-1 font-bold text-gray-600 border border-gray-600 rounded-full">
                ✓ 판화
              </div>
              <div className="px-3 py-1 font-bold text-gray-600 border border-gray-600 rounded-full">
                ✓ 공예
              </div>
              <div className="px-3 py-1 font-bold text-gray-600 border border-gray-600 rounded-full">
                ✓ 기타
              </div>
            </div>
          </div>
          <div className="flex flex-wrap flex-1 gap-x-3 md:gap-x-7 gap-y-7">
            {(isLoading
              ? Array.from({ length: 16 }, () => undefined)
              : data?.content || []
            ).map((_, i) => (
              <ProductElement
                data={_}
                className="flex-[1_1_40%] sm:flex-[1_1_240px]"
                key={i}
              />
            ))}
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
