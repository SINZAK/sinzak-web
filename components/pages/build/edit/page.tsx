import { useEffect } from "react";
import { useRouter } from "next/router";

import { createLayout } from "@components/layout/layout";
import { useMarketItemQuery } from "@components/pages/item/market/queries/useMarketItemQuery";
import { useWorkItemQuery } from "@components/pages/item/work/queries/useWorkItemQuery";
import { BackIcon } from "@lib/icons";

import "@egjs/react-flicking/dist/flicking.css";
import { EditForm } from "../components/EditForm";

function pick<T extends object, K extends keyof T>(
  base: T,
  ...keys: K[]
): Pick<T, K> {
  const entries = keys.map((key) => [key, base[key]]);
  return Object.fromEntries(entries);
}

export default function Page() {
  const router = useRouter();
  const { type, slug } = router.query;
  const id = Number(slug) || undefined;
  const { data: marketData, isError: isMarketError } = useMarketItemQuery({
    variables: { id: type === "market" ? id : undefined },
  });
  const { data: workData, isError: isWorkError } = useWorkItemQuery({
    variables: { id: type === "work" ? id : undefined },
  });

  if (isMarketError || isWorkError) router.replace("/");

  useEffect(() => {
    if (type !== "market" && type !== "work") router.replace("/");
  }, [router, type]);

  const values = marketData
    ? {
        ...pick(
          marketData,
          "title",
          "content",
          "suggest",
          "price",
          "width",
          "vertical",
          "height",
          "images"
        ),
        type: "sell" as const,
      }
    : workData
    ? {
        ...pick(workData, "title", "content", "suggest", "price", "images"),
        type: workData.employment
          ? ("workBuy" as const)
          : ("workSell" as const),
      }
    : undefined;

  const defaultValues = values
    ? {
        ...values,
        images: values?.images.map((src) => ({
          type: "remote" as const,
          src,
        })),
      }
    : undefined;

  return (
    <div>
      <div className="container max-w-2xl max-md:pt-3">
        <div className="mb-10 max-md:hidden">
          <p className="text-3xl font-bold">
            {type === "sell" ? "작품" : "의뢰"} 수정하기
          </p>
        </div>
        {defaultValues && id && (
          <EditForm id={id} defaultValues={defaultValues} />
        )}
      </div>
    </div>
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
          수정하기
        </span>
      </div>
    </>
  );
};

Page.getLayout = createLayout({
  authenticated: true,
  rawHeader: <MobileHeader />,
});
