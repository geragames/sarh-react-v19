import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosWithAuth from "../api/api.axios";
import { toast } from "react-toastify";
import { UserUpdate, UserWithId } from "../models/user";
import { AxiosError } from "axios";



export const updateRegisterUser = createAsyncThunk<
    UserWithId,
    { userId: number; updateUser: UserUpdate; file?: File },
    { rejectValue: string }
>(
    "user/updateRegisterUser",
    async ({ userId, updateUser, file }, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            formData.append(
                "updateUser",
                new Blob([JSON.stringify(updateUser)], {
                    type: "application/json",
                })
            );

            if (file) {
                formData.append("file", file);
            }

            const { data } = await axiosWithAuth.put<UserWithId>(
                `/user/update/${userId}`,
                formData
            );

            toast.success("El usuario se actualizó con éxito");
            return data;

        } catch (error) {
            if (error instanceof AxiosError) {
                const status = error.response?.status;

                if ((status === 400 || status === 422) && error.response?.data) {
                    const validationErrors = error.response.data as Record<string, string>;
                    Object.values(validationErrors).forEach(msg => toast.error(msg));
                    return rejectWithValue("Errores de validación");
                }

                if (status === 403) {
                    toast.error("No tiene permisos para realizar esta acción");
                    return rejectWithValue("Acceso denegado");
                }
                if (status === 409) {
                    toast.error("El usuario ya se encuentra registrado");
                    return rejectWithValue("conflicto");
                }
            }

            toast.error("Error inesperado al actualizar el usuario");
            return rejectWithValue("Error inesperado");
        }
    }
);


export const registerUser = createAsyncThunk("user/registerUser",
    async (formData: FormData, { rejectWithValue }) => {
        try {

            const response = await axiosWithAuth.put("user/create", formData, {
                headers: { 'Content-Type': "multipart/form-data" }
            });
            toast.success("El usuario se registro con exito");
            return response.data;
        } catch (error) {


            return rejectWithValue(String(error));

        }
    }
)

export const fetchUserPhoto = async (username: string): Promise<string> => {
    const response = await axiosWithAuth.get(`/user/${username}/photo`, {
        responseType: 'blob'
    });
    return URL.createObjectURL(response.data);
}
export const updateUserProfilePicture = createAsyncThunk<
    string, // backend devuelve la nueva ruta
    { userId: number; file: File },
    { rejectValue: string }
>(
    "user/updateProfilePicture",
    async ({ userId, file }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const { data } = await axiosWithAuth.put<string>(
                `/user/${userId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Foto de perfil actualizada");
            return data;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                toast.error("Error al actualizar la imagen");
                return rejectWithValue("No se pudo actualizar la imagen");
            }

            return rejectWithValue("Error inesperado");
        }
    }
);