import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosWithAuth from "../../api/api.axios";
import { Role } from "../../models/roles";

export const fetchAllRole = createAsyncThunk<Role[], void, { rejectValue: string}>(
    "roles/fetchAll", async (_ , { rejectWithValue}) => {
        try {
            const { data } = await axiosWithAuth.get("role/all"); 
            console.log("ROLES ", JSON.stringify(data));
            
            return data;

        } catch (error) {
            return rejectWithValue(String(error));

        }
    }
)