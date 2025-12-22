import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";

import type { AppStore } from "../features";
import {
  logout,
  updateAccessToken,
  updateUserData,
} from "../features/user/authSlice";
//import { logout, updateAccessToken, updateUserData } from "../features/user/authThunk";
//import { reactRefresh } from "eslint-plugin-react-refresh";

const BASE_URL = "http://localhost:8080/";
let reduxStore: AppStore | null = null;

export const setStore = (store: AppStore) => {
  reduxStore = store;
};

const getToken = (): string | null => localStorage.getItem("token");
const getRefreshToken = (): string | null => localStorage.getItem("refresh_token");
// const getUser = (): string | null => localStorage.getItem("user");
// const getRoles = (): string | null => localStorage.getItem("roles");

export const setToken = (
  accessToken: string,
  refreshToken?: string,
  user?: string,
  roles?: string[]
) => {
  localStorage.setItem("token", accessToken);
  if (refreshToken) localStorage.setItem("refresh_token", refreshToken);
  if (user) localStorage.setItem("user", user);
  if (roles) localStorage.setItem("roles", JSON.stringify(roles));
};

export const clearTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
  localStorage.removeItem("roles");
  localStorage.removeItem("photoUrl");
};

// Crear instancia base
const axiosWithAuth: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Flag para evitar múltiples solicitudes de refresh simultáneas
let isRefreshing = false;

// let refreshPromise: Promise<string | null> | null = null;

// 🟩 Interceptor de REQUEST: agrega el access token
axiosWithAuth.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axiosWithAuth.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {

    console.log("ENTRO AL INTERCEPTOR RESPONSE");
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;
    const refreshToken = getRefreshToken();

    console.warn("Interceptor activado:", {
      status,
      url: originalRequest.url,
      hasRefreshToken: !!refreshToken,
      isRefreshing,
    });

    if ((status === 401 || status === 403) && !originalRequest._retry) {
      if (!refreshToken) {
        console.warn("No hay refreshToken — redirigiendo a login");
        clearTokens();
        reduxStore?.dispatch(logout());
        window.location.replace("/login");
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        console.log("Intentando refrescar token...");
        const resp = await axios.post(`${BASE_URL}auth/refresh`, {refreshToken: refreshToken });
        console.log("Respuesta refresh:", resp.data);

        const newAccessToken = resp.data?.accessToken || resp.data?.token;
        const newRefreshToken = resp.data?.refreshToken || refreshToken;
        const user = resp.data?.user;
        const roles = resp.data?.roles;

        if (!newAccessToken) throw new Error("El backend no devolvió accessToken");

        setToken(newAccessToken, newRefreshToken, user, roles);

        axiosWithAuth.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        reduxStore?.dispatch(updateAccessToken(newAccessToken));
        if (user) reduxStore?.dispatch(updateUserData({ user, roles }));

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        console.log("Token refrescado exitosamente.");
        return axiosWithAuth(originalRequest);
      } catch (refreshError) {
        console.error("Error en refresh:", refreshError);
        clearTokens();
        reduxStore?.dispatch(logout());
        window.location.replace("/login");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);


/* // 🟥 Interceptor de RESPONSE: maneja expiración del token
axiosWithAuth.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    const status = error.response?.status;

    if ((status === 403 || status === 401) && !originalRequest._retry) {
      const refreshToken = getRefreshToken();
      console.log("Token expirado. Intentando refrescar...", refreshToken);

      if (!refreshToken) {
        clearTokens();
        reduxStore?.dispatch(logout());
        window.location.replace("/login");
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = axios
          .post(`${BASE_URL}auth/refresh`, { refreshToken })
          .then((resp) => {
            const newAccessToken = resp.data?.accessToken;
            const newRefreshToken = resp.data?.refreshToken || refreshToken;
            const user = resp.data?.user;
            const roles = resp.data?.roles;

            if (!newAccessToken)
              throw new Error("No se recibió un nuevo accessToken");

            setToken(newAccessToken, newRefreshToken, user, roles);

            reduxStore?.dispatch(updateAccessToken(newAccessToken));

            if (user) reduxStore?.dispatch(updateUserData({ user, roles }));

            axiosWithAuth.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

            return newAccessToken;
          })
          .catch((err) => {
            clearTokens();
            reduxStore?.dispatch(logout());
            window.location.replace("/login");
            throw err;
          })
          .finally(() => {
            isRefreshing = true;
          });
      }

      try {
        const newToken = await refreshPromise;
        if (newToken && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        // ✅ Reintentar la solicitud original con el nuevo token
        return axiosWithAuth(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
); */

export default axiosWithAuth;
