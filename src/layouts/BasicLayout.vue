<template>
  <a-layout id="components-layout-demo-responsive" style="min-height: 100%">
    <a-layout-sider
      breakpoint="lg"
      collapsedWidth="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="hdd" />基础管理</span>
          <a-menu-item key="1">网络服务器</a-menu-item>
          <a-menu-item key="2">消息</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="api" />网关</span>
          <a-menu-item key="3">网关管理</a-menu-item>
          <a-menu-item key="4">日志流水</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title"><a-icon type="interation" />节点</span>
          <a-menu-item key="5">节点管理</a-menu-item>
          <a-menu-item key="6">日志流水</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="7"><a-icon type="profile" />应用管理</a-menu-item>
        <a-menu-item key="8"><a-icon type="idcard" />账号管理</a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <Header />
      </a-layout-header>

      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div
          :style="{
            padding: 0,
            background: '#fff',
            minHeight: '360px',
            minWidth: '800px'
          }"
        >
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer style="textAlign: center">
        <Footer />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import Header from "./Header";
import Footer from "./Footer";

export default {
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
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
