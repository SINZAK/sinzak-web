import { useRef } from "react";
import Flicking from "@egjs/react-flicking";
import Link from "next/link";

import { ProductElement } from "@components/elements/ProductElement";
import { ChevronLeftIcon, ChevronRightIcon } from "@lib/icons";
import { ItemSimple } from "@types";

import "@egjs/react-flicking/dist/flicking.css";

export const FeaturedCarousel = ({
  data,
  title,
}: {
  data?: ItemSimple[];
  title: string;
}) => {
  const flick = useRef<Flicking>(null);

  const onClickPrev = () => {
    if (!flick.current || flick.current.animating) return;
    flick.current.moveTo(
      Math.max(
        0,
        flick.current.index >
          flick.current.panelCount - flick.current.visiblePanels.length
          ? flick.current.panelCount -
              flick.current.visiblePanels.length -
              flick.current.visiblePanels.length
          : flick.current.index - flick.current.visiblePanels.length
      )
    );
  };

  const onClickNext = () => {
    if (!flick.current || flick.current.animating) return;
    flick.current.moveTo(
      Math.min(
        flick.current.panelCount - 1,
        flick.current.index + flick.current.visiblePanels.length
      )
    );
  };

  return (
    <div className="space-y-5 md:space-y-10">
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold md:text-2xl">{title}</span>
        <span className="flex items-center space-x-4 text-sm font-medium md:text-base">
          <Link href="/featured">
            <span className="text-gray-800">더보기</span>
          </Link>
          <span className="hidden items-center space-x-3 font-bold md:flex">
            <button onClick={onClickPrev}>
              <ChevronLeftIcon className="fill-gray-800" />
            </button>
            <button onClick={onClickNext}>
              <ChevronRightIcon className="fill-gray-800" />
            </button>
          </span>
        </span>
      </div>
      <Flicking
        key={data?.length}
        ref={flick}
        className="bleed"
        bound
        align="prev"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <ProductElement
            type="market"
            className="mr-3 w-3/5 sm:w-48 md:w-56 lg:mr-7"
            data={data && data.length >= i ? data[i] : undefined}
            key={i}
          />
        ))}
      </Flicking>
    </div>
  );
};
