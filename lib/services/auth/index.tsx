import React, { createContext, useContext, useState, useEffect } from "react";
import { http } from "../http";
import inMemoryJWTManager from "./inMemoryJwtManager";

type User = null | {
  email: string;
};

const AuthContext = createContext<{
  user: User;
}>({ user: null });

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
  children({ user }: { user: User }): JSX.Element;
}) => {
  const auth = useAuth();
  return children(auth);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isInitialized, setIsIntialized] = useState(false);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    if (isInitialized) return;
    setIsIntialized(true);

    const accessToken = inMemoryJWTManager.getToken();
    if (accessToken === null) return;
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return;

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
          setUser({
            email: "test@test.com",
          });
        }
      )
      .catch((e) => console.error(e));
  }, [isInitialized]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
