<template>
  <div class="iot_login_retrieve_step3">
    <a-row
      class="iot_login_retrieve_step3_content"
      type="flex"
      justify="center"
      align="middle"
    >
      <a-col :span="4" style="height: 60px"
        ><a-icon type="smile" style="font-size: 50px"
      /></a-col>
      <a-col :span="12" style="height: 25px"><p>恭喜你，密码重设成功</p></a-col>
    </a-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.iot_login_retrieve_step3 {
  margin-bottom: 50px;
  padding-top: 30px;
}
.iot_login_retrieve_step3_text {
  margin: 10px 20px;
}
.iot_login_retrieve_step3_content {
  padding-bottom: 10px;
}
</style>
