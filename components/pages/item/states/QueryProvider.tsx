import { Context, createContext, useContext } from "react";

import { useDeleteMarketItemMutation } from "../market/queries/delete";
import { useMarketItemQuery } from "../market/queries/item";
import { useLikeMarketItemMutation } from "../market/queries/like";
import { useWishMarketItemMutation } from "../market/queries/wish";
import { useDeleteWorkItemMutation } from "../work/queries/delete";
import { useWorkItemQuery } from "../work/queries/item";
import { useLikeWorkItemMutation } from "../work/queries/like";
import { useWishWorkItemMutation } from "../work/queries/wish";

export type MarketQueryContextValue = {
  type: "market";
  useLikeMutation: typeof useLikeMarketItemMutation;
  useDeleteItemMutation: typeof useDeleteMarketItemMutation;
  useWishMutation: typeof useWishMarketItemMutation;
  useItemQuery: typeof useMarketItemQuery;
};

export type WorkQueryContextValue = {
  type: "work";
  useLikeMutation: typeof useLikeWorkItemMutation;
  useDeleteItemMutation: typeof useDeleteWorkItemMutation;
  useWishMutation: typeof useWishWorkItemMutation;
  useItemQuery: typeof useWorkItemQuery;
};

export type QueryContextValue = MarketQueryContextValue | WorkQueryContextValue;

const QueryContext = createContext<QueryContextValue>(
  null as unknown as QueryContextValue
);
export const useQueryContext = <T extends QueryContextValue>() =>
  useContext(QueryContext as unknown as Context<T>);

export const QueryProvider = QueryContext.Provider;
