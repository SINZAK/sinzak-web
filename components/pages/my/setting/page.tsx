import { useCallback } from "react";
import NiceModal from "@ebay/nice-modal-react";
import { useRouter } from "next/router";

import { createLayout } from "@components/layout/layout";
import { BackIcon } from "@lib/icons";

import { ResignPopup } from "./components/ResignPopup";
import Layout from "../Layout";

const PageContent = () => {
  const showResignPopup = useCallback(() => {
    NiceModal.show(ResignPopup);
  }, []);

  return (
    <div className="space-y-7 text-lg max-md:mt-3">
      <div className="space-y-1 max-md:rounded-xl max-md:border max-md:p-4">
        <p className="mb-3 font-bold md:text-xl">이용 안내</p>
        <p>
          <a href="mailto:sinzakofficial@gmail.com">문의하기</a>
        </p>
        {/* <p>공지사항</p> */}
        <p>
          <a href="/docs/terms">서비스 이용약관</a>
        </p>
        <p>
          <a href="/docs/privacy">개인정보 처리방침</a>
        </p>
      </div>
      <div className="space-y-1 max-md:rounded-xl max-md:border max-md:p-4">
        <p className="mb-3 font-bold md:text-xl">기타</p>
        <p>
          <button onClick={showResignPopup}>회원 탈퇴</button>
        </p>
        <p className="md:hidden">로그아웃</p>
      </div>
    </div>
  );
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
