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
   Attach JWT access token to protected requests
========================================================= */

api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");

    if (access) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${access}`;
    }

    // Do NOT manually set Content-Type here.
    // Axios will automatically handle:
    // application/json
    // multipart/form-data
    // FormData boundaries, etc.

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================================================
   RESPONSE INTERCEPTOR
   Automatically refresh expired access token
========================================================= */

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // No response from server
    if (!error.response) {
      return Promise.reject(error);
    }

    /*
     * If access token expired, attempt refresh.
     *
     * Don't refresh:
     * - login request
     * - refresh request
     * - a request that has already been retried
     */

    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/token/") &&
      !originalRequest.url?.includes("/token/refresh/")
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

      if (!refresh) {
        console.warn("No refresh token available.");

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
         * If SimpleJWT rotation is enabled,
         * save the new refresh token too.
         */
        if (response.data.refresh) {
          localStorage.setItem(
            "refresh",
            response.data.refresh
          );
        }

        console.log("Access token refreshed successfully.");

        /*
         * Attach the new token to the original request.
         */
        originalRequest.headers =
          originalRequest.headers || {};

        originalRequest.headers.Authorization =
          `Bearer ${newAccess}`;

        /*
         * Retry the original request.
         */
        return api(originalRequest);

      } catch (refreshError) {
        console.error(
          "Session refresh failed:",
          refreshError
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