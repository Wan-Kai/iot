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
            class="iot_view_usersManage_edit_form"
          >
            <a-form-item
              label="手机："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              class="iot_view_usersManage_edit_formItem"
            >
              <p class="iot_view_usersManage_check_formItem_p">
                {{ phoneNumber }}
              </p>
            </a-form-item>
            <a-form-item
              label="权限："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              class="iot_view_usersManage_edit_formItem"
            >
              <a-cascader
                v-decorator="['authority']"
                style="width: 100%;float: left;text-align: left"
                size="small"
                :options="authority_options"
                placeholder=""
              />
            </a-form-item>
            <a-form-item
              label="姓名："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              class="iot_view_usersManage_edit_formItem"
            >
              <a-input
                size="small"
                v-decorator="['name']"
                style="float: left;text-align: left"
              />
            </a-form-item>
            <a-form-item
              label="邮箱："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              class="iot_view_usersManage_edit_formItem"
            >
              <a-input
                size="small"
                v-decorator="['email']"
                style="float: left;text-align: left"
              />
            </a-form-item>
            <a-form-item
              label="单位："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              class="iot_view_usersManage_edit_formItem"
            >
              <a-input
                size="small"
                v-decorator="['unit']"
                style="float: left;text-align: left"
              />
            </a-form-item>
            <a-form-item
              class="iot_view_usersManage_edit_formItem"
              label="备注："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
            >
              <a-textarea
                placeholder="请填写备注"
                v-decorator="['describe']"
                :rows="4"
                style="float: left;text-align: left"
              />
            </a-form-item>
            <div class="iot_view_usersManage_edit_button_content">
              <a-row>
                <a-col :span="14" :offset="5">
                  <a-button type="primary" style="float: left">确认</a-button>
                  <a-button
                    style="float: left;margin-left: 20px"
                    @click="changePsw"
                    >修改密码</a-button
                  >
                </a-col>
              </a-row>
            </div>
          </a-form>
        </a-col>
      </a-row>
    </div>
    <a-modal v-model="visible" title="密码修改" onOk="handleOk">
      <template slot="footer">
        <a-button key="confirm" style="margin-right: 20px">确认</a-button>
        <a-button key="back" @click="handleCancel">关闭</a-button>
      </template>
      <a-form
        :form="personalForm"
        @submit="handleSubmitPsw"
        layout="vertical"
        class="iot_view_usersManage_edit_model_form"
      >
        <a-form-item class="iot_view_usersManage_edit_formItem">
          <a-input
            v-decorator="['newPsw']"
            style="width: 100%;text-align: left"
            placeholder="请输入新密码"
          >
            <a-icon slot="prefix" type="key" />
          </a-input>
        </a-form-item>
        <a-form-item class="iot_view_usersManage_edit_formItem">
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
      phoneNumber: "",
      visible: false
    };
  },
  beforeMount() {
    this.phoneNumber = this.$route.query.number;
  },
  methods: {
    changePsw() {
      this.visible = !this.visible;
    },
    handleCancel() {
      this.visible = !this.visible;
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
