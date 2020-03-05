<template>
  <a-layout id="components-layout-demo-top-side-2" style="min-height: 100%">
    <a-layout-header class="header">
      <Header />
    </a-layout-header>
    <a-layout style="min-height: 100%">
      <a-layout-sider
        breakpoint="lg"
        collapsedWidth="0"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
        style="background: #fff"
      >
        <a-menu
          theme="light"
          mode="inline"
          :defaultSelectedKeys="['2']"
          forceSubMenuRender="true"
          class="iot_menu_base"
        >
          <a-menu-item key="1"><a-icon type="idcard" />首页</a-menu-item>
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="hdd" />基础管理</span>
            <a-menu-item key="2">
              <router-link to="/admin/dashboard/internetServer"
                >网络服务器</router-link
              >
            </a-menu-item>
            <a-menu-item key="3">
              <router-link to="/admin/dashboard/message">消息</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="api" />网关</span>
            <a-menu-item key="4">
              <router-link to="/admin/dashboard/gatewayManage"
                >网关管理</router-link
              >
            </a-menu-item>
            <a-menu-item key="5">
              <router-link to="/admin/dashboard/iLogFlow">日志流水</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title"><a-icon type="interation" />节点</span>
            <a-menu-item key="6">
              <router-link to="/admin/dashboard/nodeManage"
                >节点管理</router-link
              >
            </a-menu-item>
            <a-menu-item key="7">
              <router-link to="/admin/dashboard/nLogFlow">日志流水</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="8">
            <router-link to="/admin/dashboard/appManage">
              <a-icon type="profile" />
              应用管理
            </router-link>
          </a-menu-item>
          <a-menu-item key="9">
            <router-link to="/admin/dashboard/usersManage">
              <a-icon type="idcard" />
              用户管理
            </router-link>
          </a-menu-item>
          <Authorized :authority="['admin']">
            <a-menu-item key="10">
              <router-link to="/admin/dashboard/iLogFlow">
                <a-icon type="user" />
                管理员管理
              </router-link>
            </a-menu-item>
          </Authorized>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <div class="iot_view_dashboard_title">
          <p style="float: left;">
            <a-icon type="home" style="padding-right: 5px" />{{ name.title }}
          </p>
        </div>
        <a-layout-content
          :style="{
            background: '#fff',
            padding: 0,
            margin: 0,
            minHeight: '280px',
            paddingLeft: '20px',
            paddingRight: '20px'
          }"
        >
          <router-view />
        </a-layout-content>
        <a-layout-footer class="footer">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import Header from "./Header";
import Footer from "./Footer";

export default {
  data() {
    return {
      collapsed: false,
      name: "",
      list: []
    };
  },
  created() {
    this.getName();
  },
  watch: {
    $route() {
      this.getName();
    }
  },
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
    getName() {
      this.$route.matched.forEach(record => this.list.push(record.meta));
      this.name = this.list.pop();
    }
  },
  components: {
    Header,
    Footer
  }
};
</script>

<style>
.iot_menu_height {
}
.header {
  background: #1c8c6b;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0;
}
.footer {
  height: 25px;
}
.iot_view_dashboard_title {
  margin-top: 10px;
  float: left;
}
.iot_menu_base {
  font-size: 14px;
}
.ant-menu-inline .ant-menu-item,
.ant-menu-inline .ant-menu-submenu-title {
  font-size: 14px;
}
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
