import { createLayout } from "@components/layout/layout";

import Layout from "./layout";

export default function Page() {
  return <Layout></Layout>;
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
