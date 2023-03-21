import { Context, createContext, useContext } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { inferData, inferVariables } from "react-query-kit";

import { useDeleteMarketItemMutation } from "../market/queries/delete";
import { useMarketItemQuery } from "../market/queries/item";
import { useLikeMarketItemMutation } from "../market/queries/like";
import { useSuggestPriceMarketItemMutation } from "../market/queries/suggest";
import { useWishMarketItemMutation } from "../market/queries/wish";
import { useDeleteWorkItemMutation } from "../work/queries/delete";
import { useWorkItemQuery } from "../work/queries/item";
import { useLikeWorkItemMutation } from "../work/queries/like";
import { useSuggestPriceWorkItemMutation } from "../work/queries/suggest";
import { useWishWorkItemMutation } from "../work/queries/wish";

export type MarketQueryContextValue = {
  id: number | undefined;
  type: "market";
  useLikeMutation: typeof useLikeMarketItemMutation;
  useDeleteItemMutation: () => ReturnType<typeof useDeleteMarketItemMutation>;
  useWishMutation: typeof useWishMarketItemMutation;
  useItemQuery: () => UseQueryResult<
    inferData<typeof useMarketItemQuery> | undefined
  >;
  useSuggestPriceMutation: typeof useSuggestPriceMarketItemMutation;
};

export type WorkQueryContextValue = {
  id: number | undefined;
  type: "work";
  useLikeMutation: typeof useLikeWorkItemMutation;
  useDeleteItemMutation: () => ReturnType<typeof useDeleteWorkItemMutation>;
  useWishMutation: typeof useWishWorkItemMutation;
  useItemQuery: () => UseQueryResult<
    inferData<typeof useWorkItemQuery> | undefined
  >;
  useSuggestPriceMutation: typeof useSuggestPriceWorkItemMutation;
};

export type QueryContextValue = MarketQueryContextValue | WorkQueryContextValue;

const QueryContext = createContext<QueryContextValue>(
  null as unknown as QueryContextValue
);
export const useQueryContext = <T extends QueryContextValue>() =>
  useContext(QueryContext as unknown as Context<T>);

export const QueryProvider = QueryContext.Provider;
