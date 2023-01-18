import { MenuButton } from "./MenuButton";
import { MenuIcon } from "@lib/icons";

const Button = () => (
  <span>
    <MenuIcon />
  </span>
);

export const DesktopMenuButton = () => {
  return <MenuButton button={Button} />;
};
