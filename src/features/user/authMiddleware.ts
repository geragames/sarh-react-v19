import { Middleware } from "@reduxjs/toolkit";
import axiosWithAuth from "../../api/api.axios";

export const authMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);

    //console.log("AUTH MIDDLEWARE TRIGGERED " + JSON.stringify(store.getState().auth)   );

    const { accessToken, refreshToken} = store.getState().auth;
    const activeToken = refreshToken || accessToken || localStorage.getItem("token");

    console.log("AUTH MIDDLEWARE - Setting Authorization header with token: " + JSON.stringify( store.getState().auth)) ;

    if(activeToken) {
        axiosWithAuth.defaults.headers.common["Authorization"] = `Bearer ${activeToken}`;
    } else {
        delete axiosWithAuth.defaults.headers.common["Authorization"];
    }

    return result;
}