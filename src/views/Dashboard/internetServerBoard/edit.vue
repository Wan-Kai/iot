<template>
  <a-layout style="background: #fff;padding: 0 14px 0">
    <a-form
      :form="internetServer_edit_form"
      layout="vertical"
      class="iot_view_internetServer_edit_form"
    >
      <a-form-item
        label="主机名："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 12 }"
      >
        <span style="float: left">{{ $route.params.id }}</span>
      </a-form-item>
      <a-form-item
        label="端口："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          v-decorator="['port']"
          style="width: 60%;float: left;height: 28px"
        />
      </a-form-item>
      <a-form-item
        label="网关："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          v-decorator="['gateway']"
          style="width: 60%;float: left;height: 28px"
        />
      </a-form-item>
      <a-form-item
        label="消息："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          v-decorator="['message']"
          style="width: 60%;float: left;height: 28px"
        />
      </a-form-item>
      <a-row>
        <a-col :span="12" :offset="3">
          <div class="iot_view_internetServer_edit_form_left">
            <a-button type="primary" @click="handleSubmit">确定</a-button>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {};
  },
  beforeCreate() {
    this.internetServer_edit_form = this.$form.createForm(this, {
      name: "internetServer_edit_form"
    });
  },
  methods: {
    handleSubmit() {}
  }
};
</script>

<style>
.iot_view_internetServer_edit_form {
  padding: 20px 5px;
}
.iot_view_internetServer_edit_form_left {
  float: left;
}
.ant-form-item {
  margin-bottom: 10px;
}
</style>
