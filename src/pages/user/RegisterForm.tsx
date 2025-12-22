import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useForm } from "react-hook-form";
import { registerUser, updateRegisterUser } from "../../services/userService";
import { Label } from "../../components/ui/Label";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { ChangeEvent, useEffect, useState } from "react";
import { RootState } from "../../features";
import { fetchAllRole } from "../../features/role/roleThunk";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { fetchUserById } from "../../features/user/userThunk";

import { Role } from "../../models/roles";
//import { UserRequest, UserWithId } from "../../models/user";


interface RegisterFormInputs {
  id: number;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  roles: number;
  photo: FileList;
}

interface UpdateUserDTO {
  id?: string;
  username: string;
  email: string;
  roles: Role[];
  
} 

export const RegisterForm = ({ mode }: { mode: "create" | "edit" }) => {

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const { id } = useParams<{ id: string }>();

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<RegisterFormInputs>();

  const { roles } = useAppSelector((state: RootState) => state.role);
  const { user } = useAppSelector((state: RootState) => state.users);

  const [selectedRol, setSelectedRol] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllRole());
  }, []);

  useEffect(() => {
    if (mode === "edit" && id) {
      dispatch(fetchUserById(Number(id)));
    }
  }, [id, mode, dispatch]);

useEffect(() => {
  if (mode !== "edit" || !user) return;

  setValue("username", user.username ?? "");
  setValue("email", user.email ?? "");

  const primaryRoleId = user.roles?.[0]?.id;
  if (primaryRoleId) {
    setValue("roles", primaryRoleId);
  }

 

  console.log("EL ROL ACTIVO ES", user.roles);
}, [mode, user, setValue]);

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    console.log("VALOR DE ROL " + values);
    // setRol(values);
    setSelectedRol(values);
  };

  const onSubmit = async (data: RegisterFormInputs) => {
    if (mode === "create" && data.password !== data.confirmPassword) {
      toast.error("Las contraseñas no coinciden");

      return;
    }

    const rolesToSend = selectedRol.map((id) => {
      const rolData = roles.find((rol) => rol.id === Number(id));
      return {
        id: rolData?.id ?? Number(id),
        roleEnum: rolData?.roleEnum ?? "",
      };
    });

    if (mode === "edit" && id) {

      const updateUser = {
      
        username: data.username,
        email: data.email,
        roles: rolesToSend,
        //files: FileList,
      }

    

      try {
        await dispatch(updateRegisterUser({ userId: Number(id), updateUser: updateUser, file: data.photo[0]})).unwrap();

      } catch (error) {

        if (typeof error === "string") {
          toast.error(error);
        }
      }
        return;
    }

    const createUser = {
      username: data.username,
      password: data.password,
      email: data.email, // si existe
      file: FileList,
      roles: rolesToSend, // o el rol que corresponda
    };

    console.log("NUEVO USUARIO " + JSON.stringify(createUser));
    const formData = new FormData();

    formData.append(
      "createUser",
      new Blob([JSON.stringify(createUser)], { type: "application/json" })
    );

    if (data.photo && data.photo.length > 0) {

      formData.append("file", data.photo[0]);
    }


    try {
      dispatch(registerUser(formData)).unwrap();
      reset();
    } catch (error) {
      if (error instanceof Error) toast.error(error?.message);
    }



  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-96 mx-auto"
    >
      <Label>
        Email:
        <Input {...register("email")} className="w-full" />
      </Label>

      <Label>
        Usuario:
        <Input {...register("username")} className="w-full" />
      </Label>

      {mode === "create" && user && (
        <>
          <Label>
            Contraseña:
            <Input type="password" {...register("password")} className="w-full" />
          </Label>
          <Label>
            Confirmar contraseña:
            <Input
              type="password"
              {...register("confirmPassword")}
              className="w-full" />
          </Label>
        </>
      )}

      <Label>
        Roles:
        <Select {...register("roles", { valueAsNumber: true })} onChange={handleChangeSelect}  >
          <option value="">Seleccione</option>
          {roles.map((rol) => (
            <option key={rol.id} value={rol.id}>
              {rol.roleEnum}
            </option>
          ))}
        </Select>
      </Label>


      <Label>
        Foto de perfil:
      </Label>
      {mode === "edit" && user?.profilePicturePath && (
        <div>

          <img
            src={`${API_BASE_URL}${user.profilePicturePath}`}
            alt="Foto de perfil"
            className="w-32 h-32 rounded object-cover mb-2"
          />
        </div>

      )}
      <Input type="file" {...register("photo")} className="w-full" />


      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Registrar
      </button>
    </form>
  );
};
