<template>
  <a-breadcrumb>
    <a-breadcrumb-item>
      <router-link :to="{ name: 'items' }">Insumos</router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item>Registar insumos</a-breadcrumb-item>
  </a-breadcrumb>
  <a-divider/>
  <a-row>
    <a-typography-title :level="3">Agregar item</a-typography-title>
  </a-row>
  <a-divider/>
  <a-row>
    <a-col :span="24">
      <a-form
        :model="formState"
        v-bind="layout"
        name="nest-messages"
        :validate-messages="validateMessages"
        @finish="onFinish"
      >
        <a-form-item
          :name="'name'"
          label="Nombre"
          :rules="[{ required: true }]"
        >
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item :name="'description'" label="Descripción">
          <a-input v-model:value="formState.description" />
        </a-form-item>
        <a-form-item
          :name="'quantity'"
          label="Stock"
          :rules="[{ type: 'number', min: 0, max: 1000, required: true }]"
        >
          <a-input-number v-model:value="formState.quantity" />
        </a-form-item>
        <a-form-item
          :name="'brand'"
          label="Marca"
          :rules="[{ required: true }]"
        >
          <a-input v-model:value="formState.brand" />
        </a-form-item>
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
          <a-button type="primary" html-type="submit" :loading="isLoading"
            >Registrar</a-button
          >
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { notification } from "ant-design-vue";
import { useItems } from "../../../composables";

const isLoading = ref(false);
const { addItems } = useItems();

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const formState = reactive({
  name: "",
  quantity: undefined,
  brand: "",
  description: "",
});

const resetForm = () => {
  formState.name = "";
  formState.quantity = undefined;
  formState.brand = "";
  formState.description = "";
};

const onFinish = (values: any) => {
  isLoading.value = true;
  addItems(values)
    .then((resp) => {
      console.log(resp);
      notification.success({
        message: "Item registrado",
        description: "El item se ha registrado correctamente",
      });
      resetForm();
    })
    .catch(() => {
      notification.error({
        message: "Error al registrar",
        description: "Ha ocurrido un error al registrar el item",
      });
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
