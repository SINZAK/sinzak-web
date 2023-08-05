import React, { useState } from "react";
import NiceModal from "@ebay/nice-modal-react";
import { QueryClientProvider } from "@tanstack/react-query";
import Script from "next/script";
import { DefaultSeo } from "next-seo";
import { SkeletonTheme } from "react-loading-skeleton";
import { Toaster } from "sonner";

import { AuthProvider } from "@lib/services/auth";
import { globalFont } from "@lib/services/font";
import { createQueryClient } from "@lib/services/queryClient";
import { API } from "@lib/utils/consts";
import { isDevEnv } from "@lib/utils/env";
import { CustomAppProps } from "@types";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/globals.css";

if (typeof document === "undefined") {
  React.useLayoutEffect = React.useEffect;
}

if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (str, newStr) {
    if (
      Object.prototype.toString.call(str).toLowerCase() === "[object regexp]"
    ) {
      // @ts-ignore
      return this.replace(str, newStr);
    }
    // @ts-ignore
    return this.replace(new RegExp(str, "g"), newStr);
  };
}

export default function App({ Component, pageProps }: CustomAppProps) {
  const [queryClient] = useState(() => createQueryClient());
  const getLayout =
    Component.getLayout || ((page: React.ReactElement) => <>{page}</>);
  return (
    <>
      <DefaultSeo
        title="신작 - 신세대의 작품을 만나다"
        description="작품으로 이름을 알릴 기회, 미술품 거래 및 작업 의뢰 플랫폼. 자신의 능력으로 작가로서의 이름을 널리 알려보세요. 명함부터 일러스트까지 내 능력이 온전히 경제적 가치가 됩니다. 신작의 최종 목적지는 예술가들에게 자립할 수 있는 힘을 주는 것. 쉽게 작품을 전시하고 작업을 의뢰해보세요."
        canonical={`${API.BASE_URI}`}
        openGraph={{
          title: "신작 - 신세대의 작품을 만나다",
          description:
            "작품과 능력만으로 이름을 알릴 기회, 예술품 거래 및 작업 의뢰 플랫폼. 신세대의 작품을 만나다 신작.",
          type: "website",
          locale: "ko_KR",
          url: `${API.BASE_URI}`,
          siteName: "신작",
          images: [
            {
              url: `${API.BASE_URI}/opengraph-image.png`,
            },
          ],
        }}
        additionalMetaTags={[
          {
            property: "keywords",
            content:
              "신작, 작품, 외주, 예술, 작가, 미술, 대학생, 미대생, 미술대, 미대, 중고, 디자인, 졸전, 일러스트, 디자이너, 아웃소싱, 전시회, 당근마켓, 오늘의집, 중고나라, 인플루언서, 회화, 동양화, 조소, 판화, 공예, 초상화, 일러스트, 로고, 앱, 라벨, 포스터, 배너",
          },
        ]}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/manifest/favicon-32x32.png",
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "/manifest/favicon-16x16.png",
          },
          {
            rel: "apple-touch-icon",
            href: "/mainfest/apple-touch-icon.png",
            sizes: "180x180",
          },
          {
            rel: "manifest",
            href: "/site.webmanifest",
          },
        ]}
      />
      <style jsx global>{`
        html {
          font-family: ${globalFont.style.fontFamily};
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <NiceModal.Provider>
          <AuthProvider>
            <SkeletonTheme inline baseColor="#eee" highlightColor="#ddd">
              <Toaster richColors position="top-center" />
              <div id="main" className="h-full">
                {getLayout(<Component {...pageProps} />)}
              </div>
            </SkeletonTheme>
          </AuthProvider>
        </NiceModal.Provider>
      </QueryClientProvider>
      {!isDevEnv && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');`,
            }}
          />
        </>
      )}
    </>
  );
}
