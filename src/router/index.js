import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  // mode:'history',
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: () => import("@/layout/index.vue"),
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("@/views/home"),
        },
        {
          path: "/films",
          name: "g-films",
          component: () => import("@/views/films"),
        },
        {
          path: "/billboard",
          name: "g-billboard",
          component: () => import("@/views/billboard"),
        },
        {
          path: "/cinema",
          name: "g-cniema",
          component: () => import("@/views/cinema"),
        },
        {
          path: "/hotspot",
          name: "hot-post",
          component: () => import("@/views/hotspot"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login"),
    },
    {
      path: "/evaluation",
      name: "evaluation",
      component: () => import("@/views/evaluation"),
    },
  ],
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};
export default router;
