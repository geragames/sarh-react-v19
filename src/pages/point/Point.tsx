import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/store";
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { PointsTable } from "./PointsTable";
import { fetchPoints, updatePointByPercentage } from "../../features/point/pointThunk";

export const Point = () => {


    const dispatch = useAppDispatch();

    type PercentageFields = {
        percentage: number;
    }

    const { register, handleSubmit } = useForm<PercentageFields>();

    const onSubmit = async (data: PercentageFields) => {
        console.log(data);

        await dispatch(updatePointByPercentage({ percentage: { percentage: data.percentage } }));
        dispatch(fetchPoints());
    }

    return (
        <div className="container max-w-6xl mx-auto px-4 py-6">

            <h1 className="text-2xl font-bold mb-4">Configurar Porcentaje de Paritaria</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
                <div className="mb-4">
                    <Label htmlFor="percentage">
                        Porcentaje Paritaria (%)
                    </Label>
                    <Input
                        type="number"
                        id="percentage"
                        step={0.01}
                        {...register("percentage", { required: true, min: 0, max: 100 })}
                        placeholder="Ingrese el porcentaje de puntos"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Guardar
                </button>
            </form>
            <div>
                <PointsTable />
            </div>
        </div>
    );
}