import { RouteRecord, RouteRecordRaw } from 'vue-router'

import Login from '../views/Login.vue'

export const routes: RouteRecordRaw[] = [{
    name: 'login',
    path: '/login',
    component: Login
}]