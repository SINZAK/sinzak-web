import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { ProductElement } from "@components/elements/ProductElement";

import { useWorkQuery } from "../queries/product";
import { useFilter } from "../states/filter";

export const ListView = () => {
  const filter = useFilter();
  const { data, isLoading, fetchNextPage } = useWorkQuery(filter);
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
          <ProductElement type="work" data={_} key={_?.id || `t-{${i}}`} />
        ))}
      </div>
      <div className="-translate-y-[50vh]" ref={ref} />
    </div>
  );
};
