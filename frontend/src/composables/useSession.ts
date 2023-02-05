import { ref, reactive } from "vue";
import * as user from "../api/user";

export const useSession = () => {
  const session = reactive({
    user: {
      id: "1",
      name: "javier",
    },
    company: {
      name: "compnay1",
      id: "1",
    },
  });
  const isLoading = ref(true);

  const getSession = async () => {
    isLoading.value = true;
    const { data } = await user.getSession();
    console.log(data);
    isLoading.value = false;
  };

  return {
    getSession,
    isLoading,
    session,
  };
};
