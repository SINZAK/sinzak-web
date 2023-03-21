import { QueryHook, InfiniteQueryHook, MutationHook } from "react-query-kit";

export type inferRawData<T> = T extends QueryHook<infer TData, any, any>
  ? TData
  : T extends InfiniteQueryHook<infer TData, any, any>
  ? TData
  : T extends MutationHook<infer TData, any, any>
  ? TData
  : never;
