<template>
  <div style="width: 100%">
    <div class="iot_searchLayout">
      <img src="../assets/logo.png" />
      <a-input-search
        placeholder="input search text"
        class="iot_search"
        @search="onSearch"
      />
    </div>
    <div class="iot_user">
      <a-avatar icon="user" class="iot_avatar" />
      <a-dropdown>
        <a class="ant-dropdown-link" style="color: white">
          userName <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;">用户详情</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">退出登录</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
.iot_searchLayout {
  float: left;
  padding-left: 20px;
}
.iot_search {
  width: 270px;
  height: 28px;
  background-color: transparent;
  color: transparent;
  horiz-align: center;
  margin-left: 15px;
}
.iot_user {
  float: right;
  padding-right: 10px;
  line-height: 50px;
}
.iot_avatar {
  margin-right: 8px;
}
</style>
