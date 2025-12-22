
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import React, { useEffect, useState } from "react";
import { searchPlantReport } from "../../features/plant-report/plantReportThunk";
import { PlantFilter } from "../../models/plantFilter";
import { Input } from "../../components/ui/Input";
import { RootState } from "../../features";
import { fetchPoints } from "../../features/point/pointThunk";
import { Select } from "../../components/ui/Select";
import { Button } from "../../components/ui/Button";
import { downloadExcel } from "./download-excel";
import { FaFileExcel } from "react-icons/fa";
//import { loadPending, loadSuccess } from "../../features/plant-report/plantReportSlice";

export const PlantReport = () => {

    const filter: PlantFilter = {
        subject: "",
        department: "",
        teacher: "",
        namePosition: ""
    }

    const [search, setSearch] = useState(filter);


    const dispatch = useAppDispatch();
    const { data, loading, error } = useAppSelector(
        (state) => state.plantReport
    );
    const { points } = useAppSelector((state:RootState) => state.points);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log("Nombre CAMPO ", name);
        setSearch((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value} = e.target;
        setSearch((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    useEffect(() => {
       dispatch(fetchPoints());
    }, [dispatch])


    useEffect(() => {
        const handler = setTimeout(() => {
            dispatch(searchPlantReport(search));
        }, 500); // espera 500ms después de la última tecla

        return () => clearTimeout(handler); // limpia el timeout si se escribe de nuevo
    }, [search, dispatch]);

    const onSubmit = async () => {
        await downloadExcel(search);
    }


    if (loading) return <p>Cargando...</p>;
    if (error) return <p className="text-red-500">{error}</p>;



    // Dispara la búsqueda automáticamente con debounce

    return (
        <div className="container mx-auto p-4">

            <h2 className="font-bold text-lg mb-2">Informe de Planta</h2>
            <Button onClick={ () => onSubmit()}  className="inline-flex items-center mb-3 justify-center gap-2 rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]" > Descargar Excel <FaFileExcel/></Button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <Input name="teacher" value={search.teacher} placeholder="Agente" onChange={handleInputChange} />
                <Input name="subject" value={search.subject} placeholder="Materia" onChange={handleInputChange} />

                <Input name="department" value={search.department} placeholder="Departamento" onChange={handleInputChange} />
                <Select name="namePosition" value={search.namePosition} onChange={handleSelectChange}>
                    <option value="">Tipo Cargo</option>
                    {points.map(point => (
                        <option key={point.id} value={point.namePosition}>{point.namePosition}</option>
                    ))}
                </Select>

            </div><div className="w-full mt-2">
                <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-[#d5d8d3]">
                        <tr>
                            <th colSpan={1} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                            <th colSpan={1} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agente</th>
                            <th colSpan={1} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Materia</th>
                            <th colSpan={1} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
                            <th colSpan={1} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado Cargo</th>
                            <th colSpan={1} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Situación Revista</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (<tr></tr>) : Array.isArray(data) && data.length > 0 ? (
                            data.map((plant) => (
                                <tr key={plant.id} className="bg-white even:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plant.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plant.lastname}, {plant.firstname}</td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plant.nameSubUnit}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plant.namePosition}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plant.characterplantID}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plant.currentStatusID}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                    No se encontraron resultados
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>

            </div>
          
        </div>
    );
};

