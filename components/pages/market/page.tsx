import { CheckBox } from "@components/atoms/CheckBox";
import { ProductElement } from "@components/elements/product/ProductElement";
import { createLayout } from "@components/layout/layout";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import React from "react";
import { Listbox } from "@headlessui/react";
import { AlignIcon } from "@lib/icons";

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
              <div className="fixed w-full h-full top-0 left-0 bg-black opacity-50 z-50 md:hidden" />
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
  return (
    <>
      <div className="md:block hidden h-12" />
      <div className="container flex flex-col">
        <div className="md:hidden space-y-4 pt-3 pb-4">
          <Flicking
            bound
            moveType="freeScroll"
            align="prev"
            className="bleed"
            cameraClass="[&>*]:mr-3"
          >
            <div className="border-gray-600 border text-gray-600 rounded-full px-3 py-1 font-bold">
              ✓ 전체
            </div>
            <div className="border-red border text-red rounded-full px-3 py-1 font-bold">
              ✓ 회화일반
            </div>
            <div className="border-gray-600 border text-gray-600 rounded-full px-3 py-1 font-bold">
              ✓ 동양화
            </div>
            <div className="border-gray-600 border text-gray-600 rounded-full px-3 py-1 font-bold">
              ✓ 조소
            </div>
            <div className="border-gray-600 border text-gray-600 rounded-full px-3 py-1 font-bold">
              ✓ 판화
            </div>
            <div className="border-gray-600 border text-gray-600 rounded-full px-3 py-1 font-bold">
              ✓ 공예
            </div>
            <div className="border-gray-600 border text-gray-600 rounded-full px-3 py-1 font-bold">
              ✓ 기타
            </div>
          </Flicking>
          <span className="flex justify-between text-sm">
            <MarketFilter />
          </span>
        </div>
        <div className="md:flex hidden space-x-7 items-center pb-7">
          <span className="flex-[0_0_16rem] text-3xl font-bold">마켓</span>
          <span className="flex-1 flex justify-end space-x-4 items-center">
            <MarketFilter />
          </span>
        </div>
        <div className="flex">
          <div className="md:block flex-[0_0_16rem] h-screen hidden mr-7 pr-3.5">
            <div className="bg-gray-100 rounded-xl px-4 py-2 text-lg text-gray-800">
              작품 통합 검색
            </div>
            <div className="h-8" />
            <div className="flex flex-col items-start space-y-3">
              <div className="border-gray-600 border text-gray-600 rounded-full px-3 py-1 font-bold">
                ✓ 전체
              </div>
              <div className="border-red border text-red rounded-full px-3 py-1 font-bold">
                ✓ 회화일반
              </div>
              <div className="border-gray-600 border text-gray-600 rounded-full px-3 py-1 font-bold">
                ✓ 동양화
              </div>
              <div className="border-gray-600 border text-gray-600 rounded-full px-3 py-1 font-bold">
                ✓ 조소
              </div>
              <div className="border-gray-600 border text-gray-600 rounded-full px-3 py-1 font-bold">
                ✓ 판화
              </div>
              <div className="border-gray-600 border text-gray-600 rounded-full px-3 py-1 font-bold">
                ✓ 공예
              </div>
              <div className="border-gray-600 border text-gray-600 rounded-full px-3 py-1 font-bold">
                ✓ 기타
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-wrap gap-x-3 md:gap-x-7 gap-y-7">
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductElement
                className="flex-[1_1_40%] sm:flex-[1_1_240px]"
                key={i}
              />
            ))}{" "}
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
      <div className="h-12 flex container items-center justify-between bg-white relative">
        <span className="font-bold absolute w-full flex top-0 left-0 h-full items-center justify-center">
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
