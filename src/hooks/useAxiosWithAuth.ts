import axios from "axios";
import { store } from "../features";
 // 👈 importar store directo
// o si preferís pasar token por parámetro

const URL_BASE = "http://localhost:8080";

// función para los thunks (NO hook)
export const getAxiosWithAuth = () => {
  const { token, tempToken } = store.getState().auth; // ✅ accedemos al state sin hook

  const axiosInstance = axios.create({
    baseURL: URL_BASE,
  });

  axiosInstance.interceptors.request.use((config) => {
    const authToken = token || tempToken;
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  });

  return axiosInstance;
};


/* import axios from "axios";
import { useAppSelector } from "./store";

const URL_BASE = "http://localhost:8080";

export const getAxiosWithAuth = () => {
  const { token, tempToken } = useAppSelector((state) => state.auth);

  const axiosInstance = axios.create({
    baseURL: URL_BASE,
  });

  // Interceptor de request
  axiosInstance.interceptors.request.use(
    (config) => {
      const authToken = token || tempToken;
      if (!authToken) {
        // si no hay token → limpiar storage y redirigir
        localStorage.removeItem("roles_token");
        localStorage.removeItem("token");
        window.location.replace("/login");
        throw new axios.Cancel("No token, redirecting to login");
      }

      config.headers["Authorization"] = `Bearer ${authToken}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptor de response
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 403) {
        localStorage.removeItem("roles_token");
        localStorage.removeItem("token");
        window.location.replace("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
 */


// import axios from "axios";
// import { useAppSelector } from "./store";
// // import { useMemo } from "react";

//  const URL_BASE = 'http://localhost:8080';

// export const useAxiosWithAuth = () => {
   
//     const { token, tempToken } = useAppSelector(state => state.auth);
   
//     const axiosInstance = axios.create({
//         baseURL: URL_BASE,
//     });
    

//     axiosInstance.interceptors.request.use((config) => {
//         const authToken = token || tempToken;
//         console.log("TIENEE TOKEN ", authToken);
//         if(authToken){
//             config.headers["Authorization"] = `Bearer ${authToken}`;
//         }
//         return config;
//     })

//     axiosInstance.interceptors.response.use((response) => response , (error) => {
//          if(error.response && error.response.status === 403){
//             localStorage.removeItem('roles_token');
//             localStorage.removeItem('roles');
//             window.location.replace('/login') ;
//             }
//             return Promise.reject(error)
//     })

//     return axiosInstance;

// }


