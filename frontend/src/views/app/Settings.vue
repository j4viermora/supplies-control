<script lang="ts" setup>
import { notification } from "ant-design-vue";
import { reactive, computed, ref } from "vue";
import { useCompany, useSession } from "../../composables";
const { session, getSession } = useSession();
const { updateCompany } = useCompany();

const isLoading = ref<boolean>(false);

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

const formState = reactive({
  name: session.company.name,
  code: session.company.code,
  owner: session.company.owner,
  lastUpdate: session.company.updatedAt,
});

const lastUpdate = computed(() => {
  return new Date(session.company.updatedAt).toLocaleDateString();
});

const onFinish = () => {
  isLoading.value = true;
  //@ts-ignore
  updateCompany({
    name: formState.name,
  })
    .then(() => {
      notification.success({
        message: "Actualizacion exitosa",
        description: "La informacion de la empresa ha sido actualizada",
      });
      getSession();
    })
    .catch((err) => {
      console.log(err);
      notification.error({
        message: "Error al actualizar",
        description: "La informacion de la empresa no ha sido actualizada",
      });
    })
    .finally(() => (isLoading.value = false));
};
</script>

<template>
  <!-- add form to update company info -->
  <a-row>
    <a-col :span="24">
      <a-divider>
        <strong>Ultima actualizacion: </strong> {{ lastUpdate }}
      </a-divider>
      <a-typography>
        <strong>Informaccion de la empresa </strong>
      </a-typography>
      <a-divider></a-divider>
      <a-form
        v-model="formState"
        v-bind="layout"
        name="settings-form"
        @submit="onFinish"
      >
        <a-form-item label="Nombre" name="name">
          <a-input v-model:value="formState.name" required />
        </a-form-item>
        <a-form-item label="Codigo" name="code">
          <a-input :value="formState.code" disabled />
        </a-form-item>
        <a-form-item label="Email" name="owner">
          <a-input :value="formState.owner" disabled />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="isLoading">
            Actualizar
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>
