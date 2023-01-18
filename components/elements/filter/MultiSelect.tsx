import { useCallback, useEffect, useState } from "react";

import { CheckIcon } from "@lib/icons";
import { Category, getCategoryText } from "@lib/resources/category";

import { Button } from "@components/atoms/Button";

export const MultiSelect = <T extends Category>({
  data,
  value,
  onChange,
}: {
  data: T[];
  value: T[];
  onChange(value: T[]): void;
}) => {
  // const [selectState, setSelectState] = useState<Category[]>([]);
  const selectState = value;
  const setSelectState = onChange;

  // useEffect(() => {
  //   if (onChange) onChange(selectState);
  // }, [onChange, selectState]);

  const onClick = useCallback(
    (category: T) => {
      const select = selectState;
      onChange(
        (() => {
          if (select.includes(category)) {
            return select.filter((_) => _ !== category);
          } else {
            if (select.length >= 3) return select;
            return [...select, category];
          }
        })()
      );
      // setSelectState((select) => {
      //   if (select.includes(category)) {
      //     return select.filter((_) => _ !== category);
      //   } else {
      //     if (select.length >= 3) return select;
      //     return [...select, category];
      //   }
      // });
    },
    [onChange, selectState]
  );

  return [
    <Button
      outline
      key="reset"
      onClick={() => setSelectState([])}
      intent={selectState.length === 0 ? "primary" : "base"}
    >
      <CheckIcon className="-my-0.5 -ml-1.5 h-7 w-7" />
      전체
    </Button>,
    ...data.map((_, i) => (
      <Button
        outline
        onClick={() => onClick(_)}
        key={i}
        intent={selectState.includes(_) ? "primary" : "base"}
      >
        <CheckIcon className="-my-0.5 -ml-1.5 h-7 w-7" />
        {getCategoryText(_)}
      </Button>
    )),
  ];
};
