
import Dashboard from "../components/Home/Dashboard/Dashboard.vue"
import Login from "../components/Home/Login/Login.vue"
import Notfound from "../components/Notfound.vue"
import Register from "../components/Home/Register/Register.vue"
import ForgotPassword from "../components/Home/ForgotPassword/ForgotPassword.vue"

import { createWebHistory, createRouter } from "vue-router";


const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/:catchAll(.*)",
    component: Notfound,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
