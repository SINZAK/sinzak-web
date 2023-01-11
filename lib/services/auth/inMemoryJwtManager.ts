// inMemoryJwt.js
const inMemoryJwtManager = () => {
  let inMemoryJWT: null | string = null;

  const getToken = () => inMemoryJWT;

  const setToken = (token: string) => {
    inMemoryJWT = token;
    return true;
  };

  const eraseToken = () => {
    inMemoryJWT = null;
    return true;
  };

  return {
    eraseToken,
    getToken,
    setToken,
  };
};

export default inMemoryJwtManager();
