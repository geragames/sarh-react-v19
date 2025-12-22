import { useEffect } from "react"
//import { usePlantPositionAction } from "../../features/plant/usePlantPositionAction"
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { RootState } from "../../features";
import { Link, useLocation } from "react-router-dom";
import { LuFilePen, LuTrash2 } from "react-icons/lu";
import { Spinner } from "../../components/ui/Spinner";
import { fetchPlantPositions } from "../../features/plant/plantPositionThunk";
import { FaPlus } from "react-icons/fa";



export const StaffingPlans = () => {

  const { plantDTOs } = useAppSelector((state: RootState) => state.plants);
  const loading = useAppSelector((state: RootState) => state.plants.loading);
  const dispatch = useAppDispatch();

  //const { fetchPlantPosition } = usePlantPositionAction();
  //  const [plantLast, setPlantLast ] = useState<PlantPositionWithId | null>(null);
  const location = useLocation()
  useEffect(() => {

    if (location.pathname === "/plantas") {
      dispatch(fetchPlantPositions());
    };

  }, [dispatch, location.pathname])

  console.log("STAFF de CARGOS ", plantDTOs);


  return (
    <div className="container max-w-6xl mx-auto px-4 py-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">
          Planta de cargos
        </h2>

        <Link to={"/planta/create"} className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]"
        >
          Agregar <FaPlus />
        </Link>
      </div>
      <div
        id="scrollableDiv"
        className="w-full h-[75vh] overflow-y-auto border border-gray-200 rounded-lg shadow-sm"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#d5d8d3]">

            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider ">
                Id
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider ">
                Agente
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider ">
                Documento
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider ">
                Departamento - Cargo
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider " >
                Estado
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider " >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>

            {loading ? (
              <tr>
                <td colSpan={6} className="items-center">
                  <div className="flex justify-center items-center py-4"><Spinner></Spinner></div></td>
              </tr>
            ) : Array.isArray(plantDTOs) && plantDTOs.length > 0 ? (
              plantDTOs.map((plant, index) => (
                <tr key={index} >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">

                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-500">
                          {plant.id}
                        </div>

                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {plant.lastname}
                    </div>
                    <div className="text-sm text-gray-900">{plant.firstname}</div>

                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {plant.document}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {plant.nameSubUnit}
                    </div>
                    <div className="text-sm text-gray-900">{plant.namePosition}</div>

                  </td>



                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {plant.currentStatusID}
                    </span>
                  </td>



                                       <td className="p-6 py-4 font-medium text-gray-900 
                    dark:text-white break-words max-w-xs">
                                        <div className="grid grid-cols-2 gap-1">
                                            <Link to={`/planta/edit/${plant.id}`}>
                                                <LuFilePen size={20} />
                                            </Link>
                                            <Link to={'#'}>
                                                <LuTrash2 size={20} />
                                            </Link>
                                        </div>

                                    </td>
                </tr>


              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-3">No hay registros</td>
              </tr>
            )


            }

          </tbody>


        </table>
      </div>


    </div>
  )
}

