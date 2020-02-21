<template>
  <a-layout-sider class="sider">
    <div class="logo" />
    <a-menu
      theme="light"
      mode="inline"
      :defaultSelectedKeys="['1']"
      :style="{ height: '100%', borderRight: 0 }"
    >
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="hdd" />基础管理</span>
        <a-menu-item key="1"><a-icon type="hdd" />网络服务器</a-menu-item>
        <a-menu-item key="2"><a-icon type="hdd" />消息</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="laptop" />网关</span>
        <a-menu-item key="3"><a-icon type="hdd" />网关管理</a-menu-item>
        <a-menu-item key="4"><a-icon type="hdd" />日志流水</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <span slot="title"><a-icon type="notification" />节点</span>
        <a-menu-item key="5"><a-icon type="hdd" />节点管理</a-menu-item>
        <a-menu-item key="6"><a-icon type="hdd" />日志流水</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="7"><a-icon type="notification" />应用管理</a-menu-item>
      <a-menu-item key="8"><a-icon type="notification" />账号管理</a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import ALayoutSider from "ant-design-vue/es/layout/Sider";
export default {
  name: "SiderMenu",
  components: { ALayoutSider }
};
</script>

<style scoped></style>
