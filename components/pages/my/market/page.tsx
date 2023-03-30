import { useMemo } from "react";
import { useRouter } from "next/router";

import { createLayout } from "@components/layout/layout";
import { BackIcon } from "@lib/icons";

import { Filter } from "./components/Filter";
import { FilterProvider, useFilter } from "./states/filter";
import { MyProductElement } from "../components/MyProductElement";
import Layout from "../Layout";
import { useMyProfileQuery } from "../queries/useMyProfileQuery";

const placeholderItems = Array.from({ length: 10 }, (_) => undefined);

const PageContent = () => {
  const { data } = useMyProfileQuery();
  const { products: items } = data || {};

  const filter = useFilter();
  const filteredItems = useMemo(
    () =>
      (filter.sale ? items?.filter((item) => !item.complete) : items) ||
      placeholderItems,
    [filter, items]
  );

  return (
    <>
      <Filter />
      <div className="mt-7 grid grid-cols-1 gap-x-3 gap-y-7 sm:grid-cols-2 md:grid-cols-3 md:gap-x-7">
        {filteredItems.map((item, i) => (
          <MyProductElement
            data={item}
            type={"market"}
            showPrice={false}
            key={item?.id || `key-${i}`}
          />
        ))}
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
