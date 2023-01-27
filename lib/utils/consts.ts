import { isDevEnv } from "./env";

export namespace API {
  export const PROD_ENDPOINT = "https://sinzak.net";
  export const DEV_ENDPOINT = "https://sinzak.net";
  export const ENDPOINT = isDevEnv ? API.DEV_ENDPOINT : API.PROD_ENDPOINT;

  export const WS_PROD_ENDPOINT = "https://sinzak.net";
  export const WS_DEV_ENDPOINT = "https://sinzak.net";
  export const WS_ENDPOINT = isDevEnv
    ? API.WS_DEV_ENDPOINT
    : API.WS_PROD_ENDPOINT;

  export const BASE_PATH_PREFIX = "/api";
  export const BASE_STOMP_CHAT_PATH_PREFIX = BASE_PATH_PREFIX + "/stomp/chat";
}
