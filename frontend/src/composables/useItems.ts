import { defineStore } from "pinia";
import { ref } from "vue";
import * as items from "../api/items";
import { IMetaData } from "../interfaces";
import { Item } from "../interfaces/items.interfaces";

export const useItems = defineStore("items", () => {
  type ItemState = {
    docs: Item[];
    metadata: IMetaData;
  };

  const itemsState = ref<ItemState>({
    docs: [],
    metadata: {
      totalDocs: 0,
      limit: 0,
      totalPages: 0,
      page: 0,
      pagingCounter: 0,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: 0,
      nextPage: 0,
      offset: 0,
    },
  });

  const isLoading = ref<boolean>(false);

  const setLoading = () => {
    isLoading.value = true;
  };
  const clearLoading = () => {
    isLoading.value = false;
  };

  const addItems = async (item: {
    name: string;
    quantity: number;
    description: string;
    brand: string;
  }) => {
    try {
      await items.add({
        ...item,
      });
    } catch {
      return {
        message: "Error adding item",
      };
    }
  };

  const getAll = async () => {
    setLoading();
    try {
      const { data } = await items.get();
      const { docs, ...metadata } = data;
      itemsState.value.docs = docs;
      itemsState.value.metadata = metadata;
    } catch {
      return {
        message: "Error getting items",
      };
    } finally {
      clearLoading();
    }
  };

  const remove = async (id: string) => {
    setLoading();
    try {
      await items.remove(id);
    } catch {
      return {
        message: "Error removing item",
      };
    } finally {
      clearLoading();
    }
  };

  const getOne = async (id: string) => {
    try {
      const { data } = await items.getOne(id);
      return data;
    } catch {
      return {
        message: "Error al optener la informacion del item",
      };
    }
  };

  const update = async (id: string, item: Item) => {
    try {
      await items.update(id, item);
    } catch {
      return {
        message: "Error al actualizar el item",
      };
    }
  };

  return {
    //properties
    items: itemsState,
    isLoading,

    // functions
    remove,
    addItems,
    update,
    getAll,
    setLoading,
    clearLoading,
    getOne,
  };
});
