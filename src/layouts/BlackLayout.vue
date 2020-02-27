<template>
  <a-layout class="login" style="min-height: 100%">
    <a-layout-header :style="{ padding: 0 }" class="iot_header_head">
      <div class="iot_header_head_logo">
        <img src="../assets/logo.png" />
      </div>
    </a-layout-header>
    <a-layout-content class="iot_login_layout_content">
      <router-view />
    </a-layout-content>
    <a-layout-footer style="textAlign: center" class="iot_basic_footer">
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
  line-height: 50px;
  height: 50px;
  padding: 0;
  box-shadow: 0px 7px 7px -7px #5e5e5e;
}
.iot_header_head_logo {
  float: left;
  padding-left: 20px;
}
.iot_login_layout_content {
  padding-top: 120px;
  background-color: #f0f0f0;
}

.iot_basic_footer {
  background-color: #f0f0f0;
}
</style>
