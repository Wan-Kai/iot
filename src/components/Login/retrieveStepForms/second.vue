<template>
  <a-form class="iot_login_retrieve_step2" :form="form">
    <a-form-item class="iot_login_retrieve_step1_pre_password">
      <a-input
        @change="submitOldPassword"
        v-decorator="['pre_password']"
        placeholder="请输入原密码"
      >
        <a-icon slot="prefix" type="key" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <a-form-item class="iot_login_retrieve_step1_now_password">
      <a-input
        @change="submitNewPassword"
        v-decorator="['now_password']"
        placeholder="请输入新密码"
      >
        <a-icon slot="prefix" type="key" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <a-form-item
      class="iot_login_retrieve_step1_confirm_password"
      :validate-status="confirmPass.validateStatus"
      :help="confirmPass.errorMsg"
    >
      <a-input
        @change="confirmPassword"
        placeholder="请输入确认密码"
        v-decorator="['confirm_password']"
      >
        <a-icon slot="prefix" type="key" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
  </a-form>
</template>

<script>
function validatePrimeNumber(confirmPass, temp) {
  console.log("打印如下");
  console.log(temp.newPassword);
  console.log(confirmPass);
  if (confirmPass.toString().length === 0) {
    return {
      validateStatus: "error",
      errorMsg: null
    };
  } else if (confirmPass === temp.newPassword) {
    return {
      validateStatus: "success",
      errorMsg: null
    };
  }
  return {
    validateStatus: "error",
    errorMsg: "两次输入的密码不一致！"
  };
}

export default {
  data() {
    this.form = this.$form.createForm(this, { name: "retrieve_step2" });
    return {
      confirmPass: {
        value: "",
        validateStatus: "",
        errorMsg: ""
      }
    };
  },
  methods: {
    submitOldPassword() {
      setTimeout(() => {
        this.form.validateFieldsAndScroll((err, values) => {
          this.$store.commit("retrieve/setOldPassword", {
            oldPassword: values.pre_password
          });
        });
      }, 0);
    },
    submitNewPassword() {
      setTimeout(() => {
        this.form.validateFieldsAndScroll((err, values) => {
          this.$store.commit("retrieve/setNewPassword", {
            newPassword: values.now_password
          });
        });
      }, 0);
    },
    confirmPassword(value) {
      let temp = this.$store.getters.getNewPassword;
      console.log(temp);
      setTimeout(() => {
        this.form.validateFieldsAndScroll((err, values) => {
          this.confirmPass = {
            ...validatePrimeNumber(values.confirm_password, temp),
            value
          };
          this.$store.commit("retrieve/setConfirmPassword", {
            confirmPassword: values.confirm_password
          });
        });
      });
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
