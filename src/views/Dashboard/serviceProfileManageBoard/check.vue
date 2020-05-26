<template>
  <a-layout>
    <a-card style="width: 100%">
      <a-row style="padding-bottom: 8px">
        <a-col :span="24">
          <span style="font-size: 16px;font-weight: normal;color: black"
            >编号： {{ this.returnedData.id }}</span
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
              <div style="font-size: 12px">{{ this.getOrganizationName }}</div>
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
              <div style="font-size: 12px">{{ this.getNetworkServerName }}</div>
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
              <div style="font-size: 12px">
                {{ this.returnedData.createdAt }}
              </div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      style="width: 100%;margin-top: 16px;height: 100%;padding: 10px 14px"
    >
      <a-form :form="form" layout="vertical" class="iot_view_check_form">
        <a-form-item
          label="是否添加网关元数据："
          :required="true"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          class="iot_view_check_formItem"
        >
          <span style="float: left">
            {{ this.returnedData.addGWMetaData }}</span
          >
        </a-form-item>
        <a-form-item
          label="启用地理位置："
          :required="true"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          class="iot_view_check_formItem"
        >
          <span style="float: left"> {{ this.returnedData.hrAllowed }}</span>
        </a-form-item>
        <a-form-item
          label="设备状态请求频率："
          :required="true"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          class="iot_view_check_formItem"
        >
          <span style="float: left">
            {{ this.returnedData.devStatusReqFreq }}</span
          >
        </a-form-item>
        <a-form-item
          label="最低允许数据速率："
          :required="true"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          class="iot_view_check_formItem"
        >
          <span style="float: left"> {{ this.returnedData.drMin }}</span>
        </a-form-item>
        <a-form-item
          label="最高允许数据速率："
          :required="true"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          class="iot_view_check_formItem"
        >
          <span style="float: left"> {{ this.returnedData.drMax }}</span>
        </a-form-item>
      </a-form>
    </a-card>
  </a-layout>
</template>

<script>
import {
  getNetworkServerNameById,
  getOrganizationNameById
} from "@/utils/util";
export default {
  name: "check",
  data() {
    return {
      returnedData: {
        id: "",
        name: "",
        networkServerID: "",
        organizationID: "",
        addGWMetaData: false,
        hrAllowed: false,
        devStatusReqFreq: 0,
        drMax: 0,
        drMin: 0,
        createdAt: ""
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: "check_form"
    });
    this.form.getFieldDecorator("keys", {
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

  computed: {
    getOrganizationName() {
      return getOrganizationNameById(this.returnedData.organizationID);
    },

    getNetworkServerName() {
      return getNetworkServerNameById(this.returnedData.networkServerID);
    }
  },
  methods: {
    getDetail() {
      var _this = this;
      this.$api.serviceProfile
        .getService({
          extra: this.returnedData.id
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            let infoDataTemp = res.data;
            _this.returnedData.createdAt = infoDataTemp.createdAt;
            _this.returnedData.name = infoDataTemp.serviceProfile.name;
            _this.returnedData.networkServerID =
              infoDataTemp.serviceProfile.networkServerID;
            _this.returnedData.organizationID =
              infoDataTemp.serviceProfile.organizationID;
            _this.returnedData.addGWMetaData =
              infoDataTemp.serviceProfile.addGWMetaData;
            _this.returnedData.hrAllowed =
              infoDataTemp.serviceProfile.hrAllowed;
            _this.returnedData.devStatusReqFreq =
              infoDataTemp.serviceProfile.devStatusReqFreq;
            _this.returnedData.drMax = infoDataTemp.serviceProfile.drMax;
            _this.returnedData.drMin = infoDataTemp.serviceProfile.drMin;
          } else {
            console.log("获取服务配置详细信息失败");
          }
        });
    }
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

.iot_view_check_form {
  padding: 20px 5px;
}

.iot_view_check_formItem {
  margin-bottom: 14px;
}
</style>
