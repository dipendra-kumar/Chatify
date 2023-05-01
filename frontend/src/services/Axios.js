import axios from "axios";

// import LocalStorageService from "./LocalStorageService";


const MAIN_URL = `http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}`;
// const MAIN_URL = "http://localhost:3001/v1";

const instance = axios.create({ baseURL: MAIN_URL });

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // console.log(error.config.url);

    try {
      if (error.response.status === 401 && !originalRequest._retry) {
        localStorage.clear();

        // LocalStorageService.logout();
        window.location.pathname = "/login";
      }

      // } catch (error) {}
      const errorStatus = error.response.status;
      const expectedError =
        error.response &&
        error.response.state >= 400 &&
        error.response.status < 500;
      if (!expectedError) {
        try {
        } catch (er) {
          try {
          } catch (er) { }
        }
      }
    } catch (er) { }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use((config) => {
  if (config && config.headers && !config.headers.Authorization) {
    const { token } = JSON.parse(localStorage.getItem("userInfo"));
    // const authObj = JSON.parse(auth ? auth : "{}");
    // const user = authObj.user ? JSON.parse(authObj.user) : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    //config.headers.refreshToken = "Bearer ";
  }
  return config;
});

const methods = {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
};

export default methods;


export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
    async ({ url, method, data, params, headers }) => {
      const token = localStorage.getItem('userInfo')
      try {
        const result = await axios({
          url: `${MAIN_URL}/${url}`,
          method,
          data,
          params,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            ...headers,
          },
        });
        return { data: result.data };
      } catch (axiosError) {
        let err = axiosError;

        if (err?.response?.status === 401) {
          localStorage.clear();

          // LocalStorageService.logout();
          window.location.pathname = "/";
        }
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        };
      }
    };
