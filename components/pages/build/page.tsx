import { useRouter } from "next/router";

import { createLayout } from "@components/layout/layout";
import { BackIcon } from "@lib/icons";

import { Form } from "./components/Form";

import "@egjs/react-flicking/dist/flicking.css";

export default function Page() {
  return (
    <div>
      <div className="container max-w-2xl max-md:pt-3">
        <div className="mb-10 max-md:hidden">
          <p className="text-3xl font-bold">작품/의뢰 등록하기</p>
        </div>
        <Form />
      </div>
    </div>
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
          등록하기
        </span>
      </div>
    </>
  );
};

Page.getLayout = createLayout({
  authenticated: true,
  rawHeader: <MobileHeader />,
});
