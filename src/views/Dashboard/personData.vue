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
            :form="edit_form"
            @submit="handleSubmit"
            layout="vertical"
            class="iot_view_person_add_form"
          >
            <a-form-item
              class="iot_view_person_add_formitem"
              label="手机号码："
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-input
                v-decorator="[
                  'phoneNumber',
                  {
                    initialValue: this.returnedData.phonenumber,
                    rules: [{ required: true, message: '请输入电话号码!' }]
                  }
                ]"
                size="small"
                style="width: 90%;float: left;text-align: left"
              />
            </a-form-item>
            <a-form-item
              class="iot_view_person_add_formitem"
              label="姓名："
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-input
                v-decorator="[
                  'username',
                  {
                    initialValue: returnedData.username,
                    rules: [{ required: true, message: '请输入用户姓名!' }]
                  }
                ]"
                size="small"
                style="width: 100%;float: left;text-align: left"
              />
            </a-form-item>
            <a-form-item
              class="iot_view_person_add_formitem"
              label="邮箱："
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-input
                size="small"
                v-decorator="[
                  'email',
                  {
                    initialValue: returnedData.email,
                    rules: [{ required: true, message: '请输入电子邮箱!' }]
                  }
                ]"
                style="float: left;text-align: left"
              />
            </a-form-item>

            <a-form-item
              class="iot_view_person_add_formitem"
              label="备注："
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-textarea
                placeholder="请填写备注"
                v-decorator="[
                  'note',
                  {
                    initialValue: returnedData.note,
                    rules: [{ required: false, message: '请输入备注!' }]
                  }
                ]"
                :rows="4"
                style="float: left;text-align: left"
              />
            </a-form-item>
            <a-form-item
              class="iot_view_person_add_formitem"
              label="角色："
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 12 }"
            >
              <p style="text-align: left">{{ this.getRole }}</p>
            </a-form-item>
            <a-row>
              <a-col :span="12" :offset="6">
                <div class="iot_view_person_add_button_content">
                  <a-button
                    type="primary"
                    html-type="submit"
                    :loading="commitLoading"
                    >确定</a-button
                  >
                  <a-button style="margin: 0 20px" @click="changePassword"
                    >修改密码</a-button
                  >
                </div>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
      </a-row>
      <a-modal
        v-model="isShowModalOfChangePassword"
        title="密码修改"
        onOk="changePasswordOk"
      >
        <template slot="footer">
          <a-button key="confirm" style="margin-right: 20px">确认</a-button>
          <a-button key="back" @click="handleCancel">关闭</a-button>
        </template>
        <a-form
          :form="password_form"
          @submit="changePasswordOk"
          layout="vertical"
          class="iot_view_person_add_form_pop"
        >
          <a-form-item class="iot_view_person_add_formitem_pop">
            <a-input
              v-decorator="['newPsw']"
              style="width: 100%;text-align: left"
              placeholder="请输入新密码"
            >
              <a-icon slot="prefix" type="key" />
            </a-input>
          </a-form-item>
          <a-form-item class="iot_view_person_add_formitem_pop">
            <a-input
              icon="password"
              v-decorator="['confirmPsw']"
              style="width: 100%;text-align: left"
              placeholder="请确认新密码"
            >
              <a-icon slot="prefix" type="key" />
            </a-input>
          </a-form-item>
        </a-form>
      </a-modal>
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
      returnedData: {
        id: "",
        username: "",
        isAdmin: false,
        isActive: false,

        phonenumber: "",
        email: "",
        note: "",

        createdAt: "",
        updatedAt: ""
      },

      commitLoading: false,
      isShowModalOfChangePassword: false
    };
  },

  computed: {
    getRole() {
      if (this.returnedData.isAdmin) return "管理员";
      else return "一般用户";
    }
  },

  beforeCreate() {
    this.edit_form = this.$form.createForm(this, {
      name: "edit_form"
    });
    this.edit_form.getFieldDecorator("keys", {
      initialValue: [],
      preserve: true
    });

    this.password_form = this.$form.createForm(this, {
      name: "password_form"
    });
    this.password_form.getFieldDecorator("keys", {
      initialValue: [],
      preserve: true
    });
  },

  beforeMount() {
    var currentUser = this.common.getCurrentUser();
    this.returnedData.id = currentUser.id;

    this.getDetail();
    /*
    this.returnedData.username = currentUser.username;
    this.returnedData.email = currentUser.email;
    this.returnedData.phonenumber = currentUser.phonenumber;
    this.returnedData.note = currentUser.note;
    this.returnedData.isAdmin = currentUser.isAdmin;
    this.returnedData.isActive = currentUser.isActive;
    */
  },

  methods: {
    getDetail() {
      this.$api.usersManage
        .getUserDetail({ extra: this.returnedData.id })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.returnedData.createdAt = res.data.createdAt;
            this.returnedData.updatedAt = res.data.updatedAt;
            this.returnedData.id = res.data.user.id;
            this.returnedData.username = res.data.user.username;
            this.returnedData.phonenumber = res.data.user.phonenumber;
            this.returnedData.email = res.data.user.email;
            this.returnedData.note = res.data.user.note;
            this.returnedData.isAdmin = res.data.user.isAdmin;
            this.returnedData.isActive = res.data.user.isActive;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleSubmit(e) {
      e.preventDefault();
      this.edit_form.validateFields((err, values) => {
        if (!err) {
          this.commitLoading = true;
          console.log("Received values of form: ", values);

          var data = {
            id: this.returnedData.id,
            username: values.username,
            email: values.email,
            phonenumber: values.phoneNumber,
            note: values.note,
            isAdmin: this.returnedData.isAdmin,
            isActive: this.returnedData.isActive
          };

          debugger;
          this.$api.usersManage
            .updateUser({
              extra: this.returnedData.id,
              user: data
            })
            .then(res => {
              if (res.status === 200) {
                this.$message.success("更新成功");
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
    },
    handleCancel() {
      this.isShowModalOfChangePassword = false;
    },
    changePassword() {
      this.isShowModalOfChangePassword = true;
    },

    changePasswordOk(e) {
      e.preventDefault();
      this.password_form.validateFields((err, values) => {
        if (values.newPsw != values.confirmPsw) {
          alert("两次密码不一致，请核对");
          return;
        }

        if (!err) {
          this.commitLoading = true;
          console.log("Received values of form: ", values);

          var data = {
            extra: this.returnedData.id,
            password: values.newPsw,
            userId: this.returnedData.id
          };

          this.$api.usersManage
            .updatePassword(data)
            .then(res => {
              if (res.status === 200) {
                this.$message.success("更新用户密码成功");
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
              this.isShowModalOfChangePassword = false;
            });
        }
      });
    }
  }
};
</script>

<style>
.iot_view_person_add_form {
  margin-bottom: 12px;
}
.iot_view_person_add_formitem {
  margin-bottom: 8px;
  padding-bottom: 0px;
}
.iot_view_person_add_button_content {
  float: left;
}
.iot_view_person_add_form_pop {
  padding: 10px 20%;
}
.iot_view_person_add_formitem_pop {
  margin-bottom: 10px;
}
</style>
