import decode from "jwt-decode";

const JWT = "store_token_id";

const setToken = token => {
  localStorage.setItem(JWT, token);
};

const getToken = () => {
  return localStorage.getItem(JWT);
};

const isLogin = () => {
  const jwToken = getToken();
  return !!jwToken && !isTokenExpired();
};

const isTokenExpired = token => {
  try {
    const _info = decode(token);
    if (_info.exp < Date.now() / 1000) {
      return true;
    } else return false;
  } catch (error) {
    return false;
  }
};

const logout = () => {
  localStorage.removeItem(JWT);
};

const getUser = () => {
  const JWToken = getToken();
  if (isLogin()) {
    const user = decode(JWToken);
    return user;
  } else {
    return null;
  }
};

global.auth = {
  setToken,
  getUser,
  logout,
  isLogin,
  getToken
};
