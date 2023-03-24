import React, { useState } from "react";
import NiceModal from "@ebay/nice-modal-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SkeletonTheme } from "react-loading-skeleton";
import { Toaster } from "sonner";

import { AuthProvider } from "@lib/services/auth";
import { globalFont } from "@lib/services/font";
import { createQueryClient } from "@lib/services/queryClient";
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
