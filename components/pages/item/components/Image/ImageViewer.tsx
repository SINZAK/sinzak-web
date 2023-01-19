import { Fade, Pagination } from "@egjs/flicking-plugins";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { MarketItemDetail } from "@types";
import Image from "next/image";

import "@egjs/react-flicking/dist/flicking.css";

const plugins = [new Fade(), new Pagination({ type: "bullet" })];

export const ImageViewer = ({
  images,
}: Partial<Pick<MarketItemDetail, "images">>) => {
  return (
    <>
      <div className="bg-gray-100 sm:bg-transparent lg:w-full lg:bg-gray-100 lg:py-7 lg:pt-7">
        <Flicking
          key={images?.length}
          plugins={plugins}
          circular={true}
          clrcularFallback="bound"
          align="center"
          hideBeforeInit={true}
          className="sm:-mb-[1.125rem] sm:pb-[1.125rem]"
        >
          {images && images.length
            ? images.map((_, i) => (
                <div
                  className="relative mr-3 aspect-4/3 w-full max-w-xl overflow-hidden bg-gray-100 sm:w-3/5 sm:border md:rounded-xl md:border-gray-200 lg:mr-7 lg:w-2/5"
                  draggable="false"
                  key={i}
                >
                  <Image
                    draggable="false"
                    alt=""
                    unoptimized
                    src={_}
                    fill
                    className="object-cover"
                  />
                </div>
              ))
            : Array.from({ length: 1 }).map((_, i) => (
                <div
                  className="mr-3 aspect-4/3 w-full max-w-xl border border-gray-200 bg-gray-100 sm:w-3/5 sm:rounded-xl lg:mr-7 lg:w-2/5"
                  key={i}
                />
              ))}
          <ViewportSlot>
            <div
              className={
                "flicking-pagination bottom-3 sm:bottom-0" +
                ((images?.length || 0) < 1 ? " hidden" : "")
              }
            ></div>
          </ViewportSlot>
        </Flicking>
      </div>
    </>
  );
};
