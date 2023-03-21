import { useCallback, useEffect, useState } from "react";

import { Button } from "@components/atoms/Button";
import { CheckIcon } from "@lib/icons";
import { Category, getCategoryText } from "@lib/resources/category";

export const SingleSelect = ({
  data,
  value,
  initialValue,
  onChange,
}: {
  data: Category[];
  value?: Category;
  initialValue?: Category;
  onChange?: (value: Category | null) => void;
}) => {
  const [selectState, setSelectState] = useState<Category | null>(
    initialValue ?? null
  );

  useEffect(() => {
    if (onChange) onChange(selectState);
  }, [onChange, selectState]);

  const onClick = useCallback((category: Category) => {
    setSelectState(category);
  }, []);

  return (
    <div className="flex flex-wrap gap-3">
      {data.map((_, i) => (
        <Button
          onClick={() => onClick(_)}
          key={i}
          intent={selectState === _ ? "primary" : "base"}
        >
          <CheckIcon className="-my-0.5 -ml-1.5 h-7 w-7" />
          {getCategoryText(_)}
        </Button>
      ))}
    </div>
  );
};
