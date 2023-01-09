import React from "react";

import "../styles/globals.css";
import { globalFont } from "@lib/services/font";
import { CustomAppProps } from "@types";

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
  const getLayout =
    Component.getLayout || ((page: React.ReactElement) => <>{page}</>);
  return (
    <main id="main" className={`${globalFont.variable} font-sans`}>
      {getLayout(<Component {...pageProps} />)}
    </main>
  );
}
