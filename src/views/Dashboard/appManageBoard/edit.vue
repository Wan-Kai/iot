<template>
  <div class="iot_view_app_edit_form_content">
    <a-form
      :form="form"
      @submit="handleSubmit"
      layout="vertical"
      class="iot_view_app_edit_form"
    >
      <a-form-item
        label="应用编号："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_app_edit_formItem"
      >
        <a-input
          size="small"
          v-decorator="['appNumber']"
          style="float: left;text-align: left"
        />
      </a-form-item>
      <a-form-item
        label="应用名称："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_app_edit_formItem"
      >
        <a-input
          size="small"
          v-decorator="['appName']"
          style="float: left;text-align: left"
        />
      </a-form-item>
      <a-form-item
        label="设备分配容量："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_app_edit_formItem"
      >
        <a-input
          size="small"
          v-decorator="['capacity']"
          style="float: left;text-align: left"
        />
      </a-form-item>
      <a-form-item
        class="iot_view_app_edit_formItem"
        label="应用描述："
        :required="false"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
      >
        <a-textarea
          placeholder="请填写应用描述，最多100个汉字"
          v-decorator="['describe']"
          :rows="4"
          style="float: left;text-align: left"
        />
      </a-form-item>
      <a-row>
        <a-col :span="7" :offset="3">
          <div class="iot_view_edit_add_form_left">
            <a-button type="primary" html-type="submit">确定</a-button>
            <a-button style="margin-left: 20px" @click="back">取消</a-button>
            <a-button style="margin-left: 20px" icon="delete" type="danger"
              >删除设备</a-button
            >
          </div>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "dynamic_form_item" });
    this.form.getFieldDecorator("keys", { initialValue: [], preserve: true });
  },
  methods: {
    handleSubmit() {},
    back() {}
  }
};
</script>

<style>
.iot_view_app_edit_form_content {
  margin-top: 20px;
}
.iot_view_app_edit_form {
}
.iot_view_app_edit_formItem {
  margin-bottom: 8px;
}
.iot_view_app_edit_form_left {
  float: left;
}
</style>
