import * as company from "../api/company";
import { Company } from "../interfaces/session.interfaces";

export const useCompany = () => {
  const updateCompany = async (data: Company) => {
    try {
      await company.update(data);
    } catch (err) {
      return err;
    }
  };

  return {
    updateCompany,
  };
};
