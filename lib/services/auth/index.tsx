import { useEffectOnce } from "@lib/hooks/useEffectOnce";
import React, { createContext, useContext, useState, useEffect } from "react";
import { http } from "../http";
import inMemoryJWTManager from "./inMemoryJwtManager";

type User = null | {
  email: string;
  userId: number;
};

type Auth = {
  user: User;
  isLoading: boolean;
};

const AuthContext = createContext<Auth>({ user: null, isLoading: true });

export const tempLogin = async () => {
  try {
    const {
      data: { accessToken, refreshToken, accessTokenExpireDate },
    } = await http.post.json<{
      accessToken: string;
      refreshToken: string;
      accessTokenExpireDate: number;
    }>("/login", {
      email: "insi2000@naver.com",
    });
    inMemoryJWTManager.setToken(accessToken, accessTokenExpireDate);
    localStorage.setItem("refreshToken", refreshToken);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
export const logout = async () => {
  try {
    localStorage.removeItem("refreshToken");
    inMemoryJWTManager.eraseToken();
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
  children(_: Auth): JSX.Element;
}) => {
  const auth = useAuth();
  return children(auth);
};

const parseJwt = (jwt: string) => {
  if (!window) throw Error();
  return JSON.parse(window.atob(jwt.split(".")[1]));
};

// fix: auth dependent queries get called before auth init
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>(null);

  useEffectOnce(() => {
    const accessToken = inMemoryJWTManager.getToken();
    if (accessToken === null) {
      setIsLoading(false);
      return;
    }
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
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
          inMemoryJWTManager.setToken(accessToken, accessTokenExpireDate);
          localStorage.setItem("refreshToken", refreshToken);
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
  });

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
