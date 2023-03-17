import { useRouter } from "next/router";

import { ProductElement } from "@components/elements/ProductElement";
import { createLayout } from "@components/layout/layout";
import { BackIcon } from "@lib/icons";

import { Filter } from "./components/Filter";
import { FilterProvider, useFilter } from "./states/filter";
import Layout from "../Layout";
import { useMyProfileQuery } from "../queries/useMyProfileQuery";

const PageContent = () => {
  const { data } = useMyProfileQuery();
  const { products: items } = data || {};

  const filter = useFilter();

  return (
    <>
      <Filter />
      <div className="mt-7 flex flex-wrap gap-x-3 gap-y-7 md:gap-x-7">
        {data ? (
          <>
            {items?.map(({ thumbnail, ...rest }, i) => (
              <ProductElement
                data={{
                  thumbnail: thumbnail || undefined,
                  ...rest,
                }}
                type={"market"}
                showPrice={false}
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
                type={"market"}
                showPrice={false}
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
  return (
    <Layout>
      <FilterProvider>
        <PageContent />
      </FilterProvider>
    </Layout>
  );
}

const MobileHeader = () => {
  const router = useRouter();
  return (
    <>
      <div className="container relative flex h-12 items-center justify-start bg-white">
        <button onClick={() => router.back()}>
          <BackIcon />
        </button>
        <span className="absolute left-1/2 flex h-full -translate-x-1/2 items-center font-bold">
          내 판매 작품
        </span>
      </div>
    </>
  );
};

Page.getLayout = createLayout({
  authenticated: true,
  rawHeader: <MobileHeader />,
});
