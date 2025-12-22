import { configureStore } from "@reduxjs/toolkit";

import agentReducer  from "./agent/agentSlice";

import pointReducer  from "./point/pointSlice";
import positionReducer from "./position/positionSlice";
import { plantReducer } from "./plant/plantSlice";
import sidebarReducer from "./sidebar/sidebarSlice";
import transformationReducer from "./transformation/transformationSlice";
import organizationalReducer from "./organization/organizationalSlice";
import planthistoryReducer from './planthistory/planthistorySlice';
import plantReportReducer from "./plant-report/plantReportSlice";

// import { thunk } from "redux-thunk";
//import { authMiddleware } from "./user/authMiddleware";
import { subOrganizationalReducer } from "./suborganizational/suborganizationalSlice";
import  {authReducer}  from "./user";
import { setStore } from "../api/api.axios";
import { userReducer } from "./user/userSlice";
import { roleReducer } from "./role/roleSlice";



export const store = configureStore({
    reducer: {
        auth: authReducer,
        agents: agentReducer,
        plantReport: plantReportReducer,
        points: pointReducer,
        positions: positionReducer,
        plants: plantReducer,
        planthistory: planthistoryReducer,
        transformations: transformationReducer,
        organizationals: organizationalReducer,
        suborganizationals: subOrganizationalReducer,
        users: userReducer,
        isSideBarOpen: sidebarReducer,
        role: roleReducer,
    },
   // middleware: (getDefaultMiddleware) =>
   //     getDefaultMiddleware().concat(authMiddleware),
    
});

setStore(store);
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;