import _axios from "axios";

const axios = baseURL => {
  const instance = _axios.create({
    baseURL: baseURL || "http://localhost:3003",
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" }
  });

  instance.interceptors.request.use(
    config => {
      const jwToken = global.auth.getToken();
      // console.log(jwToken);
      config.headers["Authorization"] = "Bearer " + jwToken;
      return config;
    },
    error => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  return instance;
};

export { axios };
export default axios();
