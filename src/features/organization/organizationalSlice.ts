import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  OrganizationalUnitDto,
  OrganizationalUnitWithId,
} from "../../models/organizationalUnit.d";
import { fetchOrganizationalUnit , addOrganizationalUnit, fetchOrganizationalUnitDto, fetchOrganizationalById } from '../organization/organizationalThunk';


interface OrganizationalState {
  organizationals: OrganizationalUnitWithId[];
  organizational: OrganizationalUnitWithId | null;
  organizationalsDto: OrganizationalUnitDto[];
  loading: boolean;
  error: string | null;
}

const initialState: OrganizationalState = {
  organizationals: [],
  organizationalsDto: [],
  organizational: null,
  loading: false,
  error: null,
};

const organizationalSlice = createSlice({
  name: "organizational",
  initialState,

  reducers: {
   

  },
  extraReducers: (builder) => {
     builder.addCase(fetchOrganizationalById.pending, (state) => {
        state.loading = true;
        state.error = null;
     })
     .addCase(fetchOrganizationalById.fulfilled, (state, action: PayloadAction<OrganizationalUnitWithId>) => {
        state.loading = false;
        state.organizational = action.payload;
     })
     .addCase(fetchOrganizationalById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
     });

    builder.addCase( fetchOrganizationalUnit.pending, (state) => {
         state.loading = true;
    })
    .addCase(fetchOrganizationalUnit.fulfilled, (state, action) => {
       state.loading = false;
       state.organizationals = action.payload;
    })
    .addCase(fetchOrganizationalUnit.rejected, (state, action) => {
       state.error = action.error as string;
       state.loading = false; 
    })
    .addCase(fetchOrganizationalUnitDto.pending, (state) => {
       state.loading = true;
    })
    .addCase(fetchOrganizationalUnitDto.fulfilled, (state, action) => {
       state.loading = false;
       state.organizationalsDto = action.payload;
    })
    .addCase(fetchOrganizationalUnitDto.rejected, (state, action) => {
       state.error = action.error as string;
       state.loading = false; 
    })    
    .addCase(addOrganizationalUnit.pending, (state) => {
       state.loading = true;
       state.error = null;
    })
    .addCase(addOrganizationalUnit.fulfilled, (state, action) => {
      state.loading = false;
      state.organizationals.push(action.payload);
    })
    .addCase(addOrganizationalUnit.rejected, (state, action)=> {
       state.loading = false;
       state.error = action.error as string;
    })
  }
});

export default organizationalSlice.reducer;
//export const {fetchStart, fetchSuccess, setOrganizational, setOrganizationals } = organizationalSlice.actions;