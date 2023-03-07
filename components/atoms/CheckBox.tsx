import React, { useId } from "react";
import { Switch } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

import { CheckIcon } from "@lib/icons";

export const CheckBox = React.forwardRef<
  HTMLButtonElement,
  Parameters<typeof Switch<typeof React.Fragment>>[0] & {
    intent?: "default" | "primary";
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLElement>;
  }
>(({ children, defaultChecked, intent, onClick, ...props }, ref) => {
  const id = useId();
  return (
    <span onClick={onClick} className="flex items-center">
      <Switch.Group>
        <Switch
          defaultChecked={defaultChecked ?? false}
          as={React.Fragment}
          {...props}
        >
          {({ checked }) => (
            <button
              ref={ref}
              id={id}
              className={twMerge(
                "flex h-[1.125rem] w-[1.125rem] items-center justify-center overflow-hidden rounded-full text-sm ring-[1.5px] ring-inset ring-gray-800",
                intent === "primary" && "bg-gray-200 ring-0"
              )}
            >
              <span
                className={twMerge(
                  "h-full w-full",
                  intent === "primary"
                    ? checked
                      ? "bg-red"
                      : "bg-gray-200"
                    : checked
                    ? "bg-gray-800"
                    : ""
                )}
              >
                <CheckIcon className="fill-white" height="100%" width="1.3em" />
              </span>
            </button>
          )}
        </Switch>
        <Switch.Label htmlFor={id} className="cursor-pointer select-none pl-4">
          {children}
        </Switch.Label>
      </Switch.Group>
    </span>
  );
});
CheckBox.displayName = "CheckBox";
