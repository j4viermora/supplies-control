import { fetchApi } from "../config/axios";
import { Company } from "../interfaces/session.interfaces";

export const update = async (data: Company) => {
  const resp = fetchApi.patch("/companies", data);

  return resp;
};
