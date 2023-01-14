import { ProductElement } from "@components/elements/product/ProductElement";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useProductQuery } from "../queries/product";
import { useFilter } from "../states/filter";

export const ProductsView = () => {
  const filter = useFilter();
  const { data, isLoading, fetchNextPage } = useProductQuery(filter);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!data) return;
    if (inView) fetchNextPage();
  }, [data, fetchNextPage, inView]);

  return (
    <div>
      <div className="flex flex-wrap flex-1 gap-x-3 md:gap-x-7 gap-y-7">
        {(isLoading
          ? Array.from({ length: 16 }, () => undefined)
          : data?.pages.map(({ content }) => content).flat() || []
        ).map((_, i) => (
          <ProductElement
            data={_}
            className="flex-[1_1_40%] sm:flex-[1_1_240px]"
            key={_?.id || `t-{${i}}`}
          />
        ))}
        {Array.from({ length: 2 }).map((_, i) => (
          <div className="flex-[1_1_40%] sm:flex-[1_1_240px]" key={i} />
        ))}
      </div>
      <div className="-translate-y-[50vh]" ref={ref} />
    </div>
  );
};
