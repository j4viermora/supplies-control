<template>
  <div class="container">
    <section>
      <a-alert v-if="isError" message="Clave o email erroneos" type="error" />
      <a-divider v-if="isError" />
      <a-card title="Inicio de sesión">
        <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            label="Email"
            name="email"
            :rules="[
              { required: true, message: 'Por favor ingresa tu correo!' },
            ]"
          >
            <a-input v-model:value="formState.email" />
          </a-form-item>

          <a-form-item
            label="Password"
            name="password"
            :rules="[
              { required: true, message: 'Por favor ingresa tu clave!' },
            ]"
          >
            <a-input-password v-model:value="formState.password" />
          </a-form-item>
          <!-- 
          <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
            <a-checkbox v-model:checked="formState.remember"
              >Recuerdame</a-checkbox
            >
          </a-form-item> -->

          <a-form-item>
             <RouterLink :to="{ name: 'register' }"> Registrate</RouterLink>
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit" :loading="isLoading"
              >Iniciar sesion</a-button
            >
          </a-form-item>
        </a-form>
      </a-card>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { useAuth } from "../../composables";
import { Login } from "../../interfaces/auth.interfaces";

const { isLoading, login, isError } = useAuth();

interface FormState {
  email: string;
  password: string;
  // remember: boolean;
}
const formState = reactive<FormState>({
  email: "",
  password: "",
  // remember: true,
});
const onFinish = (values: Login) => {
  login(values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>
<style scoped>
.container {
  display: grid;
  place-items: center;
  height: 100vh;
  widows: 100vh;
}
</style>
