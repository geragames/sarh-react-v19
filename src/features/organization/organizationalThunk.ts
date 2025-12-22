import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosWithAuth from "../../api/api.axios";
import {
  OrganizationalUnit,
  OrganizationalUnitDto,
  OrganizationalUnitWithId,
} from "../../models/organizationalUnit.d";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const fetchOrganizationalUnit = createAsyncThunk<
  OrganizationalUnitWithId[],
  void,
  { rejectValue: string }
>("organizational/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosWithAuth.get<OrganizationalUnitWithId[]>(
      "organizational/all"
    );
    return data;
  } catch (error) {
    return rejectWithValue(String(error));
  }
});

export const fetchOrganizationalById = createAsyncThunk<
  OrganizationalUnitWithId,
  { organizational_id: number },
  { rejectValue: string }
>(
  "organizational/fetchById",
  async ({ organizational_id }, { rejectWithValue }) => {
    try {
      const { data } = await axiosWithAuth.get<OrganizationalUnitWithId>(
        `organizational/${organizational_id}`
      );
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(String(error));
    }
  }
);

export const fetchOrganizationalUnitDto = createAsyncThunk<
  OrganizationalUnitDto[],
  void,
  { rejectValue: string }
>("organizational/fetchAllDto", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosWithAuth.get<OrganizationalUnitDto[]>(
      "organizational/dto/all"
    );
    return data;
  } catch (error) {
    return rejectWithValue(String(error));
  }
});
/* export const fetchOrganizationalUnitDto = createAsyncThunk<OrganizationalUnitDto[], { rejectValue: string}>(
  "organizational/fetchAllDto", async (_, { rejectWithValue }) => {
    try {
      const {data} = await axiosWithAuth.get<OrganizationalUnitDto[]>("organizational/allDto");
      return data;
    } catch (error) {
       return rejectWithValue(error);
    }
  }
); */

export const addOrganizationalUnit = createAsyncThunk<
  OrganizationalUnitWithId,
  OrganizationalUnit,
  { rejectValue: string }
>("organizational/add", async (organizational, { rejectWithValue }) => {
  try {
    const { data } = await axiosWithAuth.post<OrganizationalUnitWithId>(
      "organizational/create",
      organizational
    );
    toast.success("El departamento academico se creo con exito");
    return data as OrganizationalUnitWithId;
  } catch (error) {
    
   if(error instanceof AxiosError && ((error.response?.status === 400 || error.response?.status === 422  ) && error.response.data)){
        const validationErrors = error.response.data as Record<string, string>;
        Object.values(validationErrors).forEach((msg:string)=> toast.error(msg));
        
        return rejectWithValue(String(validationErrors));
      }
      return rejectWithValue("Error inesperado");
  }
});

export const updateOrganizationaUnit = createAsyncThunk<
  OrganizationalUnitWithId,
  { organizationalId: number; organizational: OrganizationalUnit },
  { rejectValue: string }
>(
  "organizational/update",
  async ({ organizationalId, organizational }, { rejectWithValue }) => {
    try {
      const { data } = await axiosWithAuth.put(
        `organizational/update/${organizationalId}`,
        organizational
      );

      toast.success("El departamento academico se actualizo correctamente");
      return data as OrganizationalUnitWithId;
    } catch (error ) {
      if(error instanceof AxiosError && ((error.response?.status === 400 || error.response?.status === 422  ) && error.response.data)){
        const validationErrors = error.response.data as Record<string, string>;
        Object.values(validationErrors).forEach((msg:string)=> toast.error(msg));
        
        return rejectWithValue(String(validationErrors));
      }
      return rejectWithValue("Error inesperado");
    }
  }
);
