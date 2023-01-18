import { AlignIcon } from "@lib/icons";

import { ListBox } from "@components/atoms/ListBox";

export const AlignSelectFilter = <T extends string>({
  value,
  setValue,
  options,
}: {
  value: T;
  setValue: (value: T) => void;
  options: { id: T; name: string }[];
}) => {
  return (
    <ListBox {...{ value, setValue, options }}>
      {({ value }) => (
        <span className="flex items-center">
          <AlignIcon />
          <span className="ml-1">{value.name}</span>
        </span>
      )}
    </ListBox>
  );
};
