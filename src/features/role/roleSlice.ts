import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "../../models/roles";
import { fetchAllRole } from "./roleThunk";

export interface RoleStatus {
    roles: Role[],
    role: Role | null,
    loading: boolean,
    error: string | null,
}

const initialState: RoleStatus = {
    roles: [],
    role: null,
    loading: false,
    error: null,
}

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllRole.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchAllRole.fulfilled, (state, action: PayloadAction<Role[]>) => {
            state.loading = false;
            state.roles = action.payload;
        });

        builder.addCase(fetchAllRole.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Error fetching role";
        });
    }
 
});

export const roleReducer = roleSlice.reducer;