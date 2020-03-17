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
                v-decorator="['phoneNumber']"
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
                v-decorator="['password']"
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
                v-decorator="['confirmPassword']"
                style="float: left;text-align: left"
              />
            </a-form-item>
            <a-form-item
              label="权限："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              class="iot_view_usersManage_add_formItem"
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
              class="iot_view_usersManage_add_formItem"
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
              class="iot_view_usersManage_add_formItem"
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
              class="iot_view_usersManage_add_formItem"
            >
              <a-input
                size="small"
                v-decorator="['unit']"
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
                v-decorator="['describe']"
                :rows="4"
                style="float: left;text-align: left"
              />
            </a-form-item>
            <div class="iot_view_usersManage_add_button_content">
              <a-row>
                <a-col :span="14" :offset="5">
                  <a-button type="primary" style="float: left">确认</a-button>
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
const authority_options = [
  {
    value: "admin",
    label: "管理员"
  },
  {
    value: "superAdmin",
    label: "超级管理员"
  }
];
export default {
  components: { ACol, ARow },
  data() {
    return {
      authority_options
    };
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
