import { createLayout } from "@components/layout/layout";
import useBreakpoint from "@lib/hooks/useBreakpoint";

import { DesktopMy } from "./components/DesktopMy";
import { MobileMy } from "./components/MobileMy";

export default function Page() {
  const { breakpoint } = useBreakpoint();

  if (breakpoint === "narrow") return <MobileMy />;
  return <DesktopMy />;
}

Page.getLayout = createLayout({
  authenticated: true,
  mobileNav: true,
  rawHeader: (
    <>
      <div className="container relative flex h-12 items-center justify-between bg-white">
        <span></span>
        <span>
          <img src="/assets/icons/setting.svg" className="h-7" />
        </span>
      </div>
    </>
  ),
});
