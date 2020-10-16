<template>
  <!--  <a-layout style="background: #fff;padding: 0 14px 0">-->
  <!--    <span>{{ $route.params.id }}</span>-->
  <!--  </a-layout>-->

  <a-layout>
    <a-card style="width: 100%">
      <a-row style="padding-bottom: 8px">
        <a-col :span="24">
          <span style="font-size: 16px;font-weight: normal;color: black"
            >主机名： {{ this.getIp }}</span
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
              <div style="font-size: 12px">{{ this.getPort }}</div>
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
              <div style="font-size: 12px">{{ returnedData.name }}</div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="8" style="width: 20%">
          <a-row type="flex" justify="space-around" align="middle">
            <a-col :span="4" style="height: 100%">
              <span
                class="iconfont icon-time"
                style="font-size: 34px;color: #1eaf84;height: 12px;"
              ></span>
            </a-col>
            <a-col :span="20" style="text-align: left">
              <div style="font-size: 8px;color: #b0b0b0">创建时间</div>
              <div style="font-size: 12px">{{ returnedData.createdAt }}</div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      style="width: 100%;margin-top: 16px;height: 100%;padding: 10px 14px"
    >
      <a-form :form="check_form" layout="vertical" class="iot_view_check_form">
        <a-form-item
          label="间隔(每天)："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12 }"
          class="iot_view_check_formItem"
        >
          <span style="float: left">
            {{ returnedData.gatewayDiscoveryInterval }}</span
          >
        </a-form-item>
        <a-form-item
          label="发射频率(Hz)："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12 }"
          class="iot_view_check_formItem"
        >
          <span style="float: left">
            {{ returnedData.gatewayDiscoveryTXFrequency }}</span
          >
        </a-form-item>
        <a-form-item
          label="发送数据率："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12 }"
          class="iot_view_check_formItem"
        >
          <span style="float: left">
            {{ returnedData.gatewayDiscoveryDR }}</span
          >
        </a-form-item>
      </a-form>
    </a-card>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
import { getNetworkServerIdByServer } from "@/utils/util";
export default {
  data() {
    return {
      returnedData: {
        id: "",
        name: "",
        server: "",
        gatewayDiscoveryEnabled: false,
        gatewayDiscoveryInterval: "",
        gatewayDiscoveryTXFrequency: "",
        gatewayDiscoveryDR: ""
      }
    };
  },
  beforeCreate() {
    this.check_form = this.$form.createForm(this, {
      name: "check_form"
    });
    this.check_form.getFieldDecorator("keys", {
      initialValue: [],
      preserve: true
    });
  },

  computed: {
    getIp() {
      if (this.common.isEmpty(this.returnedData.server)) return "";
      if (this.returnedData.server.split(":")) {
        let server = this.returnedData.server.split(":");
        return server[0];
      } else {
        return this.returnedData.server;
      }
    },
    getPort() {
      if (this.common.isEmpty(this.returnedData.server)) return "";
      if (this.returnedData.server.split(":")) {
        let server = this.returnedData.server.split(":");
        return server[1];
      } else {
        return "";
      }
    }
  },

  beforeMount() {
    this.returnedData.id = this.$route.query.id;
  },

  mounted() {
    this.getDetail();
  },

  methods: {
    getDetail() {
      //debugger;
      this.$api.networkServer
        .getServerDetail({
          limit: 1,
          extra: this.returnedData.id
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.returnedData.createdAt = this.common.timestamp2LocalDateTime(
              res.data.createdAt
            );
            this.returnedData.name = res.data.networkServer.name;
            this.returnedData.server = res.data.networkServer.server;
            if (this.returnedData.server.split(":")) {
              let server = this.returnedData.server.split(":");
              this.returnedData.ip = server[0];
              this.returnedData.port = server[1];
            } else {
              this.returnedData.ip = this.returnedData.server;
              this.returnedData.port = "";
            }
            this.returnedData.gatewayDiscoveryEnabled =
              res.data.networkServer.gatewayDiscoveryEnabled;
            this.returnedData.gatewayDiscoveryInterval =
              res.data.networkServer.gatewayDiscoveryInterval;
            this.returnedData.gatewayDiscoveryTXFrequency =
              res.data.networkServer.gatewayDiscoveryTXFrequency;
            this.returnedData.gatewayDiscoveryDR =
              res.data.networkServer.gatewayDiscoveryDR;
          } else {
            console.log("获取网络服务器详细信息失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
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
.iot_view_check_formItem {
  margin-bottom: 14px;
}
</style>
