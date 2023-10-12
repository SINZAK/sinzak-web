import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";

import { createLayout } from "@components/layout/layout";
import { useAuth } from "@lib/services/auth";

import "@egjs/react-flicking/dist/flicking.css";
import { useDeleteWorkItemMutation } from "./queries/useDeleteWorkItemMutation";
import { useLikeWorkItemMutation } from "./queries/useLikeWorkItemMutation";
import { useSuggestPriceWorkItemMutation } from "./queries/useSuggestPriceWorkItemMutation";
import { useWishWorkItemMutation } from "./queries/useWishWorkItemMutation";
import { useWorkItemQuery } from "./queries/useWorkItemQuery";
import {
  Actions,
  Chat,
  Content,
  Info,
  Price,
  Profile,
  Title,
} from "../components/Form";
import { ImageViewer } from "../components/Image/ImageViewer";
import { MobileHeader } from "../components/MobileHeader";
import { MobileNav } from "../components/MobileNav";
import {
  QueryProvider,
  WorkQueryContextValue,
  useQueryContext,
} from "../states/QueryProvider";

export default function Page() {
  const router = useRouter();
  const id = Number(router.query.slug) || undefined;

  return (
    <QueryProvider
      value={{
        id,
        type: "work",
        useItemQuery: () =>
          useWorkItemQuery({
            variables: { id },
          }),
        useDeleteItemMutation: () => useDeleteWorkItemMutation(id),
        useWishMutation: useWishWorkItemMutation,
        useLikeMutation: useLikeWorkItemMutation,
        useSuggestPriceMutation: useSuggestPriceWorkItemMutation,
      }}
    >
      <Main />
    </QueryProvider>
  );
}

function Main() {
  const { user } = useAuth();

  const { useItemQuery } = useQueryContext<WorkQueryContextValue>();
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
          <Content data={data} />
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
