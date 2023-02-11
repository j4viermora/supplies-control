<script lang="ts" setup>
import {
  PieChartOutlined,
  DesktopOutlined,
  FileOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";
import { useSession, useAuth } from "../composables";

const { logout } = useAuth();
const { getSession, isLoadingSession } = useSession();

getSession();

const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(["1"]);
const currentYear = new Date().getFullYear();
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <router-link :to="{ name: 'home' }">
            <pie-chart-outlined />
            <a-skeleton v-if="isLoadingSession" />
            <span v-else>Inicio</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="2">
          <router-link :to="{ name: 'contacts' }">
            <UserOutlined />
            <a-skeleton v-if="isLoadingSession" />
            <span v-else>Contactos</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link :to="{ name: 'treatments' }">
            <file-outlined />
            <a-skeleton v-if="isLoadingSession" />
            <span v-else>Consultas</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="4">
          <router-link :to="{ name: 'items' }">
            <desktop-outlined />
            <a-skeleton v-if="isLoadingSession" />
            <span v-else>Insumos</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="5">
          <router-link :to="{ name: 'settings' }">
            <SettingOutlined />
            <a-skeleton v-if="isLoadingSession" />
            <span v-else>Configuracion</span>
          </router-link>
        </a-menu-item>
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
      <a-layout-header class="custom-layout-header">
        <a-button type="primary" @click="logout">
          <template #icon>
            <LogoutOutlined />
          </template>
          Salir
        </a-button>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <div
          :style="{
            padding: '24px',
            background: '#fff',
            minHeight: '100%',
            marginTop: '1rem',
          }"
        >
          <a-spin v-if="isLoadingSession" size="large" />
          <router-view v-else></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        ©{{ currentYear }} by
        <a href="https://j4viermora.vercel.app" target="_blank">Javier Mora</a>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

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

.custom-layout-header {
  padding: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 1.5rem;
}
</style>
