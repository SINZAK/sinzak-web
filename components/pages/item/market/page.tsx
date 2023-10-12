import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";

import { createLayout } from "@components/layout/layout";
import { useAuth } from "@lib/services/auth";

import { useDeleteMarketItemMutation } from "./queries/useDeleteMarketItemMutation";
import { useLikeMarketItemMutation } from "./queries/useLikeMarketItemMutation";
import { useMarketItemQuery } from "./queries/useMarketItemQuery";
import { useSuggestPriceMarketItemMutation } from "./queries/useSuggestPriceMarketItemMutation";
import { useWishMarketItemMutation } from "./queries/useWishMarketItemMutation";
import {
  Info,
  Title,
  Price,
  Actions,
  Chat,
  Profile,
  Content,
  Size,
} from "../components/Form";
import { ImageViewer } from "../components/Image/ImageViewer";
import { MobileHeader } from "../components/MobileHeader";
import { MobileNav } from "../components/MobileNav";
import {
  MarketQueryContextValue,
  QueryProvider,
  useQueryContext,
} from "../states/QueryProvider";

export default function Page() {
  const router = useRouter();
  const id = Number(router.query.slug) || undefined;

  return (
    <QueryProvider
      value={{
        id,
        type: "market",
        useItemQuery: () =>
          useMarketItemQuery({
            variables: { id },
          }),
        useDeleteItemMutation: () => useDeleteMarketItemMutation(id),
        useWishMutation: useWishMarketItemMutation,
        useLikeMutation: useLikeMarketItemMutation,
        useSuggestPriceMutation: useSuggestPriceMarketItemMutation,
      }}
    >
      <Main />
    </QueryProvider>
  );
}

function Main() {
  const { user } = useAuth();

  const { useItemQuery } = useQueryContext<MarketQueryContextValue>();
  const { data } = useItemQuery();

  return (
    <>
      <MobileNav />
      <MobileHeader />

      <ImageViewer images={data?.images} />
      <div className="container max-w-4xl">
        <div className="h-5 sm:h-7" />
        <div className="flex">
          <div className="flex-1">
            <Info data={data} />
            <Title data={data} />
            <Price data={data} />
            <Actions data={data} />
          </div>
          {data && <Chat data={data} user={user} />}
        </div>
        <hr className="my-5 md:my-7" />
        <Profile data={data} />
        <hr className="my-5 md:my-7" />
        {data ? (
          <>
            <Size data={data} />
            <hr className="my-5 md:my-7" />
            <Content data={data} />
          </>
        ) : (
          <div className="text-lg">
            <Skeleton count={4} />
            <Skeleton className="w-2/3" />
          </div>
        )}
      </div>
    </>
  );
}

Page.getLayout = createLayout();
