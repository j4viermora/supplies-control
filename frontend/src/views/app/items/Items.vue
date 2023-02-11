<script setup lang="ts">
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { onMounted } from "vue";
import { notification } from 'ant-design-vue'
import { useItems } from "../../../composables";

const items = useItems()

onMounted(() => {
 items.getAll();
});

const confirm = (id: string) => {
  items.setLoading()
  items.remove(id)
  .then(
    () => {
      notification.success({
        message: 'Producto eliminado',
        description: 'El producto ha sido eliminado correctamente'
      })
      items.getAll()
    }
  )
  .catch(() => {
    notification.error({
      message: 'Error al eliminar el producto',
      description: 'Ha ocurrido un error al eliminar el producto'
    })
  })
  .finally(() => {
    items.clearLoading()
  })
};

const cancel = () => {
  console.log("cancel");
};
</script>
<template>
  <a-row>
    <a-col :span="10">
      <a-typography-title :level="3">Insumos</a-typography-title>
    </a-col>
    <a-col>
      <RouterLink :to="{ name: 'item-register' }">
        <a-button type="primary">Registar producto</a-button>
      </RouterLink>
    </a-col>
  </a-row>
  <a-divider />
  <a-row>
   Total de items: {{ items.items.metadata.totalDocs }}
  </a-row>
  <a-divider/>
  <a-row :gutter="16" type="flex">
    <a-spin v-if="items.isLoading" />
    <a-col v-else v-for="item  in items.items.docs" :key="item._id" :xs="{ span: 24 }" :md="{span: 6}">
      <a-card type="inner" :title="item.name" hoverable>
        <p><strong>Detalles:</strong> {{ item.description }}</p>
        <p><strong>Stock:</strong> {{ item.quantity }}</p>
        <p><strong>Marca:</strong> {{ item.brand }}</p>
        <template #actions>
          <router-link :to="{ name: 'item-edit', params: { id: item._id } }">
            <edit-outlined />
          </router-link>
          <a-popconfirm
            title="Esta seguro que desea eliminar este producto?"
            ok-text="Si"
            cancel-text="No"
            @confirm="confirm(item._id)"
            @cancel="cancel"
          >
            <DeleteOutlined />
          </a-popconfirm>
        </template>
      </a-card>
    </a-col>
  </a-row>
</template>
