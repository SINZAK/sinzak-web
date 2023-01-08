import { ProductElement } from "@components/elements/product/ProductElement";
import { createLayout } from "@components/layout/layout";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";

const FeaturedCarousel = () => {
  return (
    <div className="space-y-5 md:space-y-10">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">최신 작품</span>
        <span className="flex space-x-2 text-lg font-medium">
          <span className="text-gray-600">더보기</span>
          <span className="hidden md:inline text-xl font-bold space-x-2">
            <span>{"<"}</span>
            <span>{">"}</span>
          </span>
        </span>
      </div>
      <Flicking
        className="bleed-right"
        circular={true}
        circularFallback="bound"
        align="prev"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <ProductElement className="mr-3 lg:mr-7 w-56" key={i} />
        ))}
      </Flicking>
    </div>
  );
};

export default function Page() {
  return (
    <>
      <div className="container flex justify-between h-16 mb-8 items-center md:hidden">
        <img alt="logo" src="/assets/logo-type.svg" className="h-7" />
        <span>아이콘</span>
      </div>
      <div className="max-md:container lg:w-full md:pt-7 lg:bg-gray-100 lg:py-7">
        <Flicking
          circular={true}
          clrcularFallback="bound"
          align="center"
          hideBeforeInit={true}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              className="mr-3 lg:mr-7 w-full md:w-4/5 lg:w-lg aspect-[343/147] md:aspect-[4/1] bg-gray-400 rounded-xl"
              key={i}
            ></div>
          ))}
        </Flicking>
      </div>
      <div className="container flex-col flex">
        <div className="h-16" />
        <div className="space-y-16">
          <FeaturedCarousel />
          <FeaturedCarousel />
          <FeaturedCarousel />
          <FeaturedCarousel />
        </div>
        <div className="h-24" />
        <div className="space-y-5 md:space-y-10 flex flex-col md:items-center">
          <div className="flex flex-col md:items-center space-y-2">
            <p className="text-2xl font-bold">장르별 작품</p>
            <p className="hidden md:block">
              원하는 장르의 작품을 직접 찾아보세요
            </p>
          </div>
          <Flicking
            bound
            align="prev"
            className="bleed-right"
            cameraClass="space-x-3 lg:space-x-7"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-24 aspect-square bg-gray-200 rounded-xl"
              ></div>
            ))}
          </Flicking>
        </div>
      </div>
    </>
  );
}
Page.getLayout = createLayout();
