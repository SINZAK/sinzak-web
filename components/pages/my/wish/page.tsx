import { useAtomValue } from "jotai/react";

import { ProductElement } from "@components/elements/ProductElement";
import { createLayout } from "@components/layout/layout";
import useBreakpoint from "@lib/hooks/useBreakpoint";

import { Filter } from "./components/Filter";
import {
  filterAtom,
  FilterProvider,
  filterSaleAtom,
  filterTypeAtom,
  useFilter,
} from "./states/filter";
import Layout from "../layout";
import { useMyWishQuery } from "../queries/useMyWishQuery";

const PageContent = () => {
  const { data } = useMyWishQuery();
  const filter = useFilter();
  console.log(filter.type);

  const filteredItems = data
    ? filter.type === "market"
      ? data.productWishes
      : data.workWishes
    : null;

  return (
    <>
      <Filter />
      <div className="mt-7 flex flex-wrap gap-x-3 gap-y-7 md:gap-x-7">
        {data ? (
          <>
            {filteredItems?.map(({ thumbnail, ...rest }, i) => (
              <ProductElement
                data={{
                  thumbnail: thumbnail || undefined,
                  ...rest,
                }}
                showPrice={filter.type === "market"}
                type="market"
                className="flex-[1_1_40%] sm:flex-[1_1_240px]"
                key={i}
              />
            ))}
            {Array.from({ length: 2 }).map((_, i) => (
              <div className="flex-[1_1_40%] sm:flex-[1_1_240px]" key={i} />
            ))}
          </>
        ) : (
          <>
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductElement
                showPrice={false}
                type="market"
                className="flex-[1_1_40%] sm:flex-[1_1_240px]"
                key={i}
              />
            ))}
            {Array.from({ length: 2 }).map((_, i) => (
              <div className="flex-[1_1_40%] sm:flex-[1_1_240px]" key={i} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default function Page() {
  const { breakpoint } = useBreakpoint();

  if (breakpoint === "narrow")
    return (
      <FilterProvider>
        <PageContent />
      </FilterProvider>
    );
  return (
    <FilterProvider>
      <Layout>
        <PageContent />
      </Layout>
    </FilterProvider>
  );
}

Page.getLayout = createLayout({
  authenticated: true,
  rawHeader: (
    <>
      <div className="container relative flex h-12 items-center justify-between bg-white">
        <span className="absolute top-0 left-0 flex h-full w-full items-center justify-center font-bold">
          스크랩 목록
        </span>
        <span>
          <img src="/assets/icons/back.svg" className="h-6" />
        </span>
        <span></span>
      </div>
    </>
  ),
});
