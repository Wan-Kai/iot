<template>
  <a-card
    class="loginForm"
    :style="{
      padding: 0
    }"
  >
    <div class="iot_login_layout_text">
      <a class="iot_login_layout_text_content">登录</a>
    </div>
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
    >
      <a-form-item class="iot_userNameForm">
        <a-input
          v-decorator="[
            'username',
            {
              initialValue: username,
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            }
          ]"
          placeholder="Username"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              initialValue: password,
              rules: [
                { required: true, message: 'Please input your password!' }
              ]
            }
          ]"
          type="password"
          placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          @click="handleSubmit"
          class="login-form-button"
        >
          Log in
        </a-button>
        <div class="iot_userNameForm_item_layout">
          <a href="" class="iot_userNameForm_item_forget">
            忘记密码
          </a>
          <div class="iot_userNameForm_item_register">
            没有账号，
            <a href="" class="iot_userNameForm_item_register_text">
              注册一个
            </a>
          </div>
        </div>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import API from "../../utils/api";

export default {
  data() {
    this.form = this.$form.createForm(this);
    return {
      username: "123",
      password: ""
    };
  },
  methods: {
    handleSubmit() {
      this.form.validateFields((err, value) => {
        if (!err) {
          console.log(value);
          API.login.login(value).then(res => {
            this.$message.success("登录成功");
            this.$store.commit("login/setUser", {
              username: res.data.admin[0]["username"],
              isLogin: res.data.admin[0]["isLogin"],
              userId: res.data.admin[0]["userId"],
              sessionKey: res.data.admin[0]["sessionKey"]
            });
          });
          setTimeout(() => {
            this.$router.replace("/dashboard");
          }, 800);
        } else {
          console.log("Login Form in wrong");
          this.$message.error("登录失败!");
        }
      });
    }
  }
};
</script>
<style>
.loginForm {
  margin: auto;
  width: 400px;
  height: 290px;
}
.iot_login_layout_text {
  height: 40px;
  text-align: center;
  color: black;
  font-size: 20px;
  margin-bottom: 8px;
}
.iot_login_layout_text_content {
  color: grey;
  letter-spacing: 2px;
}
.iot_userNameForm {
  margin-bottom: 8px;
}
.iot_userNameForm_item_layout {
  margin-top: 10px;
}
.iot_userNameForm_item_forget {
  float: left;
  color: #1eaf84;
}
.iot_userNameForm_item_register {
  float: right;
}
.iot_userNameForm_item_register_text {
  color: #1eaf84;
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
  background: #1eaf84;
  border-radius: 1px;
  border-color: #1eaf84;
}
</style>
