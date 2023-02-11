import { reactive } from "vue";
import * as treatments from "../api/treatments";
import { IMetaData } from "../interfaces";
import { ITreatment } from "../interfaces/treatments.interfaces";

interface InitialState {
  isLoading: boolean;
  treatments: ITreatment[];
  metadata: IMetaData;
}

export const useTreatments = () => {
  const state = reactive<InitialState>({
    isLoading: false,
    treatments: [],
    metadata: {
      limit: 0,
      page: 0,
      hasNextPage: false,
      hasPrevPage: false,
      nextPage: 0,
      prevPage: 0,
      offset: 0,
      pagingCounter: 0,
      totalDocs: 0,
      totalPages: 0,
    },
  });

  const add = async (data: ITreatment) => {
    try {
      await treatments.add(data);
    } catch (err) {
      return err;
    }
  };

  const getAll = async () => {
    try {
      const { data } = await treatments.getAll();
      const { docs, ...metadata } = data;
      state.treatments = data;
      state.metadata = metadata;
      return data;
    } catch (err) {
      return err;
    }
  };

  const update = () => {};
  const remove = () => {};
  const getOne = () => {};

  return {
    add,
    getAll,
    update,
    remove,
    getOne,
    data: state.treatments,
    metadata: state.metadata,
  };
};
