import { useForm } from "react-hook-form";
import { RootState } from "../../features";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { validatePassword } from "../../utilities/passwordValidator";
import { changePasswordThunk } from "../../features/user";


interface ChangePasswordForm {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export const RestartPassword = () => {

    const dispatch = useAppDispatch();

    const { loading, error, passwordChanged } = useAppSelector((state: RootState) => state.auth);

    const { register,
        handleSubmit,
        setError,
        formState: { errors },
        
    } = useForm<ChangePasswordForm>({ mode: 'onSubmit' });


    const onSubmit = (data: ChangePasswordForm) => {
        const { currentPassword, newPassword, confirmPassword } = data;

        const validateError = validatePassword(newPassword);

        if (validateError) {
            setError("newPassword", {
                type: "manual",
                message: validateError,
            });

            return;
        }

        if (newPassword !== confirmPassword) {
            setError("confirmPassword", {
                type: "manual",
                message: "La confirmación no coincide",
            });

            return;
        }

        if (currentPassword === newPassword) {
            setError("newPassword", {
                type: "manual",
                message: "La nueva contraseña debe ser distinta a la actual"
            });
            return;
        }

        dispatch(changePasswordThunk({ currentPassword, newPassword }));

    };

    if (passwordChanged) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="rounded-xl bg-white p-8 shadow-lg text-center">
                    <h2 className="text-xl font-semibold text-green-600">
                        Contraseña Actualizada
                    </h2>
                    <p className="mt-2 text-gray-600">
                        El cambio se realizó correctamente
                    </p>
                </div>
            </div>
        );
    }


    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
            >
                <h1 className="mb-6 text-2xl font-bold text-gray-800">
                    Cambiar contraseña
                </h1>

                {/* Contraseña actual */}
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Contraseña actual"
                        className="w-full rounded-lg border px-3 py-2"
                        {...register("currentPassword", {
                            required: "Debe ingresar la contraseña actual",
                        })}
                    />
                    {errors.currentPassword && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.currentPassword?.message}
                        </p>
                    )}
                </div>

                {/* Nueva contraseña */}
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Nueva contraseña"
                        className="w-full rounded-lg border px-3 py-2"
                        {...register("newPassword", {
                            required: "Debe ingresar la nueva contraseña",
                        })}
                    />
                    {errors.newPassword && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.newPassword?.message}
                        </p>
                    )}
                </div>

                {/* Confirmación */}
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Confirmar nueva contraseña"
                        className="w-full rounded-lg border px-3 py-2"
                        {...register("confirmPassword", {
                            required: "Debe confirmar la contraseña",
                        })}
                    />
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.confirmPassword?.message}
                        </p>
                    )}
                </div>

                {/* Error backend */}
                {error && (
                    <div className="mb-4 rounded bg-red-100 px-4 py-2 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-50"
                >
                    {loading ? "Procesando..." : "Cambiar contraseña"}
                </button>
            </form>
        </div>
    );

}
