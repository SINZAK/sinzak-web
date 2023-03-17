import { useCallback } from "react";
import NiceModal from "@ebay/nice-modal-react";
import { useRouter } from "next/router";

import { createLayout } from "@components/layout/layout";
import { BackIcon } from "@lib/icons";
import { logout } from "@lib/services/auth";

import { ResignPopup } from "./components/ResignPopup";
import Layout from "../Layout";

const PageContent = () => {
  const showResignPopup = useCallback(() => {
    NiceModal.show(ResignPopup);
  }, []);

  return (
    <div className="space-y-7 text-lg max-md:mt-3">
      <div className="space-y-1 rounded-xl border p-4">
        <p className="mb-3 font-bold md:text-xl">이용 안내</p>
        <div className="space-y-1">
          <p>
            <a href="mailto:sinzakofficial@gmail.com">문의하기</a>
          </p>
          <p>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://sinzak.notion.site/64bb148cab2b49219a8d3d9309c80c87"
            >
              공지사항
            </a>
          </p>
          <p>
            <a target="_blank" href="/docs/terms.html">
              서비스 이용약관
            </a>
          </p>
          <p>
            <a target="_blank" href="/docs/privacy.html">
              개인정보 처리방침
            </a>
          </p>
        </div>
      </div>
      <div className="space-y-1 rounded-xl border p-4">
        <p className="mb-3 font-bold md:text-xl">기타</p>
        <div className="space-y-1">
          <p>
            <button onClick={showResignPopup}>회원 탈퇴</button>
          </p>
          <p className="md:hidden">
            <button onClick={logout}>로그아웃</button>
          </p>
        </div>
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
