import { ref } from "vue";
import * as auth from "../api/auth";
import { Login } from "../interfaces/auth.interfaces";

export const useAuth = () => {
  const isError = ref(false);
  const isLoading = ref(false);

  const login = async (body: Login) => {
    isLoading.value = true;
    try {
      const resp = await auth.login({
        email: body.email,
        password: body.password,
      });
      const { data } = resp;
      localStorage.setItem("auth-token", data.token);
      localStorage.setItem("last-login", new Date().toISOString());
      isError.value = false;
      window.location.href = "/#/app";
    } catch (error) {
      isError.value = true;
      return error;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("last-login");
    window.location.href = "/#/login";
  };

  return {
    login,
    logout,
    isError,
    isLoading,
  };
};
