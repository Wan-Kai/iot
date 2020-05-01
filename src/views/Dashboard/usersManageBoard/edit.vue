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
        <a-col :span="16">
          <a-form
            :form="edit_form"
            @submit="handleSubmit"
            layout="vertical"
            class="iot_view_usersManage_edit_form"
          >
            <a-form-item
              label="手机："
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 12 }"
              class="iot_view_usersManage_edit_formItem"
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
              label="是否管理员："
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 12 }"
              class="iot_view_usersManage_edit_formItem"
            >
              <a-switch
                :checked="returnedData.isAdmin"
                :defaultChecked="returnedData.isAdmin"
                checkedChildren="是"
                unCheckedChildren="否"
                @change="stateChange"
                style="margin-left: 10px;float: left"
                v-decorator="[
                  'isAdmin',
                  {
                    initialValue: returnedData.isAdmin,
                    rules: [{ required: true, message: '是否管理员' }]
                  }
                ]"
              />
            </a-form-item>
            <a-form-item
              label="姓名："
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 12 }"
              class="iot_view_usersManage_edit_formItem"
            >
              <a-input
                size="small"
                v-decorator="[
                  'username',
                  {
                    initialValue: returnedData.username,
                    rules: [{ required: true, message: '请输入用户姓名!' }]
                  }
                ]"
                style="float: left;text-align: left"
              />
            </a-form-item>
            <a-form-item
              label="邮箱："
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 12 }"
              class="iot_view_usersManage_edit_formItem"
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
              class="iot_view_usersManage_edit_formItem"
              label="备注："
              :label-col="{ span: 4 }"
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
            <div class="iot_view_usersManage_edit_button_content">
              <a-row>
                <a-col :span="12" :offset="4">
                  <a-button
                    type="primary"
                    html-type="submit"
                    :loading="commitLoading"
                    >确定</a-button
                  >
                  <a-button
                    type="danger"
                    icon="delete"
                    style="margin-left: 16px"
                    @click="handleDelete"
                    >删除</a-button
                  >

                  <a-button style="margin-left: 20px" @click="changePassword"
                    >修改密码</a-button
                  >

                  <a-button style="margin-left: 30px" @click="handleBack"
                    >返回</a-button
                  >
                </a-col>
              </a-row>
            </div>
          </a-form>
        </a-col>
      </a-row>
    </div>

    <a-modal title="删除提示" :visible="isShowModalOfDelete">
      <template slot="footer">
        <a-button key="back" @click="handleDeleteCancel">取消</a-button>
        <a-button
          type="danger"
          icon="delete"
          style="margin-left: 16px"
          @click="handleDeleteOk"
          :loading="commitLoading"
          >确认删除</a-button
        >
      </template>
      <p>{{ ModalText }}</p>
    </a-modal>

    <a-modal
      v-model="isShowModalOfChangePassword"
      title="密码修改"
      onOk="changePasswordOk"
    >
      <template slot="footer">
        <a-button
          key="confirm"
          style="margin-right: 20px"
          @click="changePasswordOk"
          >确认</a-button
        >
        <a-button key="back" @click="changePasswordCancel">关闭</a-button>
      </template>
      <a-form
        :form="password_form"
        @submit="changePasswordOk"
        layout="vertical"
        class="iot_view_usersManage_edit_model_form"
      >
        <a-form-item
          class="iot_view_usersManage_edit_formItem"
          label="新密码"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            v-decorator="['newPsw']"
            style="width: 100%;text-align: left"
            placeholder="请输入新密码"
          >
            <a-icon slot="prefix" type="key" />
          </a-input>
        </a-form-item>
        <a-form-item
          class="iot_view_usersManage_edit_formItem"
          label="重复新密码"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
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
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      returnedData: {
        id: "",
        username: "",
        isAdmin: false,

        phonenumber: "",
        email: "",
        note: "",

        createdAt: "",
        updatedAt: ""
      },

      commitLoading: false,
      isShowModalOfDelete: false,
      ModalText: "",
      isShowModalOfChangePassword: false
    };
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
    this.returnedData.id = this.$route.query.id;
  },

  mounted() {
    this.getDetail();
  },

  methods: {
    getDetail() {
      this.$api.usersManage
        .getUserDetail({ extra: this.returnedData.id })
        .then(res => {
          console.log(res);
          this.returnedData.createdAt = res.data.createdAt;
          this.returnedData.updatedAt = res.data.updatedAt;
          this.returnedData.id = res.data.user.id;
          this.returnedData.username = res.data.user.username;
          this.returnedData.phonenumber = res.data.user.phonenumber;
          this.returnedData.email = res.data.user.email;
          this.returnedData.note = res.data.user.note;
          this.returnedData.isAdmin = res.data.user.isAdmin;
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleBack() {
      this.$router.push("/admin/dashboard/usersManage");
    },

    stateChange(state) {
      this.returnedData.isAdmin = !this.returnedData.isAdmin;
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
            isActive: this.returnedData.isAdmin
          };

          debugger;
          this.$api.usersManage
            .updateUser({
              extra: this.returnedData.id,
              user: data
            })
            .then(res => {
              if (res.status === 200) {
                this.$message.success("更新用户成功");

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
    },

    handleDelete() {
      this.isShowModalOfDelete = true;
      this.ModalText = "确认删除" + ":" + "" + this.returnedData.username;
    },
    handleDeleteOk(e) {
      this.commitLoading = true;

      this.$api.usersManage
        .deleteUser({
          extra: this.returnedData.id
        })
        .then(res => {
          if (res.status === 200) {
            this.$message.success("删除用户成功");

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
          this.$message.error("删除用户失败");
        })
        .finally(() => {
          this.commitLoading = false;
          this.isShowModalOfDelete = false;
        });
    },
    handleDeleteCancel(e) {
      this.visible = false;
    },

    changePassword() {
      this.isShowModalOfChangePassword = true;
    },
    changePasswordCancel() {
      this.isShowModalOfChangePassword = false;
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
              this.isShowModalOfChangePassword = false;
            });
        }
      });
    }
  }
};
</script>

<style>
.iot_view_usersManage_edit_formItem {
  margin-bottom: 8px;
  padding-bottom: 0;
}
.iot_view_usersManage_edit_button_content {
}
.iot_view_usersManage_check_formItem_p {
  text-align: left;
  margin-bottom: 0;
}
.iot_view_usersManage_check_model_button_content {
}
.iot_view_usersManage_edit_model_form {
  padding: 10px 20%;
}
</style>
