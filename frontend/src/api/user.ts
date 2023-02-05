import { fetchApi } from "../config/axios";

import { ISession } from "../interfaces/session.interfaces";

export const getSession = async () => {
  return fetchApi.get<ISession>("users/user/self");
};
