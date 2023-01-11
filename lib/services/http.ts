const BASE_URL =
  "http://ec2-13-209-121-29.ap-northeast-2.compute.amazonaws.com:8080";

const commonRequestOptions = {
  // security threat: change later
  credentials: "include",
} satisfies RequestInit;

export const http = {
  get,
  post: {
    default: postDefault,
    json: postJson,
  },
};

function getUrl(url: RequestInfo | URL) {
  if (typeof url === "string") return new URL(url, BASE_URL);
  return url;
}

async function common<T = any>(
  url: RequestInfo | URL,
  requestOptions?: RequestInit | undefined
) {
  try {
    const response = await fetch(getUrl(url), {
      ...commonRequestOptions,
      ...requestOptions,
    });
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json"))
      return response.json() as unknown as Promise<T>;
    return response.text() as unknown as Promise<T>;
  } catch (e) {
    throw e;
  }
}

async function get<T = any>(url: RequestInfo | URL) {
  const requestOptions = {
    method: "GET",
  };
  return await common<T>(url, requestOptions);
}

async function postDefault<T = any>(url: RequestInfo | URL) {
  const requestOptions = {
    ...commonRequestOptions,
    method: "POST",
  };
  return await common<T>(url, requestOptions);
}

async function postJson<T = any>(url: RequestInfo | URL, body: Object) {
  const requestOptions = {
    ...commonRequestOptions,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return await common<T>(url, requestOptions);
}
