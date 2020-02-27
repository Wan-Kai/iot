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
        <a-menu theme="light" mode="inline" :defaultSelectedKeys="['1']">
          <a-menu-item key="1"><a-icon type="idcard" />首页</a-menu-item>
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="hdd" />基础管理</span>
            <a-menu-item key="2">网络服务器</a-menu-item>
            <a-menu-item key="3">消息</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="api" />网关</span>
            <a-menu-item key="4">网关管理</a-menu-item>
            <a-menu-item key="5">日志流水</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title"><a-icon type="interation" />节点</span>
            <a-menu-item key="6">节点管理</a-menu-item>
            <a-menu-item key="7">日志流水</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="8"><a-icon type="profile" />应用管理</a-menu-item>
          <a-menu-item key="9"><a-icon type="idcard" />账号管理</a-menu-item>
          <Authorized :authority="['admin']">
            <a-menu-item key="10"><a-icon type="user" />管理员管理</a-menu-item>
          </Authorized>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px'
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
      collapsed: false
    };
  },
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    }
  },
  components: {
    Header,
    Footer
  }
};
</script>

<style>
.header {
  background: rgba(28, 140, 107, 3);
  width: 100%;
  height: 55px;
  line-height: 55px;
  padding: 0;
}
.footer {
  height: 25px;
  text-align: center;
}
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
