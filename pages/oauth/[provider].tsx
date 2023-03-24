import { NextRouter, useRouter } from "next/router";

import NoSsr from "@components/atoms/NoSsr";
import { useEffectOnce } from "@lib/hooks/useEffectOnce";
import { useAuth } from "@lib/services/auth";
import jwtManager from "@lib/services/auth/inMemoryJwtManager";
import { http } from "@lib/services/http";
import { API } from "@lib/utils/consts";

const oauthFn = {
  naver: async () => {},
  kakao: async () => {},
  google: async () => {},
  apple: async () => {},
};
const oauthProvider = Object.keys(oauthFn);

const Page = () => {
  const router = useRouter();

  return <NoSsr>{router.isReady && <Main router={router} />}</NoSsr>;
};

const Main = ({ router }: { router: NextRouter }) => {
  const { provider, code } = router.query;
  const { login } = useAuth();

  useEffectOnce(() => {
    (async () => {
      if (
        typeof provider !== "string" ||
        !oauthProvider.includes(provider) ||
        typeof code !== "string"
      )
        throw Error();

      const oauth = await http
        .get<{
          access_token: string;
          id_token?: string;
        }>(
          `/web/${provider}?${new URLSearchParams({
            code,
            redirect_uri: `${API.BASE_URI}/oauth/${provider}`,
          })}`
        )
        .catch((e) => {
          alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
          throw Error(e);
        });
      const auth = await http.post
        .json<{
          accessToken: string;
          accessTokenExpireDate: number;
          joined: boolean;
          refreshToken: string;
        }>("/oauth/get", {
          accessToken: oauth.data.access_token,
          idToken: oauth.data.id_token,
          origin: provider,
        })
        .catch((e) => {
          alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
          throw Error(e);
        });
      const { accessToken, accessTokenExpireDate, refreshToken } = auth.data;
      if (auth.data.joined) {
        login({ accessToken, accessTokenExpireDate, refreshToken });
        router.replace("/");
      } else {
        jwtManager.setToken({ accessToken, accessTokenExpireDate });
        router.replace("/auth/signup");
      }
    })().catch(() => router.replace("/"));
  });

  return (
    <div className="grid h-screen w-full place-items-center">
      <div className="flex-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple">
        <svg
          className="h-8 w-8 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Page;
