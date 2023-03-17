import { isDevEnv } from "./env";

export namespace API {
  export const PROD_BASE_URI = "https://sinzak.net";
  export const DEV_BASE_URI = "http://localhost:3000";
  export const BASE_URI = isDevEnv ? DEV_BASE_URI : PROD_BASE_URI;
  export const PROD_ENDPOINT = "https://sinzak.net";
  export const DEV_ENDPOINT = "https://sinzak.net";
  export const ENDPOINT = isDevEnv ? DEV_ENDPOINT : PROD_ENDPOINT;

  export const WS_PROD_ENDPOINT = "https://sinzak.net";
  export const WS_DEV_ENDPOINT = "https://sinzak.net";
  export const WS_ENDPOINT = isDevEnv
    ? API.WS_DEV_ENDPOINT
    : API.WS_PROD_ENDPOINT;

  export const BASE_PATH_PREFIX = "/api";
  export const BASE_STOMP_CHAT_PATH_PREFIX = BASE_PATH_PREFIX + "/stomp/chat";
}
