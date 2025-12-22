import { createAsyncThunk } from "@reduxjs/toolkit";
import { PlantHistoryWithId } from "../../models/plant-history";
import axiosWithAuth from "../../api/api.axios";


export const fetchPlantHistoryList = createAsyncThunk<
  PlantHistoryWithId[],
  { planthistory_id: number },
  { rejectValue: string }
>("planthistory/fetchAll", async ({ planthistory_id }, { rejectWithValue }) => {
  try {
    const { data } = await axiosWithAuth.get<PlantHistoryWithId[]>(
      `planthistory/${planthistory_id}`
    );
    return data;
  } catch (error) {
    return rejectWithValue(String(error));
  }
});

export const fetchPlantHistoryLast = createAsyncThunk<
  PlantHistoryWithId,
  { planthistory_id: number },
  { rejectValue: string }
>("planthistory/fetchLast", async( {planthistory_id}, { rejectWithValue} ) =>{
    try {
        const { data } = await axiosWithAuth.get<PlantHistoryWithId>(`planthistory/top/${planthistory_id}`)
         return data;
    } catch (error) {
        return rejectWithValue(String(error));
    }
});
