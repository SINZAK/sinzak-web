import useBreakpoint from "@lib/hooks/useBreakpoint";

import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { breakpoint } = useBreakpoint();

  if (breakpoint === "narrow") return <MobileLayout>{children}</MobileLayout>;
  return <DesktopLayout>{children}</DesktopLayout>;
};

export default Layout;
