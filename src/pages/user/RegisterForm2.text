import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useForm } from "react-hook-form";
import { registerUser } from "../../services/userService";
import { Label } from "../../components/ui/Label";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Role } from "../../models/roles";
import { ChangeEvent, useEffect, useState } from "react";
import { RootState } from "../../features";
import { fetchAllRole } from "../../features/role/roleThunk";
import { toast } from "react-toastify";

interface RegisterFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  roles: Role[];
  photo: FileList;
}

export const RegisterForm = () => {
  const { register, handleSubmit, reset } = useForm<RegisterFormInputs>();

  const { roles } = useAppSelector((state: RootState) => state.role);

  const [selectedRol, setSelectedRol] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllRole());
  }, []);

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    console.log("VALOR DE ROL " + values);
    // setRol(values);
    setSelectedRol(values);
  };

  const onSubmit = (data: RegisterFormInputs) => {
    if (data.password !== data.confirmPassword) {
      alert("Las contraseñas no coinciden");

      return;
    }

    const rolesToSend = selectedRol.map((id) => {
      const rolData = roles.find((rol) => rol.id === Number(id));
      return {
        id: rolData?.id ?? Number(id),
        roleEnum: rolData?.roleEnum ?? "",
      };
    });

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
      // = data.photo[0];
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

      <Label>
        Contraseña:
        <Input type="password" {...register("password")} className="w-full" />
      </Label>

      <Label>
        Confirmar contraseña:
        <Input
          type="password"
          {...register("confirmPassword")}
          className="w-full"
        />
      </Label>
      <Label>
        Roles:
        <Select {...register("roles")} onChange={handleChangeSelect}>
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
        <Input type="file" {...register("photo")} className="w-full" />
      </Label>

      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Registrar
      </button>
    </form>
  );
};
