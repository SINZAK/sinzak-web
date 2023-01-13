import React, { useId } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { default as CheckIcon } from "@public/assets/icons/check.svg";

export const CheckBox = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Checkbox.Root>
>(({ children, ...props }, ref) => {
  const id = useId();
  return (
    <>
      <Checkbox.Root
        id={id}
        ref={ref}
        className="rounded-full w-[1.3em] h-[1.3em] text-sm ring-inset ring-gray-800 ring-[1.5px] flex justify-center items-center overflow-hidden"
        onChange={(e) => console.log(e.target)}
        {...props}
      >
        <Checkbox.Indicator className="w-full h-full bg-gray-800">
          <CheckIcon className="fill-white" height="100%" width="1.3em" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label htmlFor={id} className="cursor-pointer select-none ml-1.5">
        {children}
      </label>
    </>
  );
});
CheckBox.displayName = "CheckBox";
