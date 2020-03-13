<template>
  <!--  <a-layout style="background: #fff;padding: 0 14px 0">-->
  <!--    <span>{{ $route.params.id }}</span>-->
  <!--  </a-layout>-->

  <a-layout>
    <a-card style="width: 100%">
      <a-row style="padding-bottom: 8px">
        <a-col :span="24">
          <span style="font-size: 16px;font-weight: normal;color: black"
            >主机名： {{ this.ID }}</span
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
              <div style="font-size: 8px;color: #b0b0b0">端口</div>
              <div style="font-size: 12px">{{ this.infoData.port }}</div>
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
              <div style="font-size: 8px;color: #b0b0b0">网关</div>
              <div style="font-size: 12px">{{ this.infoData.gateway }}</div>
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
              <div style="font-size: 12px">{{ this.infoData.time }}</div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      style="width: 100%;margin-top: 16px;height: 100%;padding: 10px 14px"
    >
      <a-form
        :form="internetServer_check_form"
        layout="vertical"
        class="iot_view_internetServer_check_form"
      >
        <a-form-item
          label="名称："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12 }"
          class="iot_view_internetServer_check_formItem"
        >
          <span style="float: left"> {{ this.infoData.otherData }}</span>
        </a-form-item>
        <a-form-item
          label="名称："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12 }"
          class="iot_view_internetServer_check_formItem"
        >
          <span style="float: left"> {{ this.infoData.otherData }}</span>
        </a-form-item>
        <a-form-item
          label="名称："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12 }"
          class="iot_view_internetServer_check_formItem"
        >
          <span style="float: left"> {{ this.infoData.otherData }}</span>
        </a-form-item>
        <a-form-item
          label="名称："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12 }"
          class="iot_view_internetServer_check_formItem"
        >
          <span style="float: left"> {{ this.infoData.otherData }}</span>
        </a-form-item>
      </a-form>
    </a-card>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
export default {
  data() {
    return {
      ID: this.$route.params.id,
      infoData: {
        port: "",
        gateway: "",
        date: "",
        otherData: ""
      }
    };
  },
  beforeCreate() {
    this.internetServer_check_form = this.$form.createForm(this, {
      name: "internetServer_check_form"
    });
    this.internetServer_check_form.getFieldDecorator("keys", {
      initialValue: [],
      preserve: true
    });
  },
  beforeMount() {
    this.$api.interServer
      .getCheckData({
        ID: this.ID
      })
      .then(res => {
        this.infoData = res.data.check[0];
        console.log(this.infoData);
      })
      .catch(err => {
        console.log(err);
      });
  },
  components: { ACol, ARow }
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
