import React, { useId } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@lib/icons";

export const CheckBox = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Checkbox.Root>
>(({ children, defaultChecked, ...props }, ref) => {
  const id = useId();
  return (
    <>
      <Checkbox.Root
        defaultChecked={defaultChecked ?? false}
        id={id}
        ref={ref}
        className="flex h-[1.3em] w-[1.3em] items-center justify-center overflow-hidden rounded-full text-sm ring-[1.5px] ring-inset ring-gray-800"
        {...props}
      >
        <Checkbox.Indicator className="h-full w-full bg-gray-800">
          <CheckIcon className="fill-white" height="100%" width="1.3em" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label htmlFor={id} className="ml-1.5 cursor-pointer select-none">
        {children}
      </label>
    </>
  );
});
CheckBox.displayName = "CheckBox";
