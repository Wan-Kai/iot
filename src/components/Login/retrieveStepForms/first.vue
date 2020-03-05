<template>
  <a-form class="iot_login_retrieve_step1">
    <a-form-item class="iot_login_retrieve_step1_phone">
      <a-input
        v-decorator="[
          'phoneNumber',
          {
            initialValue: phoneNumber,
            rules: [{ required: true, message: '请输入正确的手机号' }]
          }
        ]"
        placeholder="请输入手机号"
      >
        <a-icon slot="prefix" type="mobile" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <a-form-item class="iot_login_retrieve_step1_note" :layout="inline">
      <a-input
        class="iot_login_retrieve_step1_note_input"
        v-decorator="[
          'note',
          {
            initialValue: phoneNumber,
            rules: [{ required: true, message: '请输入短信验证码' }]
          }
        ]"
        placeholder="短信验证码"
      >
        <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
      </a-input>
      <a-button type="primary" class="iot_login_retrieve_step1_note_button">
        发送验证码
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {};
</script>

<style scoped>
.iot_login_retrieve_step1_phone {
  margin-top: 20px;
}
.iot_login_retrieve_step1_note_input {
  width: 70%;
  float: left;
  line-height: 30px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.iot_login_retrieve_step1_note_button {
  height: 32px;
  font-size: 12px;
  float: right;
  width: 30%;
  text-align: center;
  font-variant-position: initial;
  color: #1eaf84;
  background: transparent;
  border-color: #1eaf84;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
</style>
