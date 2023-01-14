import { Button } from "@components/atoms/Button";
import { CheckIcon } from "@lib/icons";
import { Category, getCategoryText } from "@lib/resources/category";
import { useCallback, useEffect, useState } from "react";

export const SingleSelect = ({
  data,
  value,
  onChange,
}: {
  data: Category[];
  value?: Category;
  onChange?: (value: Category | null) => void;
}) => {
  const [selectState, setSelectState] = useState<Category | null>(null);

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
          <CheckIcon className="w-7 h-7 -my-0.5 -ml-1.5" />
          {getCategoryText(_)}
        </Button>
      ))}
    </div>
  );
};
