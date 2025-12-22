import { createSlice } from "@reduxjs/toolkit";
import { OrganizationalSubUnitDto, OrganizationalSubUnitWithId } from "../../models/organizationalSubUnit";
import { addSuborganizational, fetchSuborganizationalById, fetchSuborganizationalUnits } from "./suborganizationalThunk";


interface SuborganizationalState {
    loading: boolean;
    error: string | null;
    suborganizationalDTOs: OrganizationalSubUnitDto[];
    suborganizational: OrganizationalSubUnitWithId | null;
}

const initialState: SuborganizationalState = {
    loading: false,
    error: null,
    suborganizationalDTOs: [],
    suborganizational: null,
}

export const subOrganizationalSlice = createSlice({
  name: "suborganizationalUnit",
  initialState,       
  reducers: {},
    extraReducers: (builder) => { 
        builder.addCase(fetchSuborganizationalUnits.pending, (state) => { 
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchSuborganizationalUnits.fulfilled , (state, action) => {
            state.loading = false;
            state.suborganizationalDTOs = action.payload;
        })
        .addCase(fetchSuborganizationalUnits.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error as string;
        });  
        builder.addCase( fetchSuborganizationalById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase( fetchSuborganizationalById.fulfilled, (state, action) => {
            state.loading = false;
            state.suborganizational = action.payload;
        })
        .addCase( fetchSuborganizationalById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error as string;
        });
        builder.addCase( addSuborganizational.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase( addSuborganizational.fulfilled, (state, action) => {
            state.loading = false;
            state.suborganizational = action.payload;
        })
        .addCase( addSuborganizational.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error as string;
        }); 
    }    

})

export const subOrganizationalReducer = subOrganizationalSlice.reducer;