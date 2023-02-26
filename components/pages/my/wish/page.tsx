import { ProductElement } from "@components/elements/ProductElement";
import { createLayout } from "@components/layout/layout";

import Layout from "../layout";

export default function Page() {
  return (
    <>
      <Layout>
        <p className="mb-7 flex items-center justify-between">
          <span className="text-2xl font-bold">스크랩 목록</span>
          <span>판매중 작품만 보기</span>
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-7 md:gap-x-7">
          {Array.from({ length: 10 }).map((_, i) => (
            <ProductElement
              type="market"
              className="flex-[1_1_40%] sm:flex-[1_1_240px]"
              key={i}
            />
          ))}
          {Array.from({ length: 2 }).map((_, i) => (
            <div className="flex-[1_1_40%] sm:flex-[1_1_240px]" key={i} />
          ))}
        </div>
      </Layout>
    </>
  );
}

Page.getLayout = createLayout({
  authenticated: true,
  rawHeader: (
    <>
      <div className="container relative flex h-12 items-center justify-between bg-white">
        <span className="absolute top-0 left-0 flex h-full w-full items-center justify-center font-bold">
          스크랩 목록
        </span>
        <span>
          <img src="/assets/icons/back.svg" className="h-6" />
        </span>
        <span></span>
      </div>
    </>
  ),
});
