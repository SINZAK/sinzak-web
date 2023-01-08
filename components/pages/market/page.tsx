import { ProductElement } from "@components/elements/product/ProductElement";
import { createLayout } from "@components/layout/layout";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";

export default function Page() {
  return (
    <>
      <div className="md:block hidden h-12" />
      <div className="container flex flex-col">
        <div className="md:hidden space-y-3 pt-3 pb-7">
          <Flicking
            bound
            align="prev"
            className="bleed-right"
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
          <span className="flex justify-between">
            <span>판매중 작품만 보기</span>
            <span>신작추천순</span>
          </span>
        </div>
        <div className="md:flex hidden space-x-7 items-center pb-7">
          <span className="flex-[0_0_16rem] text-3xl font-bold">마켓</span>
          <span className="flex-1 flex justify-end space-x-4">
            <span>판매중 작품만 보기</span>
            <span>신작추천순</span>
          </span>
        </div>
        <div className="flex">
          <div className="md:block flex-[0_0_16rem] h-screen hidden mr-7 pr-3.5">
            <div className="bg-gray-100 rounded-xl px-4 py-3 text-lg">
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
  rawHeader: (
    <>
      <div className="h-11 flex container items-center justify-between bg-white relative">
        <span className="font-bold absolute w-full flex top-0 left-0 h-full items-center justify-center">
          마켓
        </span>
        <span></span>
        <span>검색</span>
      </div>
    </>
  ),
});
