<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div class="iot_view_app_add_form_content">
      <a-form
        :form="form"
        @submit="handleSubmit"
        layout="vertical"
        class="iot_view_app_add_form"
      >
        <a-form-item
          label="应用编号："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
          class="iot_view_app_add_formItem"
        >
          <a-input
            size="small"
            v-decorator="[
              'id',
              { rules: [{ required: true, message: '请输入应用编号!' }] }
            ]"
            style="float: left;text-align: left;width: 90%"
          />
          <a-tooltip placement="rightTop">
            <template slot="title">
              prompt text
            </template>
            <a-icon
              type="exclamation-circle"
              style="height: 24px;line-height: 24px;width: 24px;
          vertical-align: text-top"
            />
          </a-tooltip>
        </a-form-item>
        <a-form-item
          label="应用名称："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
          class="iot_view_app_add_formItem"
        >
          <a-input
            size="small"
            v-decorator="[
              'name',
              { rules: [{ required: true, message: '请输入应用名称!' }] }
            ]"
            style="float: left;text-align: left;width: 90%"
          />
        </a-form-item>

        <a-form-item
          class="iot_view_app_add_formItem"
          label="服务名称："
          :required="false"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
        >
          <a-cascader
            v-decorator="[
              'serviceProfile',
              {
                rules: [{ required: false, message: '请选择服务名' }]
              }
            ]"
            style="width: 90%;float: left;text-align: left"
            size="small"
            :options="serviceProfile_options"
            placeholder=""
          />
          <a-tooltip placement="rightTop">
            <template slot="title">
              prompt text
            </template>
            <a-icon
              type="exclamation-circle"
              style="height: 24px;line-height: 24px;width: 24px;
          vertical-align: text-top"
            />
          </a-tooltip>
        </a-form-item>

        <a-form-item
          label="设备分配容量："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
          class="iot_view_app_add_formItem"
        >
          <a-input
            size="small"
            v-decorator="[
              'capacity',
              { rules: [{ required: true, message: '请输入设备分配容量!' }] }
            ]"
            style="float: left;text-align: left;width: 90%"
          />
          <a-tooltip placement="rightTop">
            <template slot="title">
              prompt text
            </template>
            <a-icon
              type="exclamation-circle"
              style="height: 24px;line-height: 24px;width: 24px;
          vertical-align: text-top"
            />
          </a-tooltip>
        </a-form-item>
        <a-form-item
          class="iot_view_app_add_formItem"
          label="应用描述："
          :required="false"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
        >
          <a-textarea
            placeholder="请填写应用描述，最多100个汉字"
            v-decorator="['description']"
            :rows="4"
            style="float: left;text-align: left;width: 90%"
          />
        </a-form-item>
        <a-row>
          <a-col :span="7" :offset="3">
            <div class="iot_view_app_add_form_left">
              <a-button type="primary" html-type="submit">确定</a-button>
              <a-button style="margin-left: 30px" @click="back">取消</a-button>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </a-layout>
</template>

<script>
import { getServiceOption } from "@/utils/util";

export default {
  data() {
    return {
      commitLoading: false,
      self: this,
      serviceProfile_options: []
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "dynamic_form_item" });
    this.form.getFieldDecorator("keys", { initialValue: [], preserve: true });
  },

  beforeMount() {
    debugger;
    this.serviceProfile_options = getServiceOption();
  },

  methods: {
    handleSubmit(e) {
      var self = this;
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          self.commitLoading = true;
          debugger;
          for (let i = 0; i < self.serviceProfile_options.length; i++) {
            if (
              values.serviceProfile[0] === self.serviceProfile_options[i].value
            ) {
              values.serviceProfileID = self.serviceProfile_options[i].id;
            }
          }
          values.organizationID = 1;

          this.$api.appManage
            .createApp({
              application: values
            })
            .catch(err => {
              console.log(err);
            });
          this.$message.success("成功创建应用:" + values.id);
          setTimeout(() => {
            this.$router.push({
              name: "appManageInit"
            });
          }, 500);
        }
      });
    },
    back() {}
  }
};
</script>

<style>
.iot_view_app_add_form_content {
  margin-top: 20px;
}
.iot_view_app_add_form {
}
.iot_view_app_add_formItem {
  margin-bottom: 8px;
}
.iot_view_app_add_form_left {
  float: left;
}
</style>
