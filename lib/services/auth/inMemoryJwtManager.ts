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

const inMemoryJwtManager = () => {
  const getToken = () => {
    const expire = Number(localStorage.getItem("accessTokenExpire"));
    if (expire < Date.now()) return null;
    return localStorage.getItem("accessToken");
  };

  const setToken = (token: string, expire: number) => {
    localStorage.setItem("accessTokenExpire", String(Date.now() + expire));
    localStorage.setItem("accessToken", token);
    return true;
  };

  const eraseToken = () => {
    localStorage.removeItem("accessTokenExpire");
    localStorage.removeItem("accessToken");
    return true;
  };

  return {
    eraseToken,
    getToken,
    setToken,
  };
};

export default inMemoryJwtManager();
