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
      if (typeof provider !== "string") return;
      if (!oauthProvider.includes(provider)) return;
      if (typeof code !== "string") return;

      const oauth = await http.get<{
        access_token: string;
        id_token?: string;
      }>(
        `/web/${provider}?${new URLSearchParams({
          code,
          redirect_uri: `${API.BASE_URI}/oauth/${provider}`,
        })}`
      );
      const auth = await http.post.json<{
        accessToken: string;
        accessTokenExpireDate: number;
        joined: boolean;
        refreshToken: string;
      }>("/oauth/get", {
        accessToken: oauth.data.access_token,
        idToken: oauth.data.id_token,
        origin: provider,
      });
      console.log(auth);
      const { accessToken, accessTokenExpireDate, refreshToken } = auth.data;
      if (auth.data.joined) {
        login({ accessToken, accessTokenExpireDate, refreshToken });
        router.replace("/");
      } else {
        jwtManager.setToken({ accessToken, accessTokenExpireDate });
        router.replace("/auth/signup");
      }
    })();
  });

  return (
    <>
      {provider} {code}
    </>
  );
};

export default Page;
