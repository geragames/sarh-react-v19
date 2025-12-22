import { createSlice } from "@reduxjs/toolkit";
import { PlantHistoryWithId } from "../../models/plant-history";
import { fetchPlantHistoryLast, fetchPlantHistoryList } from "./PlantHistoryThunk";


export interface PlantHistoryState {
   plantHistories: PlantHistoryWithId[],
   plantHistory: PlantHistoryWithId | null | undefined
   ;
   loading: boolean;
   error: string | null;
}

const initialState: PlantHistoryState = {
   plantHistories: [],
   plantHistory: null,
   loading: true,
   error: null
}


const planthistorySlice = createSlice({
   name: 'planthistory',
    initialState,
    reducers: {
     
    },
    extraReducers: (builder) => {
      builder.addCase( fetchPlantHistoryList.pending, (state) => {
         state.loading = true;
         state.error = null;
      });
      builder.addCase(fetchPlantHistoryList.fulfilled, (state, action) => {
         state.loading = false;
         state.plantHistories = action.payload;
      });
      builder.addCase(fetchPlantHistoryList.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload ?? "Error Desconocido";
      });
      builder.addCase( fetchPlantHistoryLast.pending, (state) => {
         state.loading = true;
         state.error = null;
      });
      builder.addCase(fetchPlantHistoryLast.fulfilled, (state, action) => {
         state.loading = false;
         state.plantHistory = action.payload;
      });
      builder.addCase(fetchPlantHistoryLast.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload ?? "Error Desconocido";
      });   
    }

})


export default planthistorySlice.reducer;