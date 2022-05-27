import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/BlackJack",
      name: "BlackJack",
      component: () => import("../views/BlackJackView.vue"),
    },
    {
      path: "/crazy8",
      name: "crazy8",
      component: () => import("../views/Crazy8View.vue"),
    },
  ],
});

export default router;
