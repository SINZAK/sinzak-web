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
  const { data, isLoading } = useQuery(["featuredTest"], async () => {
    return http.post.default("/products");
  });

  return (
    <div className="space-y-12 md:space-y-16">
      <FeaturedCarousel />
      <FeaturedCarousel />
      <FeaturedCarousel />
      <FeaturedCarousel />
    </div>
  );
};

export default function Page() {
  const auth = useAuth();
  return (
    <>
      {JSON.stringify(auth)}
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
              className="mr-3 lg:mr-7 w-full md:w-4/5 lg:w-lg aspect-[343/147] md:aspect-[4/1] bg-gray-400 rounded-xl"
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
            className="bleed"
            cameraClass="space-x-3 lg:space-x-7"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-24 bg-gray-200 aspect-square rounded-xl"
              ></div>
            ))}
          </Flicking>
        </div>
      </div>
    </>
  );
}

Page.getLayout = createLayout({
  mobileNav: true,
});
