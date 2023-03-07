import { useRef } from "react";
import Flicking from "@egjs/react-flicking";

import { ProductElement } from "@components/elements/ProductElement";
import { ChevronLeftIcon, ChevronRightIcon } from "@lib/icons";

import { SimpleProduct } from "../queries/useMyProfileQuery";

import "@egjs/react-flicking/dist/flicking.css";

export const ProductsCarousel = ({
  data,
  title,
  type,
}: {
  data?: SimpleProduct[];
  title: string;
  type: "work" | "market";
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
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold">{title}</span>
        <span className="flex items-center space-x-4 font-medium md:text-base">
          <span className="hidden items-center space-x-3 font-bold md:flex">
            <button onClick={onClickPrev}>
              <ChevronLeftIcon className="fill-gray-800 text-sm" />
            </button>
            <button onClick={onClickNext}>
              <ChevronRightIcon className="fill-gray-800 text-sm" />
            </button>
          </span>
        </span>
      </div>
      <Flicking key={data?.length} ref={flick} bound align="prev">
        {data?.map(({ thumbnail, ...rest }, i) => (
          <ProductElement
            showPrice={false}
            type={type}
            className="mr-3 w-3/5 sm:w-48 md:w-56 lg:mr-7"
            data={{
              thumbnail: data[i]?.thumbnail || undefined,
              ...rest,
            }}
            key={i}
          />
        ))}
      </Flicking>
    </div>
  );
};
