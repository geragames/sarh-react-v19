import { createAsyncThunk } from "@reduxjs/toolkit";


import axiosWithAuth from "../../api/api.axios";
import {
  OrganizationalSubUnitWithId,
  OrganizationalSubUnitDto,
  OrganizationalSubUnit
} from "../../models/organizationalSubUnit";
import { toast } from "react-toastify";
import { AxiosError } from "axios";


export const fetchSuborganizationalUnits = createAsyncThunk<
  OrganizationalSubUnitDto[],
  void,
  { rejectValue: string }
>("suborganizationalUnit/all", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosWithAuth.get<OrganizationalSubUnitDto[]>(
      "suborganizational/dto/all"
    ); //fetch('http://localhost:8080/organizationalSubunit/all');

    return data;
  } catch (error) {
    return rejectWithValue(String(error));
  }
});

export const fetchSuborganizationalById = createAsyncThunk<
  OrganizationalSubUnitWithId,
  { suborganizational_id: number },
  { rejectValue: string }
>(
  "suborganizationalUnit/fetchById",
  async ({ suborganizational_id }, { rejectWithValue }) => {
    try {
      const { data } = await axiosWithAuth.get<OrganizationalSubUnitWithId>(
        `suborganizational/${suborganizational_id}`
      );
      console.log("DATA SUBORGANIZACIONAL POR ID ", data);
      return data;
    } catch (error) {
      return rejectWithValue(String(error));
    }
  }
);

export const addSuborganizational = createAsyncThunk<
  OrganizationalSubUnitWithId,
  OrganizationalSubUnit,
  { rejectValue: string }
>("suborganizationalUnit/add", async (suborganizational, { rejectWithValue }) => {
  try {
    const { data } = await axiosWithAuth.post<OrganizationalSubUnitWithId>(
      "suborganizational/create", suborganizational
    );
    toast.success("La materia se ha creado exitosamente");
    return data;
  } catch (error) {
    if (error instanceof AxiosError && (error.response?.status === 400 && error.response.data)) {

      const validationErrors = error.response.data as Record<string, string>;
      Object.values(validationErrors).forEach((msg: string) => toast.error(msg));

      return rejectWithValue(String(validationErrors));
    }
    return rejectWithValue("Error Inesperado");
  }
});

export const updateSuborganizational = createAsyncThunk<
  OrganizationalSubUnitWithId,
  {
    suborganizational_id: number;
    suborganizational: Partial<OrganizationalSubUnitWithId>;
  },
  { rejectValue: string }
>(
  "suborganizationalUnit/update",
  async ({ suborganizational_id, suborganizational }, { rejectWithValue }) => {
    try {
      const { data } = await axiosWithAuth.put<OrganizationalSubUnitWithId>(
        `suborganizational/update/${suborganizational_id}`,
        suborganizational
      );
      toast.success("La materia se ha actualizado con exito");
      return data;
    } catch (error) {
      if (error instanceof AxiosError && (error.response?.status === 400 && error.response.data)) {

        const validationErrors = error.response.data as Record<string, string>;
        Object.values(validationErrors).forEach((msg: string) => toast.error(msg));

        return rejectWithValue(String(validationErrors));
      }
      return rejectWithValue("Error Inesperado");
    }
  }
);
