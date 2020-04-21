<template>
  <a-layout>
    <a-card style="width: 100%">
      <a-row style="padding-bottom: 8px">
        <a-col :span="24">
          <span style="font-size: 16px;font-weight: normal;color: black"
            >编号： {{ this.id }}</span
          >
        </a-col>
      </a-row>
      <div class="iot_line" />
      <a-row type="flex" justify="space-around" style="margin-top: 8px">
        <a-col :span="8" style="width: 20%">
          <a-row type="flex" justify="space-around" align="middle">
            <a-col :span="8" style="height: 100%">
              <span
                class="iconfont icon-port"
                style="font-size: 34px;color: #1eaf84;height: 12px;"
              ></span>
            </a-col>
            <a-col :span="16" style="text-align: left">
              <div style="font-size: 8px;color: #b0b0b0">企业</div>
              <div style="font-size: 12px">{{ this.company }}</div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="8" style="width: 20%">
          <a-row type="flex" justify="space-around" align="middle">
            <a-col :span="8" style="height: 100%">
              <span
                class="iconfont icon-gateway"
                style="font-size: 34px;color: #1eaf84;height: 12px;"
              ></span>
            </a-col>
            <a-col :span="16" style="text-align: left">
              <div style="font-size: 8px;color: #b0b0b0">名称</div>
              <div style="font-size: 12px">{{ this.name }}</div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="8" style="width: 20%">
          <a-row type="flex" justify="space-around" align="middle">
            <a-col :span="8" style="height: 100%">
              <span
                class="iconfont icon-time"
                style="font-size: 34px;color: #1eaf84;height: 12px;"
              ></span>
            </a-col>
            <a-col :span="16" style="text-align: left">
              <div style="font-size: 8px;color: #b0b0b0">创建时间</div>
              <div style="font-size: 12px">{{ this.time }}</div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      style="width: 100%;margin-top: 16px;height: 100%;padding: 10px 14px"
    >
      <a-form
        :form="form"
        layout="vertical"
        class="iot_view_internetServer_check_form"
      >
        <a-form-item
          label="其他信息："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12 }"
          class="iot_view_internetServer_check_formItem"
        >
          <span style="float: left"> {{ this.name }}</span>
        </a-form-item>
        <a-form-item
          label="其他信息："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12 }"
          class="iot_view_internetServer_check_formItem"
        >
          <span style="float: left"> {{ this.name }}</span>
        </a-form-item>
        <a-form-item
          label="其他信息："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12 }"
          class="iot_view_internetServer_check_formItem"
        >
          <span style="float: left"> {{ this.name }}</span>
        </a-form-item>
      </a-form>
    </a-card>
  </a-layout>
</template>

<script>
export default {
  name: "check",
  data() {
    return {
      company: "",
      name: "",
      id: "",
      time: ""
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: "internetServer_check_form"
    });
    this.form.getFieldDecorator("keys", {
      initialValue: [],
      preserve: true
    });
  }
};
</script>

<style>
.iot_line {
  width: 100%;
  height: 1px;
  border-top: solid #dddddd 1px;
  padding: 2px 0;
}
.ant-card-wider-padding .ant-card-body {
  padding: 16px 8px;
}
.iot_view_internetServer_check_formItem {
  margin-bottom: 14px;
}
</style>
