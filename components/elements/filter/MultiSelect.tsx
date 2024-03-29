import { ComponentProps, useCallback, useEffect, useState } from "react";

import { Button } from "@components/atoms/Button";
import { CheckIcon } from "@lib/icons";
import { Category, getCategoryText } from "@lib/resources/category";

export const MultiSelect = <T extends Category>({
  size,
  data,
  value,
  onChange,
}: {
  size?: ComponentProps<typeof Button>["size"];
  data: T[];
  value: T[];
  onChange(value: T[]): void;
}) => {
  const selectState = value;
  const setSelectState = onChange;

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
    },
    [onChange, selectState]
  );

  return [
    <Button
      size={size}
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
        size={size}
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
