import { MenuIcon } from "@lib/icons";

import { MenuButton } from "./MenuButton";

const Button = () => (
  <span>
    <MenuIcon />
  </span>
);

export const MobileMenuButton = () => {
  return <MenuButton button={Button} />;
};
