<script setup lang="ts">
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";

const itemsData = [
  {
    _id: "63e53592e3014cf0ca7525c4",
    name: "guantes",
    description: "some description",
    quantity: 10,
    brand: "marca guantes",
    companyId: "63dfedd0ba4a43c056a1e2c1",
    status: "active",
    createdAt: "2023-02-09T18:04:02.762Z",
    updatedAt: "2023-02-09T18:04:02.762Z",
    __v: 0,
  },
  {
    _id: "63e535acdc520a77ec6506d3",
    name: "guantes",
    description: "some description",
    quantity: 10,
    brand: "marca guantes",
    companyId: "63dfedd0ba4a43c056a1e2c1",
    status: "active",
    createdAt: "2023-02-09T18:04:28.683Z",
    updatedAt: "2023-02-09T18:04:28.683Z",
    __v: 0,
  },
];

const confirm = () => {
  console.log("confirm");
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
  <a-row :gutter="16">
    <a-col v-for="item in itemsData" :key="item._id" :span="6">
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
            @confirm="confirm"
            @cancel="cancel"
          >
            <DeleteOutlined />
          </a-popconfirm>
        </template>
      </a-card>
    </a-col>
  </a-row>
</template>
