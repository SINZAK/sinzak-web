import { MenuIcon } from "@lib/icons";

import { MenuButton } from "./MenuButton";

const Button = () => (
  <button className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-base text-gray-800">
    <MenuIcon />
  </button>
);

export const DesktopMenuButton = () => {
  return <MenuButton button={Button} />;
};
