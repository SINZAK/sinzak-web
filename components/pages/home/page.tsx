import { ProductElement } from "@components/elements/product/ProductElement";
import { createLayout } from "@components/layout/layout";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { ChevronLeftIcon, ChevronRightICon } from "@lib/icons";
import { useAuth } from "@lib/services/auth";
import { http } from "@lib/services/http";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FeaturedCarousel } from "./components/FeaturedCarousel";

const Featured = () => {
  const { data } = useQuery(["featuredTest"], async () => {
    return (await http.post.default("/home/products")).data;
  });

  return (
    <div className="space-y-12 md:space-y-16">
      <FeaturedCarousel title="최신 작품" data={data?.new} />
      <FeaturedCarousel title="신작에서 사랑받는 작품" data={data?.hot} />
      <FeaturedCarousel title="지금 거래중" data={data?.recommend} />
    </div>
  );
};

export default function Page() {
  return (
    <>
      <div className="container flex items-center justify-between h-16 mb-8 md:hidden">
        <img alt="logo" src="/assets/logo-type.svg" className="h-7" />
        <img alt="noti" src="/assets/icons/noti.svg" className="h-8" />
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
              className="mr-3 lg:mr-7 w-full md:w-4/5 lg:w-lg aspect-[343/147] md:aspect-[4/1] bg-gray-200 rounded-xl"
              key={i}
            ></div>
          ))}
        </Flicking>
      </div>
      <div className="container flex flex-col">
        <div className="h-12 md:h-16" />
        <Featured />
        <div className="h-24" />
        <div className="flex flex-col space-y-5 md:space-y-10 md:items-center">
          <div className="flex flex-col space-y-2 md:items-center">
            <p className="text-xl font-bold md:text-2xl">장르별 작품</p>
            <p className="hidden md:block">
              원하는 장르의 작품을 직접 찾아보세요
            </p>
          </div>
          <Flicking
            bound
            align="prev"
            className="bl eed"
            cameraClass="space-x-3 lg:space-x-7"
          >
            {["회화\n일반", "동양화", "조소", "판화", "공예", "기타"].map(
              (_, i) => (
                <Link
                  href="/market"
                  key={i}
                  className="flex items-center justify-center w-24 text-xl font-bold leading-tight text-gray-800 whitespace-pre-line bg-gray-100 aspect-square rounded-xl"
                >
                  {_}
                </Link>
              )
            )}
          </Flicking>
        </div>
      </div>
    </>
  );
}

Page.getLayout = createLayout({
  mobileNav: true,
});
