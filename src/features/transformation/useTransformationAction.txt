import { AppDispatch } from "..";
import { getAxiosWithAuth } from "../../hooks/useAxiosWithAuth";
import { Transformation } from "../../models/transformation";
import {
  fetchStart,
  fetchSuccess,
  setTransformation,
  setTransformations,
} from "./transformationSlice";

export const useTransformationAction = () => {
  

  const axiosWithAuth = getAxiosWithAuth();

  const fetchTransformationLast = () => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchStart());
      const res = await axiosWithAuth.get("transformation/last");
      dispatch(setTransformation(res.data));

      dispatch(fetchSuccess(res.data));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const fetchTransformations = () => async ( dispatch: AppDispatch) => {
    try {
      dispatch(fetchStart());
      const result = await axiosWithAuth.get("transformation/all");
      dispatch(setTransformations(result.data));

      dispatch(fetchSuccess(result.data));
    } catch (error) {
      if(error instanceof Error){
        throw new Error(error.message);
      }
      
    }
  }

  const addTransformation = (transformation: Transformation) => async (dispatch: AppDispatch)  => {
    try {
      const response = await axiosWithAuth.post(
        "transformation/create",
        transformation
      );
      dispatch(setTransformations(response.data));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  return { fetchTransformationLast,fetchTransformations , addTransformation };
};
