<template>
  <a-layout class="login" style="min-height: 100%;height: 100%">
    <a-layout-header class="iot_header_head">
      <div class="iot_header_head_logo">
        <img src="../assets/logo.png" />
      </div>
    </a-layout-header>
    <a-layout-content class="iot_login_layout_content">
      <router-view />
    </a-layout-content>
    <a-layout-footer style="text-align: center;background-color: #f0f0f0;">
      <Footer />
    </a-layout-footer>
  </a-layout>
</template>
<script>
import Footer from "./Footer";
export default {
  components: {
    Footer
  }
};
</script>

<style>
.login {
}
.iot_header_head {
  background: #1c8c6b;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0;
}
.iot_header_head_logo {
  float: left;
  padding-left: 20px;
}
.iot_login_layout_content {
  padding-top: 120px;
  background-color: #f0f0f0;
  height: 100%;
}
</style>
