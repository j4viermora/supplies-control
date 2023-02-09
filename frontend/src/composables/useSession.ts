import { ref } from "vue";
import { defineStore } from 'pinia'
import * as user from "../api/user";
import { ISession } from "../interfaces/session.interfaces";

const isOffline = import.meta.env.VITE_MODE === "offline";

export const useSession = defineStore('session',() => {
  const session = ref<ISession>({
    user: {
      name: "javier",
      email: "j4viermora@gmail.com",
      _id: "",
      lastName: "",
      roles: [""],
    },
    company: {
      _id: "",
      code: "",
      createdAt: "",
      owner: "",
      status: "",
      updatedAt: "",
      name: "compnay1",
      __v: 0,
    },
  });
  const loading = ref(true);
  const hasError = ref(false)

  const getSession = async () => {
    loading.value = true;
    try {
      if (isOffline) {
        return;
      }
      const { data } = await user.getSession()
      session.value = data;
      hasError.value = false
    } catch {
      hasError.value = true
    } finally {
      loading.value = false;
    }
  };

  return {
    // variables
    isLoading: loading,
    hasError,
    session,

    // functions
    getSession,   
  };
});
