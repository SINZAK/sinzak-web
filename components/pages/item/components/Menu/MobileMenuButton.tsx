import { MenuIcon } from "@lib/icons";

import { MenuButton } from "./MenuButton";

const Button = () => (
  <button>
    <MenuIcon />
  </button>
);

export const MobileMenuButton = () => {
  return <MenuButton button={Button} />;
};
