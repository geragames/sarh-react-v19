import axiosWithAuth from "../../api/api.axios";
import { PlantFilter } from "../../models/plantFilter";

export const downloadExcel = async (filter: PlantFilter) => {
  try {
    const response = await axiosWithAuth.post(
      "/plant/report/excel",
      filter,

      {
        responseType: "blob",
        headers: {
          Accept:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      }
    );

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "plantas.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error al descargar Excel:", error);
  }
};
