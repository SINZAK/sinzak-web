import { Fade, Pagination } from "@egjs/flicking-plugins";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import Image from "next/image";
import Link from "next/link";

import "@egjs/react-flicking/dist/flicking.css";
import { useBannerQuery } from "../queries/useBannerQuery";

const plugins = [new Fade(), new Pagination({ type: "bullet" })];

export const BannerView = () => {
  const { data } = useBannerQuery();

  return (
    <div className="sm:bg-transparent lg:w-full lg:bg-gray-100 lg:py-7 lg:pt-7">
      <Flicking
        key={data?.length}
        circular={true}
        align="center"
        hideBeforeInit={true}
        plugins={plugins}
        className="max-md:px-3 sm:-mb-[1.125rem] sm:pb-[1.125rem]"
      >
        {data
          ? data?.map((banner, i) =>
              banner.href ? (
                <Link
                  href={banner.href}
                  className="relative mr-3 aspect-[693/308] w-full overflow-hidden rounded-xl border bg-white bg-cover bg-center md:aspect-[4/1] md:w-4/5 lg:mr-7 lg:w-lg"
                  key={i}
                >
                  <Image
                    className="max-md:hidden"
                    alt="배너"
                    src={banner.pcImageUrl}
                    width={1232}
                    height={308}
                    draggable={false}
                  />
                  <Image
                    className="md:hidden"
                    alt="배너"
                    src={banner.imageUrl}
                    width={1386}
                    height={616}
                    draggable={false}
                  />
                  {/* <p className="absolute top-6 left-8 text-4xl font-bold text-white">
                    테스트
                  </p> */}
                  {banner.content && (
                    <p className="absolute bottom-6 left-8 text-4xl font-bold text-white">
                      {banner.content}
                    </p>
                  )}
                </Link>
              ) : (
                <div
                  className="relative mr-3 aspect-[693/308] w-full overflow-hidden rounded-xl border bg-white bg-cover bg-center md:aspect-[4/1] md:w-4/5 lg:mr-7 lg:w-lg"
                  key={i}
                >
                  <Image
                    className="max-md:hidden"
                    alt="배너"
                    src={banner.pcImageUrl}
                    width={1232}
                    height={308}
                    draggable={false}
                  />
                  <Image
                    className="md:hidden"
                    alt="배너"
                    src={banner.imageUrl}
                    width={1386}
                    height={616}
                    draggable={false}
                  />
                  {/* <p className="absolute top-6 left-8 text-4xl font-bold text-white">
                    테스트
                  </p> */}
                  {banner.content && (
                    <p className="absolute bottom-6 left-8 text-4xl font-bold text-white">
                      {banner.content}
                    </p>
                  )}
                </div>
              )
            )
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
