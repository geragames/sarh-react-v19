import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosWithAuth from "../../api/api.axios";
import { Transformation, TransformationWithId } from "../../models/transformation";


export const fetchTransformations = createAsyncThunk<
  TransformationWithId[],
  void,
  { rejectValue: string }
>("fetchTransformation/all", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosWithAuth.get("/transformation/all");
    return data;
  } catch (error) {
    return rejectWithValue(String(error));
  }
});



export const fetchTransformationLast = createAsyncThunk<
  TransformationWithId,
  void,
  { rejectValue: string }
>("fetchTransformationLast/last", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosWithAuth.get("/transformation/last");
    return data;
  } catch (error) {
    return rejectWithValue(String(error));
  }
});

export const addTransformation = createAsyncThunk<TransformationWithId,Transformation, {rejectValue: string}>(
    "addTransformation/add", async (transformation, {rejectWithValue}) => {
         try {
            const {data} = await axiosWithAuth.post("transformation/add", transformation);
            return data;
         } catch (error) {
            return rejectWithValue(String(error));
            
         }
    }
)
