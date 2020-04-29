<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div style="padding: 20px 12px">
      <a-row>
        <a-col :span="10">
          <span style="font-weight: bold;font-size: 12px;float: left"
            >基本信息</span
          >
        </a-col>
      </a-row>
      <a-row style="margin-top: 14px">
        <a-col :span="10">
          <a-form
            :form="form"
            @submit="handleSubmit"
            layout="vertical"
            class="iot_view_usersManage_add_form"
          >
            <a-form-item
              label="手机："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              class="iot_view_usersManage_add_formItem"
            >
              <a-input
                size="small"
                v-decorator="[
                  'phoneNumber',
                  { rules: [{ required: true, message: '请输入电话号码!' }] }
                ]"
                style="float: left;text-align: left"
              />
            </a-form-item>
            <a-form-item
              label="密码："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              class="iot_view_usersManage_add_formItem"
            >
              <a-input
                size="small"
                type="password"
                v-decorator="[
                  'password',
                  { rules: [{ required: true, message: '请输入密码!' }] }
                ]"
                style="float: left;text-align: left"
              />
            </a-form-item>
            <a-form-item
              label="确认密码："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              class="iot_view_usersManage_add_formItem"
            >
              <a-input
                size="small"
                type="password"
                v-decorator="[
                  'confirmPassword',
                  { rules: [{ required: true, message: '请重复输入密码!' }] }
                ]"
                style="float: left;text-align: left"
              />
            </a-form-item>
            <a-form-item
              label="是否管理员："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              class="iot_view_usersManage_add_formItem"
            >
              <a-switch
                :checked="currentRecord.isAdmin"
                checkedChildren="是"
                unCheckedChildren="否"
                @change="stateChange"
                style="margin-left: 10px;float: left"
                v-decorator="[
                  'isAdmin',
                  { rules: [{ required: true, message: '是否管理员' }] }
                ]"
              />
            </a-form-item>
            <a-form-item
              label="姓名："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              class="iot_view_usersManage_add_formItem"
            >
              <a-input
                size="small"
                v-decorator="[
                  'username',
                  { rules: [{ required: true, message: '请输入用户姓名!' }] }
                ]"
                style="float: left;text-align: left"
              />
            </a-form-item>
            <a-form-item
              label="邮箱："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              class="iot_view_usersManage_add_formItem"
            >
              <a-input
                size="small"
                v-decorator="[
                  'email',
                  { rules: [{ required: true, message: '请输入电子邮箱!' }] }
                ]"
                style="float: left;text-align: left"
              />
            </a-form-item>

            <a-form-item
              class="iot_view_usersManage_add_formItem"
              label="备注："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
            >
              <a-textarea
                placeholder="请填写备注"
                v-decorator="['note']"
                :rows="4"
                style="float: left;text-align: left"
              />
            </a-form-item>
            <div class="iot_view_usersManage_add_button_content">
              <a-row>
                <a-col :span="14" :offset="5">
                  <a-button
                    type="primary"
                    html-type="submit"
                    :loading="commitLoading"
                    >确定</a-button
                  >
                  <a-button style="margin-left: 30px" @click="handleBack"
                    >取消</a-button
                  >
                </a-col>
              </a-row>
            </div>
          </a-form>
        </a-col>
      </a-row>
    </div>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";

export default {
  components: { ACol, ARow },
  data() {
    return {
      currentRecord: {
        isAdmin: false
      },
      commitLoading: false
    };
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "form" });
    this.form.getFieldDecorator("keys", { initialValue: [], preserve: true });
  },

  methods: {
    handleBack() {
      this.$router.push("/admin/dashboard/usersManage");
    },

    stateChange(state) {
      this.currentRecord.isAdmin = !this.currentRecord.isAdmin;
    },

    handleSubmit(e) {
      e.preventDefault();

      this.form.validateFields((err, values) => {
        if (values.confirmPassword != values.password) {
          alert("两次密码不一致，请核对");
          return;
        }

        if (!err) {
          this.commitLoading = true;
          console.log("Received values of form: ", values);

          var data = {
            username: values.username,
            password: values.password,
            email: values.email,
            isAdmin: this.currentRecord.isAdmin,
            note: values.note
          };

          this.$api.usersManage
            .addUser(data)
            .then(res => {
              if (res.status === 200) {
                this.commitLoading = false;
                this.$message.success("添加用户成功");

                var _this = this;
                setTimeout(() => {
                  _this.handleBack();
                }, 100);
              } else {
                this.$message.error(res.data.code);
                this.$message.error(res.data.error);
              }
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => {
              this.commitLoading = false;
            });
        }
      });
    }
  }
};
</script>

<style>
.iot_view_usersManage_add_formItem {
  margin-bottom: 8px;
  padding-bottom: 0px;
}
.iot_view_usersManage_add_button_content {
}
</style>
