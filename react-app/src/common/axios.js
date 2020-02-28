import _axios from "axios";

const axios = baseURL => {
  const instance = _axios.create({
    baseURL: baseURL || "http://localhost:3003",
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" }
  });

  return instance;
};

export { axios };
export default axios();
