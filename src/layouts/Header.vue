<template>
  <div>
    <div class="ava">
      <a-avatar icon="user" />
      <a-dropdown>
        <a class="ant-dropdown-link"> userName <a-icon type="down" /> </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
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
.ava {
  float: right;
  padding-right: 10px;
}
</style>
