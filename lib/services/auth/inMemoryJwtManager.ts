// inMemoryJwt.js
// const inMemoryJwtManager = () => {
//   let inMemoryJWT: null | string = null;

//   const getToken = () => {
//     return inMemoryJWT;
//   };

//   const setToken = (token: string) => {
//     inMemoryJWT = token;
//     return true;
//   };

//   const eraseToken = () => {
//     inMemoryJWT = null;
//     return true;
//   };

//   return {
//     eraseToken,
//     getToken,
//     setToken,
//   };
// };

const jwtManager = () => {
  const getRawToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken || !accessToken) {
      eraseToken();
      return {
        accessToken: null,
        refreshToken: null,
      };
    }
    return {
      accessToken,
      refreshToken,
    };
  };

  const getToken = () => {
    return {
      accessToken: getAccessToken(),
      refreshToken: getRefreshToken(),
    };
  };

  const getAccessToken = () => {
    const { accessToken } = getRawToken();
    const expire = Number(localStorage.getItem("accessTokenExpireDate"));
    if (expire < Date.now()) {
      eraseToken();
      return null;
    }
    return accessToken;
  };

  const getRefreshToken = () => {
    const { refreshToken } = getRawToken();
    return refreshToken;
  };

  const setToken = ({
    accessToken,
    refreshToken,
    accessTokenExpireDate,
  }: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpireDate: number;
  }) => {
    localStorage.setItem(
      "accessTokenExpireDate",
      String(Date.now() + accessTokenExpireDate)
    );
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    return true;
  };

  const setRefreshToken = (token: string) => {
    localStorage.setItem("refreshToken", token);
    return true;
  };

  const eraseToken = () => {
    localStorage.removeItem("accessTokenExpireDate");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return true;
  };

  return {
    getToken,
    getAccessToken,
    getRefreshToken,
    setToken,
    setRefreshToken,
    eraseToken,
  };
};

export default jwtManager();
