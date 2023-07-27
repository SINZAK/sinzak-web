import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { ProductElement } from "@components/elements/ProductElement";

import { useProductQuery } from "../queries/useProductQuery";
import { useFilter } from "../states/filter";

export const ListView = () => {
  const filter = useFilter();
  const { data, isLoading, fetchNextPage } = useProductQuery(filter);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!data) return;
    if (inView) fetchNextPage();
  }, [data, fetchNextPage, inView]);

  const content = data?.pages.map(({ content }) => content).flat();

  return (
    <div className="flex-1">
      <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] md:gap-x-7">
        {(isLoading
          ? Array.from({ length: 16 }, () => undefined)
          : content || []
        ).map((_, i) => (
          <ProductElement type="market" data={_} key={_?.id || `t-{${i}}`} />
        ))}
      </div>
      <div className="-translate-y-[50vh]" ref={ref} />
    </div>
  );
};
