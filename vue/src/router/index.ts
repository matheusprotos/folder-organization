import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "",
      name: "Home",
      component: () => import("../pages/home/index.vue"),
    },
    {
      path: "/orders",
      name: "Orders",
      component: () => import("../pages/my-orders/index.vue"),
    },
    {
      path: "/user/orders",
      name: "UserOrders",
      component: () => import("../pages/user-orders/index.vue"),
    },
  ],
});

export default router;
