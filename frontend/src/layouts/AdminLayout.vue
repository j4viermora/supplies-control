<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <router-link :to="{ name: 'home' }">
          <a-menu-item key="1">
            <pie-chart-outlined />
            <span>Inicio</span>
          </a-menu-item>
        </router-link>

        <router-link :to="{ name: 'contacts' }">
          <a-menu-item key="2">
            <desktop-outlined />
            <span>Contactos</span>
          </a-menu-item>
        </router-link>
        <router-link :to="{ name: 'treatments' }">
          <a-menu-item key="3">
            <file-outlined />
            <span>Tratamientos</span>
          </a-menu-item>
        </router-link>

        <router-link :to="{ name: 'settings' }">
          <a-menu-item key="4">
            <file-outlined />
            <span>Configuracion</span>
          </a-menu-item>
        </router-link>
        <!-- <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>User</span>
            </span>
          </template>
          <a-menu-item key="3">Tom</a-menu-item>
          <a-menu-item key="4">Bill</a-menu-item>
          <a-menu-item key="5">Alex</a-menu-item>
        </a-sub-menu> -->
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <div
          :style="{
            padding: '24px',
            background: '#fff',
            minHeight: '100%',
            marginTop: '1rem',
          }"
        >
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        ©{{ currentYear }} by
        <a href="https://j4viermora.vercel.app" target="_blank">Javier Mora</a>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(["1"]);
const currentYear = new Date().getFullYear();
</script>
<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
