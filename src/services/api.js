import axios from "axios";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000/api"
).replace(/\/+$/, "");

const api = axios.create({
  baseURL: API_URL,
});

/* =========================================================
   REQUEST INTERCEPTOR
========================================================= */

api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");

    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }

    // FormData requests must NOT use application/json.
    // Let the browser/Axios generate multipart/form-data
    // together with the required boundary.
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================================================
   RESPONSE INTERCEPTOR
   Automatically refresh expired access tokens
========================================================= */

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    /*
     * No response means network/server connection problem.
     */
    if (!error.response) {
      return Promise.reject(error);
    }

    /*
     * Don't try refreshing login or refresh requests.
     */
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/token/") &&
      !originalRequest.url?.includes("/token/refresh/")
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

      if (!refresh) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        window.location.href = "/admin/login";

        return Promise.reject(error);
      }

      try {
        console.log("Access token expired. Refreshing...");

        const response = await axios.post(
          `${API_URL}/token/refresh/`,
          {
            refresh,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const newAccess = response.data.access;

        localStorage.setItem("access", newAccess);

        /*
         * If SimpleJWT rotates refresh tokens,
         * save the new refresh token.
         */
        if (response.data.refresh) {
          localStorage.setItem(
            "refresh",
            response.data.refresh
          );
        }

        /*
         * Attach the new token to the original request.
         */
        originalRequest.headers.Authorization =
          `Bearer ${newAccess}`;

        return api(originalRequest);

      } catch (refreshError) {
        console.error(
          "Session refresh failed:",
          refreshError.response?.data || refreshError
        );

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        window.location.href = "/admin/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;