import { useEffect, useState } from "react";
import { RootState } from "../../features"
//import { usePositionAction } from "../../features/position/usePositionAction";
import { useAppDispatch, useAppSelector } from "../../hooks/store"
import { PositionDto } from '../../models/position.d';
import { Spinner } from "../../components/ui/Spinner";
import { fetchVacantPositions } from "../../features/position/positionThunk";

interface Props {
  getSelectedPositions: (ids: number[]) => void;
  shouldReset?: boolean;
  onResetDone: () => void;
}

export const TableOfPositions = ({ getSelectedPositions, shouldReset, onResetDone }: Props) => {

  const dispatch = useAppDispatch();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedItems, setSelectedItems] = useState<PositionDto[]>([]);

  const { positions, loading } = useAppSelector((state: RootState) => state.positions);
  // const { fetchVacantPositions } = usePositionAction();




  useEffect(() => {
    dispatch(fetchVacantPositions())

  }, []);

  useEffect(() => {
    if (shouldReset) {
      setSelectedIds([]);
      setSelectedItems([]);
      onResetDone();
    }

    console.log("VACANTE DISPONIBLE " + positions);
  }, [shouldReset, onResetDone]);



  const handleSelectedItem = (item: PositionDto, isChecked: boolean) => {

    setSelectedIds((prev) => {
      if (isChecked) {
        getSelectedPositions([...prev, item.id]);
        return [...prev, item.id];
      } else {
        return prev.filter((id) => id !== item.id)
      }
    })

    setSelectedItems((prev) => {
      if (isChecked) {

        return [...prev, item];
      } else {
        return prev.filter((it) => it.id !== item.id)
      }
    })

  }


  return (
    <div className="mt-4 ">
      <h5 className="p-2 mb-1 text-1xl font-bold  text-gray-400 dark:text-white border border-gray-200 bg-[#cddafd] rounded-t-lg">Cargos Disponibles</h5>
      <table className="min-w-full table-auto border border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 font-medium text-center">

            </th>
            <th className="p-3 font-medium text-center">
              ID Cargo
            </th>
            <th className="p-3 font-medium text-center">
              Nombre Cargo
            </th>
            <th className="p-3 font-medium text-center">
              Estado Cargo
            </th>
            <th className="p-3 font-medium text-center">
              Cantidad Puntos
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ?
            (
              <tr>
                <td colSpan={6} className="items-center">
                  <div className="flex justify-center items-center py-4"><Spinner></Spinner></div></td>
              </tr>
            )
            : Array.isArray(positions) && positions.length > 0 ? (positions.map(
              position => {
                const isChecked = selectedIds.includes(position.id);
                return (

                  <tr key={position.id}>
                    <td className="p-3 text-left">
                      <input type="checkbox"
                        checked={isChecked}
                        onChange={(e) => handleSelectedItem(position, e.target.checked)}

                        className="accent-blue-500" />
                    </td>
                    <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{position.id}</td>
                    <td className='px-6 py-4 font-medium text-gray-900 dark:text-white break-words max-w-xs'>{position.namePosition}</td>
                    <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{position.positionStatus}</td>
                    <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{ Math.floor(position.pointsAvailable * position.amountPoint / 100) } </td>

                  </tr>
                )
              }
            )) : (
              <tr>
                <td colSpan={6} className="text-center p-3">No hay registros</td>
              </tr>
            )
          }

        </tbody>
      </table>
      <h5 className="p-2 mb-1 text-1xl font-bold  text-gray-400 dark:text-white border border-gray-200 bg-[#cddafd] rounded-t-lg">Cargos disponibles Seleccionados</h5>

      <table className="min-w-full table-auto border border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>

            <th className="p-3 font-medium text-left">
              ID Cargo
            </th>
            <th className="p-3 font-medium text-left">
              Nombre Cargo
            </th>
            <th className="p-3 font-medium text-left">
              Cantidad Puntos
            </th>
          </tr>
        </thead>
        <tbody>
          {!shouldReset && selectedItems.length > 0 && selectedItems.map((item) => (
            <tr key={item.id}>
              <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{item.id}</td>
              <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{item.namePosition}</td>
              <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{Math.floor(item.pointsAvailable * item.amountPoint / 100)}</td>
            </tr>
          ))}
          {shouldReset && selectedItems.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-4">No hay ítems seleccionados.</td>
            </tr>
          )}
        </tbody>
      </table>


    </div>
  )
}

