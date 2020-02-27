import Vue from "vue";
import VueRouter from "vue-router";
import findLast from "lodash/findLast";
import { check, isLogin } from "../utils/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/about",
    name: "About",
    meta: { authority: ["admin", "user", "guest"] },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/",
    hideInMenu: true,
    meta: { authority: ["admin", "user", "guest"] },
    component: () =>
      import(/* webpackChunkName: "user" */ "../layouts/BlackLayout.vue"),
    children: [
      //login
      {
        path: "/",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../components/Login/loginForm.vue"
          )
      },
      {
        path: "/user/register",
        name: "register",
        hideInMenu: true,
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../components/Login/registerForm.vue"
          )
      }
    ]
  },
  {
    path: "/dashboard",
    component: () =>
      import(/* webpackChunkName: "user" */ "../layouts/BasicLayout.vue"),
    children: [
      // dashboard
      {
        path: "/dashboard",
        redirect: "/dashboard/internetServer"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          icon: "dashboard",
          title: "仪表盘",
          authority: ["admin", "user"]
        },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/internetServer",
            name: "internetServer",
            meta: { title: "网络服务器" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/internetServer.vue"
              )
          }
          // {
          //   path: "/dashboard/message",
          //   name: "message",
          //   meta: { title: "消息" },
          //   component: () =>
          //       import(
          //           /* webpackChunkName: "dashboard" */ "../views/Dashboard/message.vue"
          //           )
          // },
          // {
          //   path: "/dashboard/gatewayManage",
          //   name: "gatewayManage",
          //   meta: { title: "网关管理" },
          //   component: () =>
          //       import(
          //           /* webpackChunkName: "dashboard" */ "../views/Dashboard/gatewayManage.vue"
          //           )
          // },
          // {
          //   path: "/dashboard/iLogFlow",
          //   name: "logFlow",
          //   meta: { title: "网关日志流水" },
          //   component: () =>
          //       import(
          //           /* webpackChunkName: "dashboard" */ "../views/Dashboard/ilogFlow.vue"
          //           )
          // },
          // {
          //   path: "/dashboard/nodeManage",
          //   name: "nodeManage",
          //   meta: { title: "节点管理" },
          //   component: () =>
          //       import(
          //           /* webpackChunkName: "dashboard" */ "../views/Dashboard/nodeManage.vue"
          //           )
          // },
          // {
          //   path: "/dashboard/nLogFlow",
          //   name: "nLogFlow",
          //   meta: { title: "节点日志流水" },
          //   component: () =>
          //       import(
          //           /* webpackChunkName: "dashboard" */ "../views/Dashboard/nLogFlow.vue"
          //           )
          // },
          // {
          //   path: "/dashboard/appManage",
          //   name: "appManage",
          //   meta: { title: "应用管理" },
          //   component: () =>
          //       import(
          //           /* webpackChunkName: "dashboard" */ "../views/Dashboard/appManage.vue"
          //           )
          // },
          // {
          //   path: "/dashboard/usersManage",
          //   name: "usersManage",
          //   meta: { title: "用户管理" },
          //   component: () =>
          //       import(
          //           /* webpackChunkName: "dashboard" */ "../views/Dashboard/usersManage.vue"
          //           )
          // }
        ]
      }
    ]
  },
  {
    path: "/403",
    name: "403",
    meta: { authority: ["admin", "user", "guest"] },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Exception/403")
  },
  {
    path: "/404",
    name: "404",
    meta: { authority: ["admin", "user", "guest"] },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Exception/404")
  },
  {
    path: "/500",
    name: "500",
    meta: { authority: ["admin", "user", "guest"] },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Exception/500")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const record = findLast(to.matched, record => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (isLogin() && to.path !== "user/login") {
      next({
        path: "user/login"
      });
    } else if (to.path !== "/403") {
      next({
        path: "/403"
      });
    }
  }
  next();
});

export default router;
