import { fetchApi } from "../config/axios";
import { ITreatment } from "../interfaces/treatments.interfaces";

export const add = async (data: ITreatment) => {
  return fetchApi.post("/treatments", { ...data });
};

export const remove = async () => {};
export const update = async () => {};
export const get = async () => {};
export const getAll = async () => {
  return fetchApi.get("/treatments");
};
