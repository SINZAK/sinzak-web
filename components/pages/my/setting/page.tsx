import { useRouter } from "next/router";

import { createLayout } from "@components/layout/layout";
import { BackIcon } from "@lib/icons";

import Layout from "../Layout";

const PageContent = () => {
  return <></>;
};

export default function Page() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  );
}

const MobileHeader = () => {
  const router = useRouter();
  return (
    <>
      <div className="container relative flex h-12 items-center justify-start bg-white">
        <button onClick={() => router.back()}>
          <BackIcon />
        </button>
        <span className="absolute left-1/2 flex h-full -translate-x-1/2 items-center font-bold">
          설정
        </span>
      </div>
    </>
  );
};

Page.getLayout = createLayout({
  authenticated: true,
  rawHeader: <MobileHeader />,
});
