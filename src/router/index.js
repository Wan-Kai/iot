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
    name: "local",
    meta: { title: "IOT" },
    component: () =>
      import(/* webpackChunkName: "user" */ "../layouts/BasicLayout.vue"),
    children: [
      // dashboard
      {
        path: "/admin/dashboard",
        redirect: "/admin/dashboard/init"
      },
      {
        path: "/admin/dashboard/init",
        name: "init",
        meta: { title: "首页" },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../views/Dashboard/index.vue"
          )
      },
      //网络服务器
      {
        path: "/admin/dashboard/internetServer",
        name: "internetServer",
        meta: { title: "网络服务器" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/admin/dashboard/internetServer",
            redirect: "/admin/dashboard/internetServer/init"
          },
          {
            path: "/admin/dashboard/internetServer/init",
            meta: { title: "" },
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
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/internetServerBoard/addInternetServer.vue"
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
          }
        ]
      },

      //消息
      {
        path: "/admin/dashboard/message",
        name: "message",
        meta: { title: "消息" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/admin/dashboard/message",
            redirect: "/admin/dashboard/message/init"
          },
          {
            path: "/admin/dashboard/message/init",
            meta: { title: "" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/message.vue"
              )
          }
        ]
      },

      //网关管理
      {
        path: "/admin/dashboard/gatewayManage",
        name: "gatewayManage",
        meta: { title: "网关管理" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/admin/dashboard/gatewayManage",
            redirect: "/admin/dashboard/gatewayManage/init"
          },
          {
            path: "/admin/dashboard/gatewayManage/init",
            name: "init",
            meta: { title: "" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/gatewayManage.vue"
              )
          },
          {
            path: "/admin/dashboard/gatewayListBoard/check/:number",
            name: "checkGatewayManage",
            meta: { title: "查看网关" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/gatewayListBoard/check.vue"
              )
          },
          {
            path: "/admin/dashboard/gatewayListBoard/add",
            name: "addGatewayManage",
            meta: { title: "添加网关" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/gatewayListBoard/add.vue"
              )
          }
        ]
      },

      //日志流水
      {
        path: "/admin/dashboard/iLogFlow",
        name: "logFlow",
        meta: { title: "日志流水" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/admin/dashboard/iLogFlow",
            redirect: "/admin/dashboard/iLogFlow/init"
          },
          {
            path: "/admin/dashboard/iLogFlow/init",
            name: "init",
            meta: { title: "" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/ilogFlow.vue"
              )
          }
        ]
      },
      {
        path: "/admin/dashboard/nodeManage",
        name: "nodeManage",
        meta: { title: "节点管理" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/admin/dashboard/nodeManage",
            redirect: "/admin/dashboard/nodeManage/init"
          },
          {
            path: "/admin/dashboard/nodeManage/init",
            name: "init",
            meta: { title: "" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/nodeManage.vue"
              )
          },
          {
            path: "/admin/dashboard/nodeManage/check/:number",
            name: "checkNodeManage",
            meta: { title: "查看节点" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/nodeBoard/check.vue"
              )
          }
        ]
      },
      {
        path: "/admin/dashboard/nLogFlow",
        name: "nLogFlow",
        meta: { title: "日志流水" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/admin/dashboard/nLogFlow",
            redirect: "/admin/dashboard/nLogFlow/init"
          },
          {
            path: "/admin/dashboard/nLogFlow/init",
            name: "init",
            meta: { title: "" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/nLogFlow.vue"
              )
          }
        ]
      }
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
    } else if (to.path !== "/403") {
      next({
        path: "/403"
      });
    }
    NProgress.done();
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
