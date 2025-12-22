import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosWithAuth from "../../api/api.axios";

import {
  PlantOfPositionDto,
  PlantPositionRequest,
  PlantPositionWithId,
} from "../../models/plant-position";

export const fetchPlantPositions = createAsyncThunk<
  PlantOfPositionDto[],
  void,
  { rejectValue: string }
>("plant/fetchAll", async (_, { rejectWithValue }) => {
  // const axiosWithAuth = useAxiosWithAuth();

  try {
    const { data } = await axiosWithAuth.get<PlantOfPositionDto[]>(
      "/plant/all"
    );
    console.log("fetchPlantPositions ", data);
    return data;
  } catch (error) {
    return rejectWithValue(String(error));
  }
});

export const fetchPlantsOfPositionById = createAsyncThunk<
  PlantPositionWithId,
  { plantId: number },
  { rejectValue: string }
>("plant/fetchById", async ({ plantId }, { rejectWithValue }) => {
  try {
    const { data } = await axiosWithAuth.get(`/plant/${plantId}`);
    console.log("fetchPlantsOfPositionById ", data);
    return data;
  } catch (error) {
    return rejectWithValue(String(error));
  }
});

export const addPlantPosition = createAsyncThunk<
  PlantPositionWithId,
  PlantPositionRequest,
  { rejectValue: string }
>(
  "plant/add",
  async (plantPositionRequest: PlantPositionRequest, { rejectWithValue }) => {
    try {
      const { data } = await axiosWithAuth.post<PlantPositionWithId>(
        "/plant/create",
        plantPositionRequest
      );
      return data as PlantPositionWithId;
    } catch (error) {
      return rejectWithValue(String(error));
    }
  }
);

export const updatePlantPosition = createAsyncThunk<
  PlantPositionWithId,
  { plantId: number; plantPositionRequest: PlantPositionRequest },
  { rejectValue: string }
>(
  "plant/update/",
  async ({ plantId, plantPositionRequest }, { rejectWithValue }) => {
    try {
      const { data } = await axiosWithAuth.put<PlantPositionWithId>(
        `/plant/update/${plantId}`,
        plantPositionRequest
      );
      return data as PlantPositionWithId;
    } catch (error) {
      return rejectWithValue(String(error));
    }
  }
);
