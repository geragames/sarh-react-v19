import { AppDispatch } from "..";
import { getAxiosWithAuth } from "../../hooks/useAxiosWithAuth";
import { Point } from "../../models/point";
import { setPoint, setPoints } from "./pointSlice";


export const usePointAction = () => {
  const axiosWithAuth = getAxiosWithAuth();

  const fetchPoints = () => async (dispatch: AppDispatch) => {
    try {
      const response = await axiosWithAuth.get("point/all"); //apiRequest("point/all", "GET");
      console.log("Response Point", response);
      dispatch(setPoints(response.data));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const fetchPointById = (id: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await axiosWithAuth.get(`http://localhost:8080/point/${id}`)  //apiRequest(`point/${id}`, "GET");
      console.log("Response", response);
      dispatch(setPoint(response));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const addPoint = (point: Point) => async (dispatch: AppDispatch) => {
    try {
      const response = await axiosWithAuth.post("http://localhost:8080/point/create", point);  //apiRequest("point/create", "POST", point);
      console.log(response);
      dispatch(setPoint(point));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  return { addPoint, fetchPoints, fetchPointById };
};
