import { Context, createContext, useContext } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { inferData, inferVariables } from "react-query-kit";

import { useDeleteMarketItemMutation } from "../market/queries/useDeleteMarketItemMutation";
import { useLikeMarketItemMutation } from "../market/queries/useLikeMarketItemMutation";
import { useMarketItemQuery } from "../market/queries/useMarketItemQuery";
import { useSuggestPriceMarketItemMutation } from "../market/queries/useSuggestPriceMarketItemMutation";
import { useWishMarketItemMutation } from "../market/queries/useWishMarketItemMutation";
import { useDeleteWorkItemMutation } from "../work/queries/useDeleteWorkItemMutation";
import { useLikeWorkItemMutation } from "../work/queries/useLikeWorkItemMutation";
import { useSuggestPriceWorkItemMutation } from "../work/queries/useSuggestPriceWorkItemMutation";
import { useWishWorkItemMutation } from "../work/queries/useWishWorkItemMutation";
import { useWorkItemQuery } from "../work/queries/useWorkItemQuery";

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
