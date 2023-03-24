import React, { useState } from "react";
import NiceModal from "@ebay/nice-modal-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DefaultSeo } from "next-seo";
import { SkeletonTheme } from "react-loading-skeleton";
import { Toaster } from "sonner";

import { AuthProvider } from "@lib/services/auth";
import { globalFont } from "@lib/services/font";
import { createQueryClient } from "@lib/services/queryClient";
import { CustomAppProps } from "@types";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/globals.css";
import { API } from "@lib/utils/consts";

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
        description=""
        canonical={`${API.BASE_URI}`}
        openGraph={{
          title: "신작 - 신세대의 작품을 만나다",
          description: "",
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
              <ReactQueryDevtools initialIsOpen={false} />
              <Toaster richColors position="top-center" />
              <div id="main" className="h-full">
                {getLayout(<Component {...pageProps} />)}
              </div>
            </SkeletonTheme>
          </AuthProvider>
        </NiceModal.Provider>
      </QueryClientProvider>
    </>
  );
}
