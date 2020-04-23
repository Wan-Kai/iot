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
        name: "dashboardInit",
        meta: { title: "首页" },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../views/Dashboard/index.vue"
          )
      },

      //组织机构
      {
        path: "/admin/dashboard/organization",
        name: "organization",
        meta: { title: "组织机构" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/admin/dashboard/organization",
            redirect: "/admin/dashboard/organization/init"
          },
          {
            path: "/admin/dashboard/organization/init",
            meta: { title: "" },
            name: "organizationInit",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/organization.vue"
              )
          },

          {
            path: "/admin/dashboard/organization/addOrganization",
            name: "addOrganization",
            meta: { title: "添加企业" },
            component: () =>
              import("../views/Dashboard/organizationBoard/addOrganization.vue")
          },
          {
            path: "/admin/dashboard/organization/check/:id",
            name: "checkOrganization",
            meta: { title: "查看企业" },
            component: () =>
              import("../views/Dashboard/organizationBoard/check.vue")
          },
          {
            path: "/admin/dashboard/organization/edit/:id",
            name: "editOrganization",
            meta: { title: "编辑企业" },
            component: () =>
              import("../views/Dashboard/organizationBoard/edit.vue")
          }
        ]
      },

      //网络服务器
      {
        path: "/admin/dashboard/networkServer",
        name: "networkServer",
        meta: { title: "网络服务器" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/admin/dashboard/networkServer",
            redirect: "/admin/dashboard/networkServer/init"
          },
          {
            path: "/admin/dashboard/networkServer/init",
            meta: { title: "" },
            name: "networkServerInit",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/networkServer.vue"
              )
          },
          {
            path: "/admin/dashboard/networkServer/addNetworkServer",
            name: "addInternetServer",
            meta: { title: "添加服务器" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/networkServerBoard/addNetworkServer.vue"
              )
          },
          {
            path: "/admin/dashboard/networkServer/check/:id",
            name: "checkNetworkServer",
            meta: { title: "查看服务器" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/networkServerBoard/check.vue"
              )
          },
          {
            path: "/admin/dashboard/networkServer/edit/:id",
            name: "editNetworkServer",
            meta: { title: "编辑服务器" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/networkServerBoard/edit.vue"
              )
          }
        ]
      },

      //服务管理
      {
        path: "/admin/dashboard/serverManage",
        name: "serverManage",
        meta: { title: "服务管理" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/admin/dashboard/serverManage",
            redirect: "/admin/dashboard/serverManage/init"
          },
          {
            path: "/admin/dashboard/serverManage/init",
            name: "serverManageInit",
            meta: { title: "" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/serverManage.vue"
              )
          },
          {
            path: "/admin/dashboard/serverManage/add",
            name: "serverManageAdd",
            meta: { title: "添加服务" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/serverManageBoard/add.vue"
              )
          },
          {
            path: "/admin/dashboard/serverManage/check",
            name: "serverManageCheck",
            meta: { title: "查看服务" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/serverManageBoard/check.vue"
              )
          },
          {
            path: "/admin/dashboard/serverManage/edit",
            name: "serverManageEdit",
            meta: { title: "编辑服务" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/serverManageBoard/edit.vue"
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
            name: "messageInit",
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
            name: "gatewayInit",
            meta: { title: "" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/gatewayManage.vue"
              )
          },
          {
            path: "/admin/dashboard/gatewayListBoard/check",
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
            name: "iLogFlowInit",
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
            name: "nodeManageInit",
            meta: { title: "" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/nodeManage.vue"
              )
          },
          {
            path: "/admin/dashboard/nodeManage/check",
            name: "checkNodeManage",
            meta: { title: "查看节点" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/nodeBoard/check.vue"
              )
          },
          {
            path: "/admin/dashboard/nodeManage/add",
            name: "addNodeManage",
            meta: { title: "添加节点" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/nodeBoard/add.vue"
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
            name: "nLogFlowInit",
            meta: { title: "" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/nLogFlow.vue"
              )
          }
        ]
      },
      {
        path: "/admin/dashboard/appManage",
        name: "appManage",
        meta: { title: "应用管理" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/admin/dashboard/appManage",
            redirect: "/admin/dashboard/appManage/init"
          },
          {
            path: "/admin/dashboard/appManage/init",
            name: "appManageInit",
            meta: { title: "" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/appManage.vue"
              )
          },
          {
            path: "/admin/dashboard/appManage/add",
            name: "addApp",
            meta: { title: "应用申请" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/appManageBoard/add.vue"
              )
          },
          {
            path: "/admin/dashboard/appManageBoard/check",
            name: "checkAppBoard",
            meta: { title: "应用查看" },
            component: { render: h => h("router-view") },
            children: [
              {
                path: "/admin/dashboard/appManageBoard/check",
                redirect: "/admin/dashboard/appManageBoard/check/init"
              },
              {
                path: "/admin/dashboard/appManageBoard/check/init",
                name: "checkApp",
                meta: { title: "" },
                component: () =>
                  import(
                    /* webpackChunkName: "dashboard" */ "../views/Dashboard/appManageBoard/check.vue"
                  )
              },
              {
                path: "/admin/dashboard/appManageBoard/check/checkNode",
                name: "checkNodeInApp",
                meta: { title: "节点查看" },
                component: () =>
                  import(
                    /* webpackChunkName: "dashboard" */ "../views/Dashboard/appManageBoard/checkNode.vue"
                  )
              },
              {
                path: "/admin/dashboard/appManageBoard/check/addNode",
                name: "addNodeInApp",
                meta: { title: "节点添加" },
                component: () =>
                  import(
                    /* webpackChunkName: "dashboard" */ "../views/Dashboard/appManageBoard/addNode.vue"
                  )
              }
            ]
          }
        ]
      },
      {
        path: "/admin/dashboard/usersManage",
        name: "usersManage",
        meta: { title: "账号管理" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/admin/dashboard/usersManage",
            redirect: "/admin/dashboard/usersManage/init"
          },
          {
            path: "/admin/dashboard/usersManage/init",
            name: "usersManageInit",
            meta: { title: "" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/usersManage.vue"
              )
          },
          {
            path: "/admin/dashboard/usersManage/add",
            name: "addUser",
            meta: { title: "账号添加" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/usersManageBoard/add.vue"
              )
          },
          {
            path: "/admin/dashboard/usersManage/check",
            name: "checkUser",
            meta: { title: "账号查看" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/usersManageBoard/check.vue"
              )
          },
          {
            path: "/admin/dashboard/usersManage/edit",
            name: "editUser",
            meta: { title: "账号编辑" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/usersManageBoard/edit.vue"
              )
          }
        ]
      },
      {
        path: "/admin/dashboard/personData",
        name: "personData",
        meta: { title: "个人资料" },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../views/Dashboard/personData.vue"
          )
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
