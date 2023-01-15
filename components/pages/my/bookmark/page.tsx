import { ProductElement } from "@components/elements/product/ProductElement";
import { createLayout } from "@components/layout/layout";
import Layout from "../layout";

export default function Page() {
  return (
    <>
      <Layout>
        <p className="flex items-center justify-between mb-7">
          <span className="text-2xl font-bold">스크랩 목록</span>
          <span>판매중 작품만 보기</span>
        </p>
        <div className="flex flex-wrap gap-x-3 md:gap-x-7 gap-y-7">
          {Array.from({ length: 10 }).map((_, i) => (
            <ProductElement
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
      <div className="container relative flex items-center justify-between h-12 bg-white">
        <span className="absolute top-0 left-0 flex items-center justify-center w-full h-full font-bold">
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
