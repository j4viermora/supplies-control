import { RouteRecordRaw } from "vue-router";

// routes components
import Login from "../views/Login.vue";
import Home from "../views/app/Home.vue";
import Treatments from "../views/app/Treatments.vue";
import Settings from "../views/app/Settings.vue";
import Contacts from "../views/app/Contacts.vue";
import Items from "../views/app/Items.vue";

// layout
import AdminLayout from "../layouts/AdminLayout.vue";

export const routes: RouteRecordRaw[] = [
  {
    name: "login",
    path: "/login",
    component: Login,
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
    ],
  },
];
