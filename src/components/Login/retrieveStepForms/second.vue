<template>
  <a-form class="iot_login_retrieve_step2">
    <a-form-item class="iot_login_retrieve_step1_pre_password">
      <a-input
        v-decorator="[
          'pre_password',
          {
            initialValue: pre_password,
            rules: [{ required: true, message: '请输入原密码' }]
          }
        ]"
        placeholder="请输入原密码"
      >
        <a-icon slot="prefix" type="key" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <a-form-item class="iot_login_retrieve_step1_now_password">
      <a-input
        v-decorator="[
          'now_password',
          {
            initialValue: now_password,
            rules: [{ required: true, message: '请输入新密码' }]
          }
        ]"
        placeholder="请输入新密码"
      >
        <a-icon slot="prefix" type="key" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <a-form-item class="iot_login_retrieve_step1_confirm_password">
      <a-input
        v-decorator="[
          'confirm_password',
          {
            initialValue: confirm_password,
            rules: [{ required: true, message: '请输入确认密码' }]
          }
        ]"
        placeholder="请输入确认密码"
      >
        <a-icon slot="prefix" type="key" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
  </a-form>
</template>

<script>
export default {};
</script>

<style scoped>
.iot_login_retrieve_step1_pre_password {
  margin-bottom: 10px;
}
.iot_login_retrieve_step1_now_password {
  margin-bottom: 10px;
}
.iot_login_retrieve_step1_confirm_password {
  margin-bottom: 15px;
}
</style>
