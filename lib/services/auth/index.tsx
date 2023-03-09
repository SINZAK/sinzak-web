import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useEffectOnce } from "@lib/hooks/useEffectOnce";

import jwtManager from "./inMemoryJwtManager";
import { http } from "../http";

type User = null | {
  email: string;
  userId: number;
};

type Auth = {
  user: User;
  isLoading: boolean;
  renew: () => void;
};

const AuthContext = createContext<Auth>({
  user: null,
  isLoading: true,
  renew: () => {},
});

export const login = async ({
  accessToken,
  refreshToken,
  accessTokenExpireDate,
}: {
  accessToken: string;
  refreshToken: string;
  accessTokenExpireDate: number;
}) => {
  try {
    jwtManager.setToken({ accessToken, refreshToken, accessTokenExpireDate });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const tempLogin = async (email: string) => {
  try {
    const {
      data: { accessToken, refreshToken, accessTokenExpireDate },
    } = await http.post.json<{
      accessToken: string;
      refreshToken: string;
      accessTokenExpireDate: number;
    }>("/login", {
      email,
    });
    jwtManager.setToken({ accessToken, accessTokenExpireDate, refreshToken });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const logout = async () => {
  try {
    jwtManager.eraseToken();
    location.href = "/";
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const WithAuth = ({
  children,
}: {
  authorized?: boolean;
  children(_: Auth): React.ReactNode;
}) => {
  const auth = useAuth();
  return <>{children(auth)}</>;
};

const parseJwt = (jwt: string) => {
  if (!window) throw Error();
  return JSON.parse(window.atob(jwt.split(".")[1]));
};

// fix: auth dependent queries get called before auth init
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>(null);

  const renew = useCallback(() => {
    const { accessToken, refreshToken } = jwtManager.getToken();
    if (!accessToken || !refreshToken) {
      setIsLoading(false);
      return;
    }

    http.post
      .json<{
        accessToken: string;
        refreshToken: string;
        accessTokenExpireDate: number;
      }>(
        "/reissue",
        { accessToken, refreshToken },
        { headers: { Authorization: accessToken } }
      )
      .then(
        ({ data: { accessToken, refreshToken, accessTokenExpireDate } }) => {
          jwtManager.setToken({
            accessToken,
            accessTokenExpireDate,
            refreshToken,
          });
          const payload = parseJwt(accessToken);
          setUser({
            email: payload.sub,
            userId: payload.id,
          });
          setIsLoading(false);
        }
      )
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  }, []);

  useEffectOnce(renew);

  return (
    <AuthContext.Provider value={{ user, isLoading, renew }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
