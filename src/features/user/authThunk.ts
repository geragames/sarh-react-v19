import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { loginSuccess } from "./authSlice";
import axiosWithAuth from "../../api/api.axios";
import { toast } from "react-toastify";

interface changePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

const BASE_URL=import.meta.env.VITE_API_URL

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { username: string; password: string }, { dispatch }) => {
//    const response = await axios.post("http://localhost:8080/auth/log-in", credentials);
      const response = await axios.post(`${BASE_URL}/auth/log-in`, credentials);

    console.log("USUARIO LOGIN " + response.data.username);

    const { accessToken, refreshToken, username, roles } = response.data;

    // ✅ Guardar en Redux + localStorage
    dispatch(loginSuccess({ accessToken, refreshToken, user: username, roles }));
    

    return response.data;
  }
);

export const changePasswordThunk = createAsyncThunk<{message: string},
 changePasswordPayload, { rejectValue: string }>
("auth/ChangePass", async (changePass, {rejectWithValue}) => 
    { try {
       const result = await axiosWithAuth.post<{message: string}>("/auth/change", changePass);
       return   result.data;
    } catch (error) {
       if(error instanceof AxiosError){
          const message = error.response?.data.message;
          return rejectWithValue(message);
       }

        return rejectWithValue( "Error al cambiar la contraseña");
    }
    
  }
);

export const resetPasswordThunk = createAsyncThunk<void, number, {rejectValue: string}>
("auth/ResetPassword", async (id, { rejectWithValue})=> {

  try {
     const res = await axiosWithAuth.post(`/api/admin/user/${id}/reset-password`);
     
     toast.success("Se ha reestablecido la contraseña de provisoria y enviado el correo electronico ");
     
     return res.data;
  } catch (error) {  
     if(error instanceof AxiosError){
        const validationErrors = error.response?.data as Record<string, string>;
        Object.values(validationErrors).forEach((msg: string) => toast.error(msg));
        rejectWithValue(String(validationErrors));
     }
     
     toast.error("Error inesperado al restablecer la contraseña");
     rejectWithValue('Error inesperado');
  }
});