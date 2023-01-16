import React from "react";
import { Listbox as HListbox } from "@headlessui/react";

export const ListBox = <T extends string>({
  value,
  setValue,
  options,
  children,
}: {
  value: T;
  setValue: (value: T) => void;
  options: { id: T; name: string }[];
  children: Parameters<typeof HListbox.Button>[0]["children"];
}) => {
  return (
    <HListbox
      value={options.find((_) => _.id === value)}
      onChange={(_) => setValue(_.id)}
    >
      {({ open }) => (
        <>
          {open && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm md:hidden" />
          )}
          <div className="relative font-medium text-gray-800">
            <HListbox.Button className="relative block">
              {children}
            </HListbox.Button>
            <HListbox.Options className="z-50">
              <div
                className="z-50 bg-white px-4 shadow-md ring-1 ring-gray-100
                max-md:fixed max-md:bottom-0 max-md:right-1/2 max-md:w-full max-md:max-w-lg max-md:translate-x-1/2 max-md:divide-y max-md:rounded-t-3xl max-md:py-4 max-md:text-lg
                md:absolute md:right-0 md:mt-2 md:min-w-[8rem] md:space-y-2 md:rounded-xl md:py-2 md:text-base
                [&>*]:max-md:py-2"
              >
                {options.map((option) => (
                  <HListbox.Option
                    className="cursor-pointer hover:text-black max-md:py-2"
                    key={option.id}
                    value={option}
                  >
                    {option.name}
                  </HListbox.Option>
                ))}
              </div>
            </HListbox.Options>
          </div>
        </>
      )}
    </HListbox>
  );
};
