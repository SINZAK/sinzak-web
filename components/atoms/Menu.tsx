import React from "react";
import { Menu as HMenu } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

const MenuMain = ({
  button,
  children,
}: {
  button: Parameters<typeof HMenu.Button>[0]["children"];
  children?: React.ReactNode;
}) => {
  return (
    <HMenu>
      {({ open, close }) => (
        <>
          {open && (
            <div className="fixed inset-0 z-30 bg-black bg-opacity-25 backdrop-blur-sm md:hidden" />
          )}
          <div className="relative font-medium ">
            <HMenu.Button className="relative block">{button}</HMenu.Button>
            <HMenu.Items className="z-30 text-gray-800" onClick={close}>
              <div
                className="z-30
                max-md:fixed max-md:bottom-4 max-md:right-1/2 max-md:mx-auto max-md:w-[calc(100%-2rem)] max-md:max-w-lg max-md:translate-x-1/2 max-md:text-lg
                md:absolute md:right-0 md:mt-2 md:min-w-[8rem] md:text-base"
              >
                <div
                  className="bg-white px-4 shadow-md ring-1 ring-gray-100
                 max-md:divide-y max-md:rounded-3xl max-md:py-1
                 md:space-y-2 md:rounded-xl md:py-2"
                >
                  {children}
                </div>
                <div
                  className="bg-white px-4 shadow-md ring-1 ring-gray-100
                 max-md:mt-4 max-md:divide-y max-md:rounded-3xl max-md:py-1
                 md:hidden"
                >
                  <MenuItem>취소</MenuItem>
                </div>
              </div>
            </HMenu.Items>
          </div>
        </>
      )}
    </HMenu>
  );
};

const MenuItem = ({
  className,
  as,
  ...props
}: Parameters<typeof HMenu.Item>[0]) => {
  return (
    <HMenu.Item
      as={as || "button"}
      className={twMerge(
        "block w-full cursor-pointer whitespace-nowrap max-md:py-4 max-md:text-center md:text-left",
        className
      )}
      {...props}
    />
  );
};

export const Menu = Object.assign(MenuMain, {
  Item: MenuItem,
});
