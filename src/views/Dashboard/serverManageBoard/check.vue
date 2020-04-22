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
                class="iconfont icon-company"
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
                class="iconfont icon-internet"
                style="font-size: 34px;color: #1eaf84;height: 12px;"
              ></span>
            </a-col>
            <a-col :span="16" style="text-align: left">
              <div style="font-size: 8px;color: #b0b0b0">网络服务器</div>
              <div style="font-size: 12px">{{ this.server }}</div>
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
              <div style="font-size: 12px">{{ this.createdAt }}</div>
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
          label="是否添加网关元数据："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12 }"
          class="iot_view_internetServer_check_formItem"
        >
          <span style="float: left"> {{ this.addGWMetaData }}</span>
        </a-form-item>
        <a-form-item
          label="启用地理位置："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12 }"
          class="iot_view_internetServer_check_formItem"
        >
          <span style="float: left"> {{ this.hrAllowed }}</span>
        </a-form-item>
        <a-form-item
          label="设备状态请求频率："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12 }"
          class="iot_view_internetServer_check_formItem"
        >
          <span style="float: left"> {{ this.devStatusReqFreq }}</span>
        </a-form-item>
        <a-form-item
          label="最低允许数据速率："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12 }"
          class="iot_view_internetServer_check_formItem"
        >
          <span style="float: left"> {{ this.drMax }}</span>
        </a-form-item>
        <a-form-item
          label="最高允许数据速率："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12 }"
          class="iot_view_internetServer_check_formItem"
        >
          <span style="float: left"> {{ this.drMin }}</span>
        </a-form-item>
      </a-form>
    </a-card>
  </a-layout>
</template>

<script>
import { getNetServerNameById, getOrganizationNameById } from "@/utils/util";
export default {
  name: "check",
  data() {
    return {
      company: "",
      server: "",
      id: "",
      createdAt: "",
      addGWMetaData: false,
      hrAllowed: false,
      devStatusReqFreq: "",
      drMax: "",
      drMin: ""
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
  },
  beforeMount() {
    this.id = this.$route.query.number;
    this.$api.serviceProfile
      .getService({
        extra: this.id
      })
      .then(res => {
        console.log(res);
        let infoDataTemp = res.data;
        this.createdAt = infoDataTemp.createdAt;
        this.server = getNetServerNameById(
          infoDataTemp.serviceProfile.networkServerID
        );
        this.company = getOrganizationNameById(
          infoDataTemp.serviceProfile.organizationID
        );

        this.addGWMetaData = infoDataTemp.serviceProfile.addGWMetaData;
        this.hrAllowed = infoDataTemp.serviceProfile.hrAllowed;
        this.devStatusReqFreq = infoDataTemp.serviceProfile.devStatusReqFreq;
        this.drMax = infoDataTemp.serviceProfile.drMax;
        this.drMin = infoDataTemp.serviceProfile.drMin;
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
