import Vue from "vue";
import VueRouter from "vue-router";
import findLast from "lodash/findLast";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { check, isLogin } from "../utils/auth";
import FirstStep from "../components/Login/retrieveStepForms/first";
import SecondStep from "../components/Login/retrieveStepForms/second";
import ThirdStep from "../components/Login/retrieveStepForms/third";

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
    meta: { authority: ["admin", "user", "guest"], title: "根", icon: "home" },
    component: () =>
      import(/* webpackChunkName: "user" */ "../layouts/BlackLayout.vue"),
    children: [
      //login
      {
        path: "/",
        redirect: "/user/login"
      },
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        meta: { title: "登录" },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../components/Login/loginForm.vue"
          )
      },
      {
        path: "/user/register",
        name: "register",
        meta: { title: "注册" },
        hideInMenu: true,
        hideChildrenInMenu: true,
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../components/Login/registerForm.vue"
          )
      },
      {
        path: "/user/retrieve",
        name: "retrieve",
        meta: { title: "找回密码" },
        hideInMenu: true,
        hideChildrenInMenu: true,
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../components/Login/retrieveForm.vue"
          ),
        children: [
          {
            path: "/user/retrieve",
            redirect: "/user/retrieve/step"
          },
          {
            path: "/user/retrieve/step",
            components: {
              step1: FirstStep,
              step2: SecondStep,
              step3: ThirdStep
            }
          }
        ]
      }
    ]
  },
  {
    path: "/admin",
    meta: { title: "本地" },
    component: () =>
      import(/* webpackChunkName: "user" */ "../layouts/BasicLayout.vue"),
    children: [
      // dashboard
      {
        path: "/admin/dashboard",
        redirect: "/admin/dashboard/internetServer"
      },
      {
        path: "/admin/dashboard",
        name: "dashboard",
        meta: {
          icon: "dashboard",
          title: "控制面板",
          authority: ["admin", "user"]
        },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/admin/dashboard/internetServer",
            name: "internetServer",
            meta: { title: "网络服务器" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/internetServer.vue"
              )
          },
          {
            path: "/admin/dashboard/internetServer/addInternetServer",
            name: "addInternetServer",
            meta: { title: "添加服务器" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/addInternetServer.vue"
              )
          },
          {
            path: "/admin/dashboard/internetServer/check/:id",
            name: "checkInternetServer",
            meta: { title: "查看服务器" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/internetServerBoard/check.vue"
              )
          },
          {
            path: "/admin/dashboard/internetServer/edit/:id",
            name: "editInternetServer",
            meta: { title: "编辑服务器" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/internetServerBoard/edit.vue"
              )
          },
          {
            path: "/admin/dashboard/message",
            name: "message",
            meta: { title: "消息" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/message.vue"
              )
          },
          {
            path: "/admin/dashboard/gatewayManage",
            name: "gatewayManage",
            meta: { title: "网关管理" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/gatewayManage.vue"
              )
          }
          // {
          //   path: "/admin/dashboard/iLogFlow",
          //   name: "logFlow",
          //   meta: { title: "日志流水" },
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
          //   path: "/admin/dashboard/nLogFlow",
          //   name: "nLogFlow",
          //   meta: { title: "日志流水" },
          //   component: () =>
          //       import(
          //           /* webpackChunkName: "dashboard" */ "../views/Dashboard/nLogFlow.vue"
          //           )
          // },
          // {
          //   path: "/admin/dashboard/appManage",
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
  if (to.path !== from.path) {
    NProgress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
      console.log(11111);
    } else if (to.path !== "/403") {
      next({
        path: "/403"
      });
      console.log(22222);
    }
    NProgress.done();
    console.log(33333);
  }
  console.log(44444);
  console.log(record);
  console.log(isLogin());

  next();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
