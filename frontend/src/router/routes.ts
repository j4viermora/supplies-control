import { RouteRecordRaw } from "vue-router";

// routes components
import Login from "../views/auth/Login.vue";
import Register from '../views/auth/Register.vue'

import Home from "../views/app/Home.vue";
import Treatments from "../views/app/Treatments.vue";
import Settings from "../views/app/Settings.vue";
import Contacts from "../views/app/Contacts.vue";

//items
import Items from "../views/app/Items.vue";
import ItemsRegister from "../views/app/items/ItemsRegister.vue";

// layout
import AdminLayout from "../layouts/AdminLayout.vue";

export const routes: RouteRecordRaw[] = [
  {
    name: "login",
    path: "/login",
    component: Login,
  },
  {
    name:'register',
    path: '/register',
    component: Register
  },
  {
    name: "app",
    path: "/app",
    component: AdminLayout,
    children: [
      {
        name: "home",
        path: "",
        component: Home,
      },
      {
        name: "treatments",
        path: "treatments",
        component: Treatments,
      },
      {
        name: "settings",
        path: "settings",
        component: Settings,
      },
      {
        name: "contacts",
        path: "contacts",
        component: Contacts,
      },
      {
        name: "items",
        path: "items",
        component: Items,
      },
      {
        name: 'item-register',
        path: 'items/add',
        component: ItemsRegister
      }
    ],
  },
];
