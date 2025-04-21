import TheMainLayout from "@/layout/TheMainLayout.vue";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/404View.vue"),
  },
  {
    path: "/",
    component: TheMainLayout,
    redirect: () => ({ name: "home" }),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("../views/MainView.vue"),
      },
      {
        path: "guide",
        name: "guide",
        component: () => import("../views/GuideView.vue"),
      },
    ],
  },
];

export default routes;
