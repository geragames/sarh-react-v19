import { createSlice } from "@reduxjs/toolkit";
import { PlantOfPositionDto } from "../../models/plant-position";
import { searchPlantReport } from "./plantReportThunk";

interface PlantReportState {
  data: PlantOfPositionDto[];
  loading: boolean;
  error: string | null;
}

const initialState: PlantReportState = {
  data: [],
  loading: false,
  error: null,
};

export const plantReportSlice = createSlice({
  name: "plantReport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchPlantReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPlantReport.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(searchPlantReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error desconocido";
      });
  },
});

export default plantReportSlice.reducer;
