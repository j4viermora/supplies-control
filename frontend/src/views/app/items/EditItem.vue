<template>
  <a-breadcrumb>
    <a-breadcrumb-item>
      <router-link :to="{ name: 'items' }">Insumos</router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item>Editar insumo</a-breadcrumb-item>
  </a-breadcrumb>
  <a-divider />
  <a-row>
    <a-typography-title :level="3">Actualizar item</a-typography-title>
  </a-row>
  <a-divider />
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
          <a-textarea v-model:value="formState.description" />
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
            >Actualizar</a-button
          >
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { notification } from "ant-design-vue";
import { useItems } from "../../../composables";

const isLoading = ref(false);
const route = useRoute();
const router = useRouter();

const formState = reactive({
  name: "",
  quantity: undefined,
  brand: "",
  description: "",
});

const { update, getOne } = useItems();

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

const onFinish = (values: any) => {
  isLoading.value = true;
  update(String(route.params.id), values)
    .then(() => {
      notification.success({
        message: "Item actualizado",
        description: "El item se ha actualizado correctamente",
      });
      router.push({ name: "items" });
    })
    .catch(() => {
      notification.error({
        message: "Error al actualizar el item",
        description: "Ha ocurrido un error al actualizar el item",
      });
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const getInfoItem = (itemId: any) => {
  isLoading.value = true;
  getOne(itemId)
    .then((resp) => {
      formState.name = resp.name;
      formState.quantity = resp.quantity;
      formState.brand = resp.brand;
      formState.description = resp.description;
    })
    .catch(() => {
      notification.error({
        message: "Error al obtener el item",
        description: "Ha ocurrido un error al obtener el item",
      });
    })
    .finally(() => {
      isLoading.value = false;
    });
};

onMounted(() => {
  getInfoItem(route.params.id);
});
</script>
