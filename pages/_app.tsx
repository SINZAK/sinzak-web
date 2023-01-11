import React, { useState } from "react";

import { globalFont } from "@lib/services/font";
import { CustomAppProps } from "@types";
import { AuthProvider } from "@lib/services/auth";
import { createQueryClient } from "@lib/services/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { SkeletonTheme } from "react-loading-skeleton";

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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SkeletonTheme inline baseColor="#eee" highlightColor="#ddd">
          <main id="main" className={`${globalFont.variable} font-sans`}>
            {getLayout(<Component {...pageProps} />)}
          </main>
        </SkeletonTheme>
      </AuthProvider>
    </QueryClientProvider>
  );
}
