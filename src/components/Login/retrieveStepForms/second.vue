<template>
  <a-form class="iot_login_retrieve_step2" :form="form">
    <a-form-item class="iot_login_retrieve_step1_pre_password">
      <a-input
        style="text-align: left"
        @change="submitOldPassword"
        v-decorator="[
          'pre_password',
          {
            rules: [{ required: true, message: '请输入旧密码' }]
          }
        ]"
        placeholder="请输入原密码"
      >
        <a-icon slot="prefix" type="key" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <a-form-item class="iot_login_retrieve_step1_now_password">
      <a-input
        style="text-align: left"
        @change="submitNewPassword"
        v-decorator="[
          'now_password',
          {
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
        placeholder="请确认密码"
        style="text-align: left"
        v-decorator="[
          'confirm_password',
          {
            rules: [
              { required: true, message: '错误' },
              { validator: handleConfirmPass }
            ]
          }
        ]"
      >
        <a-icon slot="prefix" type="key" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
  </a-form>
</template>

<script>
import {
  setOldPassword,
  setNewPassword,
  setConfirmPassword
} from "@/utils/util";
export default {
  data() {
    this.form = this.$form.createForm(this, { name: "retrieve_step2" });
    return {
      confirmPass: {
        value: "",
        validateStatus: "",
        errorMsg: ""
      },
      newPassword: ""
    };
  },
  methods: {
    submitOldPassword() {
      setTimeout(() => {
        setOldPassword(this.form.getFieldValue("pre_password"));
      }, 0);
    },
    submitNewPassword() {
      setTimeout(() => {
        setNewPassword(this.form.getFieldValue("now_password"));
        this.newPassword = this.form.getFieldValue("now_password");
      }, 0);
    },
    handleConfirmPass(rule, value, callback) {
      console.log(this.newPassword);
      if (this.newPassword === value) {
        setConfirmPassword(value);
        callback();
      }
      callback("两次输入的密码不一致！");
    }
  }
};
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
