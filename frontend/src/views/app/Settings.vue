<script lang="ts" setup>
import { reactive, computed } from "vue";
import { useSession } from "../../composables";
const { session } = useSession();

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

const onFinish = (values: any) => {
  console.log(formState);
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
          <a-button type="primary" html-type="submit"> Actualizar </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>
