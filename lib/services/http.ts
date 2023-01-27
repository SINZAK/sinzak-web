
import { API } from "@lib/utils/consts";
import { isDevEnv } from "@lib/utils/env";

import inMemoryJwtManager from "./auth/inMemoryJwtManager";

const BASE_ENDPOINT = isDevEnv ? API.DEV_ENDPOINT : API.PROD_ENDPOINT;
const BASE_PATH_PREFIX = API.BASE_PATH_PREFIX;

const commonRequestOptions = {
  // security threat: change later
  // credentials: "include",
}; // satisfies Readonly<RequestInit>;

export const http = {
  get,
  post: {
    default: postDefault,
    json: postJson,
    multipart: postMultipart,
  },
};

function getUrl(url: RequestInfo | URL) {
  if (
    typeof url === "string" &&
    (url.startsWith("http://") || url.startsWith("https://"))
  )
    return url;
  const _url = (BASE_PATH_PREFIX || "") + url;
  if (!BASE_ENDPOINT) return _url;
  if (typeof url === "string") return new URL(_url, BASE_ENDPOINT);
  return url;
}

async function common<T = any>(
  url: RequestInfo | URL,
  requestOptions?: RequestInit | undefined
) {
  try {
    const options = merge(
      { ...commonRequestOptions },
      merge(
        {
          headers: {
            ...(inMemoryJwtManager.getToken() && {
              Authorization: inMemoryJwtManager.getToken()!,
            }),
          },
        },
        requestOptions
      )
    );
    const response = await fetch(getUrl(url), options);
    const contentType = response.headers.get("content-type");
    let data: any;
    if (!response.ok) throw response;
    else if (contentType && contentType.includes("application/json")) {
      data = await response.json();
      if (data.hasOwnProperty("success") && data.success === false)
        throw Error();
      if (data.hasOwnProperty("success") && data.hasOwnProperty("data"))
        data = data.data;
    } else data = await response.text();
    return {
      ...response,
      data: data as T,
    };
  } catch (e) {
    throw e;
  }
}

async function get<T = any>(url: RequestInfo | URL, options?: RequestInit) {
  const requestOptions = merge(
    {
      method: "GET",
    },
    options
  );
  return await common<T>(url, requestOptions);
}

async function postDefault<T = any>(
  url: RequestInfo | URL,
  params?: Record<string, any>, // ConstructorParameters<typeof URLSearchParams>[0],
  options?: RequestInit
) {
  const requestOptions = merge(
    {
      method: "POST",
    },
    options
  );
  if (params)
    return await common<T>(
      url + "?" + new URLSearchParams(params).toString(),
      requestOptions
    );
  return await common<T>(url, requestOptions);
}

async function postJson<T = any>(
  url: RequestInfo | URL,
  body: Object,
  options?: RequestInit
) {
  const requestOptions = merge(
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
    options
  );
  return await common<T>(url, requestOptions);
}

async function postMultipart<T = any>(
  url: RequestInfo | URL,
  body: FormData,
  options?: RequestInit
) {
  const requestOptions = merge(
    {
      method: "POST",
      body,
    },
    options
  );
  return await common<T>(url, requestOptions);
}

const merge = (target?: Record<string, any>, source?: Record<string, any>) => {
  if (!target) return source;
  if (!source) return target;
  for (let key of Object.keys(source)) {
    if (source[key] instanceof Object)
      Object.assign(source[key], merge(target[key], source[key]));
  }
  Object.assign(target || {}, source);
  return target;
};
