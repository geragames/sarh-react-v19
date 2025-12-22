import { Controller, useForm } from "react-hook-form"
import { Label } from "../../components/ui/Label"
import UserAutocomplete from "../../components/ui/UserAutocomplete"
// import { useAppDispatch, useAppSelector } from "../../hooks/store"
// import { RootState } from "../../features"
import { UserWithId } from "../../models/user"
import { Button } from "../../components/ui/Button"
import { FaEnvelope } from "react-icons/fa"
import { PiPasswordFill } from "react-icons/pi"
import { useAppDispatch } from "../../hooks/store"
import { resetPasswordThunk } from "../../features/user"
import { toast } from "react-toastify"

export const ResetPassword = () => {

    interface ResetPasswordField {
        
        user: UserWithId | null;
    }

    const dispatch = useAppDispatch();
    // const { users } = useAppSelector((state: RootState) => state.users);

    const { control, watch, handleSubmit } = useForm<ResetPasswordField>({
        defaultValues: {
            user: null
        }
    });

    const userDetails = watch('user');


   const resetPasswordSubmit = async ({user}: ResetPasswordField) => {
       
        if(!user) {
            toast.error("Debe seleccionar un usuario");
            return;   
        }

        try {
            await dispatch(resetPasswordThunk(Number(user.id)));       
        } catch (error) {
            
            console.log(error);
        }

        
   }


    return (
        <div>
            <h5 className="p-2 mb-1 text-1xl font-bold text-gray-400 dark:text-white border border-gray-200 bg-[#cddafd] rounded-t-lg">
                Reestablecer Contraseña de Usuario
            </h5>

            <div className="p-6 space-y-6">
                <form onSubmit={handleSubmit(resetPasswordSubmit)}>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                            <Label htmlFor="user">Usuario</Label>
                            <Controller
                                name="user"
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <div className="flex items-center space-x-2">
                                        <UserAutocomplete onSelect={(user) => onChange(user)} />
                                    </div>
                                )}
                            />
                        </div>

                        <div className="card col-[1/2] pl-2">
                            <Label>Apellido</Label>
                            <span>{userDetails?.username}</span>
                        </div>
                        <div className="card col-[2/2] pl-2">
                            <Label>Nombres</Label>
                            <span>{userDetails?.email}</span>
                        </div>

                    </div>

                    <Button
                        type="submit"
                        className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg inline-flex text-sm px-5 py-2.5 items-center gap-2"
                    >
                        Reestablecer Contraseña <PiPasswordFill /> y Enviar Correo <FaEnvelope />
                    </Button>
                </form>

            </div>

        </div>
    )

}