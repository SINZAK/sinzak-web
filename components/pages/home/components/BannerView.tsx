import { Fade, Pagination } from "@egjs/flicking-plugins";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { useQuery } from "@tanstack/react-query";

import { http } from "@lib/services/http";

import "@egjs/react-flicking/dist/flicking.css";
import Image from "next/image";

import useBreakpoint from "@lib/hooks/useBreakpoint";

const plugins = [new Fade(), new Pagination({ type: "bullet" })];

const bannerListWeb = [
  {
    imageUrl:
      "https://sinzakimage.s3.ap-northeast-2.amazonaws.com/static/webBanner1.png",
  },
  {
    imageUrl:
      "https://sinzakimage.s3.ap-northeast-2.amazonaws.com/static/webBanner2.png",
  },
  {
    imageUrl:
      "https://sinzakimage.s3.ap-northeast-2.amazonaws.com/static/webBanner3.png",
  },
  {
    imageUrl:
      "https://sinzakimage.s3.ap-northeast-2.amazonaws.com/static/webBanner4.png",
  },
];
const BannerListMobile = [
  {
    imageUrl:
      "https://sinzakimage.s3.ap-northeast-2.amazonaws.com/static/banner1.png",
  },
  {
    imageUrl:
      "https://sinzakimage.s3.ap-northeast-2.amazonaws.com/static/banner2.png",
  },
  {
    imageUrl:
      "https://sinzakimage.s3.ap-northeast-2.amazonaws.com/static/banner3.png",
  },
  {
    imageUrl:
      "https://sinzakimage.s3.ap-northeast-2.amazonaws.com/static/banner4.png",
  },
];
function zip<S1, S2>(
  firstCollection: Array<S1>,
  lastCollection: Array<S2>
): Array<[S1, S2]> {
  const length = Math.min(firstCollection.length, lastCollection.length);
  const zipped: Array<[S1, S2]> = [];

  for (let index = 0; index < length; index++) {
    zipped.push([firstCollection[index], lastCollection[index]]);
  }

  return zipped;
}

const bannerList = zip(bannerListWeb, BannerListMobile);

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
    <div className="sm:bg-transparent lg:w-full lg:bg-gray-100 lg:py-7 lg:pt-7">
      <Flicking
        circular={true}
        align="center"
        hideBeforeInit={true}
        plugins={plugins}
        className="max-md:px-3 sm:-mb-[1.125rem] sm:pb-[1.125rem]"
      >
        {bannerList
          ? bannerList?.map((banner, i) => (
              <div
                //
                className="relative mr-3 aspect-[693/308] w-full overflow-hidden rounded-xl border bg-white bg-cover bg-center md:aspect-[4/1] md:w-4/5 lg:mr-7 lg:w-lg"
                // style={{
                //   backgroundImage: `url(${banner.imageUrl})`,
                // }}
                key={i}
              >
                <Image
                  className="max-md:hidden"
                  alt="배너"
                  src={banner[0].imageUrl}
                  width={1232}
                  height={308}
                  draggable={false}
                />
                <Image
                  className="md:hidden"
                  alt="배너"
                  src={banner[1].imageUrl}
                  width={1386}
                  height={616}
                  draggable={false}
                />
                {/* <p className="absolute top-6 left-8 text-4xl font-bold text-white">
                  테스트
                </p>
                <p className="absolute bottom-6 left-8 text-2xl font-bold text-white">
                  테스트
                </p> */}
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
