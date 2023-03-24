import { Head, Html, Main, NextScript } from "next/document";

import { API } from "@lib/utils/consts";

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
