import { Button } from "./Button";


type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  mergeWith?: keyof T; // columna con la que se une
  mergeRender?: (
    value1: T[keyof T],
    value2: T[keyof T]
  ) => React.ReactNode;
  isActionColumn?: boolean
};
interface TableProps<T> extends React.TableHTMLAttributes<HTMLTableElement> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}



export function Table<T extends object>({
  columns,
  data,
  className = "",
  onEdit,
  onDelete,
  ...props
}: TableProps<T>) {
  return (

    <table
      {...props}
      className={`table-auto divide-y divide-gray-200 ${className}`}
    >
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => {
            // Si esta columna es "secundaria" (alguien la une), no mostramos encabezado
            const isMergedAsSecondary = columns.some(
              (c) => c.mergeWith === col.key
            );
            if (isMergedAsSecondary) return null;

            return (
              <th scope="col"
                key={String(col.key)}
                className="px-6 py-3 text-left font-medium text-gray-700 border-b border-gray-200"
              >
                {col.header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-50 transition-colors"
            >
              {columns.map((col) => {
                // Si esta columna es secundaria, no la mostramos
                const isMergedAsSecondary = columns.some(
                  (c) => c.mergeWith === col.key
                );
                if (isMergedAsSecondary) return null;

                if (col.isActionColumn) {
                  return (
                    <td key={`actions-${rowIndex}`}
                      className="px-4 py-2 border-b border-gray-200 space-x-2"
                    >
                      <Button onClick={() => onEdit?.(row)} className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </Button>
                      <Button onClick={() => onDelete?.(row)} className="ml-2 text-red-600 hover:text-red-900">
                        Delete
                      </Button>

                    </td>
                  )
                }

                // Si esta columna une con otra
                if (col.mergeWith) {
                  const value1 = row[col.key];
                  const value2 = row[col.mergeWith];
                  return (
                    <td
                      key={String(col.key)}
                      className="px-4 py-2 border-b border-gray-200"
                    >
                      {col.mergeRender
                        ? col.mergeRender(value1, value2)
                        : `${String(value1 ?? "")} ${String(value2 ?? "")}`}
                    </td>
                  );
                }

                // Columna normal
                return (
                  <td
                    key={String(col.key)}
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? "")}
                  </td>
                );
              })}
              { }
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={columns.length}
              className="px-4 py-6 text-center text-gray-500"
            >
              No hay datos disponibles
            </td>
          </tr>
        )}
      </tbody>
    </table>

  );
}