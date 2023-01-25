import { Fade, Pagination } from "@egjs/flicking-plugins";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { useQuery } from "@tanstack/react-query";

import { http } from "@lib/services/http";

import "@egjs/react-flicking/dist/flicking.css";

const plugins = [new Fade(), new Pagination({ type: "bullet" })];

export const BannerView = () => {
  const { data } = useQuery<
    {
      id: number;
      title: string;
      content: string;
      imageUrl: string;
    }[]
  >(["bannerTest"], async () => {
    return (await http.get("/banner")).data;
  });

  return (
    <div className="bg-gray-100 max-md:container sm:bg-transparent lg:w-full lg:bg-gray-100 lg:py-7 lg:pt-7">
      <Flicking
        circular={true}
        circularFallback="bound"
        align="center"
        hideBeforeInit={true}
        plugins={plugins}
        className="sm:-mb-[1.125rem] sm:pb-[1.125rem]"
      >
        {data
          ? data?.map((banner, i) => (
              <div
                className="relative mr-3 aspect-[343/147] w-full rounded-xl border bg-white bg-cover bg-center md:aspect-[4/1] md:w-4/5 lg:mr-7 lg:w-lg"
                style={{
                  backgroundImage: `url(${banner.imageUrl})`,
                }}
                key={i}
              >
                <p className="absolute top-6 left-8 text-4xl font-bold text-white">
                  테스트
                </p>
                <p className="absolute bottom-6 left-8 text-2xl font-bold text-white">
                  테스트
                </p>
              </div>
            ))
          : Array.from({ length: 4 }).map((_, i) => (
              <div
                className="mr-3 aspect-[343/147] w-full rounded-xl bg-gray-200 md:aspect-[4/1] md:w-4/5 lg:mr-7 lg:w-lg"
                key={i}
              />
            ))}
        <ViewportSlot>
          <div className={"flicking-pagination bottom-3 sm:bottom-0"}></div>
        </ViewportSlot>
      </Flicking>
    </div>
  );
};
