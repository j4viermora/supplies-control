import { ref, reactive } from "vue";
import * as user from "../api/user";
import { ISession } from "../interfaces/session.interfaces";

const isOffline = import.meta.env.VITE_MODE === "offline";

console.log(isOffline);

export const useSession = () => {
  const session = reactive<ISession>({
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
  const isLoading = ref(true);

  const getSession = async () => {
    isLoading.value = true;
    try {
      if (isOffline) {
        return;
      }
      const { data } = await user.getSession();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    getSession,
    isLoading,
    session,
  };
};
