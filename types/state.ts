import { RESET } from "jotai/vanilla/utils";

export type AtomValueWithReset<T> = T | typeof RESET;

export type SetStateActionWithReset<Value> =
  | AtomValueWithReset<Value>
  | ((prev: Value) => AtomValueWithReset<Value>);

type SetAtom<Args extends unknown[], Result> = (...args: Args) => Result;
export type UseAtomWithResetResult<T> = [
  T,
  SetAtom<[SetStateActionWithReset<T>], void>
];
