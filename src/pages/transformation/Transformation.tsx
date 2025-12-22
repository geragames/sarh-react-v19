import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
//import { useTransformationAction } from "../../features/transformation/useTransformationAction";
import { useAppDispatch } from "../../hooks/store";
import { BodyResolutions } from "../../constants/BodyResolutions";
import { useForm } from "react-hook-form";
import { SelectYears } from "../../components/ui/SelectYears";
import { TextArea } from "../../components/ui/TextArea";
import { Select } from "../../components/ui/Select";
import { addTransformation } from "../../features/transformation/transformationThunk";
import { Button } from "../../components/ui/Button";
import { FaSave } from "react-icons/fa";

export default function Transformation() {
  const dispatch = useAppDispatch();
  // const { addTransformation } = useTransformationAction();

  interface TransformationFields {
    id: number;
    bodyResolutions: (typeof BodyResolutions)[number];
    resolutionNo: string;
    resolutionYear: string;
    date: string | undefined;
    reason: string;
  }

  const { register, reset, handleSubmit } = useForm<TransformationFields>();

  const onSubmit = (data: TransformationFields) => {
    const dateString = data.resolutionYear as string;

    console.log(
      "Nro de Resolución  ",
      data.bodyResolutions.concat(
        " ",
        data.resolutionNo as string,
        "/",
        dateString
      )
    );

    dispatch(
      addTransformation({
        resolutionNumber: data.bodyResolutions.concat(
          " ",
          data.resolutionNo as string,
          "/",
          dateString
        ),
        date: data.date,
        reason: data.reason,
      })
    );

    reset({
      bodyResolutions: "-1",
      resolutionYear: "-1",
    });
  };

  return (
    <div>
      <h5 className="p-2 mb-1 text-1xl font-bold text-gray-400 dark:text-white border border-gray-200 bg-[#cddafd] rounded-t-lg">
        Nueva Transformación
      </h5>
      <div className="p-6 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 gap-3">
            <div>
              <Label htmlFor="bodyResolutions">Organo Emisor</Label>
              <Select {...register("bodyResolutions")}>
                <option value="-1">Elegir un organismo</option>
                {BodyResolutions.map((organ, index) => (
                  <option key={index} value={organ}>
                    {organ}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="resolutionNo">Nro Resolución</Label>
              <Input {...register("resolutionNo")} />
            </div>
            <div>
              <Label htmlFor="resolutionYear">Año Res.</Label>

              <SelectYears {...register("resolutionYear")} />
            </div>
            <div>
              <Label htmlFor="date">Fecha Resol.</Label>
              <Input type="date" {...register("date")} />
            </div>
          </div>
          <div className="mt-6">
            <Label htmlFor="reason">Motivo</Label>

            <TextArea
              {...register("reason")}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            />
          </div>

            <Button
              type="submit"
              className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg inline-flex text-sm px-5 py-2.5 items-center gap-2"
            >
              Agregar <FaSave />
            </Button>
        </form>
      </div>
    </div>
  );
}
