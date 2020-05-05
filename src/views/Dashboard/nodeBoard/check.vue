<template>
  <a-layout>
    <a-card style="width: 100%">
      <a-row style="padding-bottom: 8px">
        <a-col :span="24">
          <span style="font-size: 16px;font-weight: normal;color: black"
            >节点ID： {{ this.deviceProfile.id }}</span
          >
        </a-col>
      </a-row>
      <div class="iot_line" />
      <a-row type="flex" justify="space-around" style="margin-top: 8px">
        <a-col :span="6" style="width: 15%">
          <a-row type="flex" justify="space-around" align="middle">
            <a-col :span="8" style="height: 100%">
              <span
                class="iconfont icon-iconfkzt"
                style="font-size: 34px;color: #1eaf84;height: 12px;"
              ></span>
            </a-col>
            <a-col :span="16" style="text-align: left">
              <div style="font-size: 8px;color: #b0b0b0">网络状态</div>
              <div style="font-size: 12px">
                {{ this.getNetworkStatus }}
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="6" style="width: 15%">
          <a-row type="flex" justify="space-around" align="middle">
            <a-col :span="8" style="height: 100%">
              <span
                class="iconfont icon-wifi"
                style="font-size: 34px;color: #1eaf84;"
              ></span>
            </a-col>
            <a-col :span="16" style="text-align: left">
              <div style="font-size: 8px;color: #b0b0b0">信号强度</div>
              <div style="font-size: 12px">{{ this.getSign }}</div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="6" style="width: 15%">
          <a-row type="flex" justify="space-around" align="middle">
            <a-col :span="8" style="height: 100%">
              <span
                class="iconfont icon-router_icon"
                style="font-size: 34px;color: #1eaf84;"
              ></span>
            </a-col>
            <a-col :span="16" style="text-align: left">
              <div style="font-size: 8px;color: #b0b0b0">所在网关</div>
              <div style="font-size: 12px">{{ this.getGateway }}</div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="6" style="width: 15%">
          <a-row type="flex" justify="space-around" align="middle">
            <a-col :span="8" style="height: 100%">
              <span
                class="iconfont icon-heartbeat"
                style="font-size: 34px;color: #1eaf84;"
              ></span>
            </a-col>
            <a-col :span="16" style="text-align: left">
              <div style="font-size: 8px;color: #b0b0b0">最后心跳时间</div>
              <div style="font-size: 12px">
                {{ this.getHeartTime }}
              </div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-card>

    <a-layout
      style="background: #fff;padding: 0 14px 0;margin-top: 14px;height: min-content"
    >
      <div style="height: min-content">
        <a-tabs
          type="card"
          :defaultActiveKey="defaultTab"
          size="small"
          style="text-align: left;padding-top: 0;height: min-content"
        >
          <a-tab-pane tab="详细信息" key="1">
            <detailData />
          </a-tab-pane>
          <a-tab-pane tab="配置修改" key="2">
            <deployEdit />
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-layout>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import detailData from "./detailData";
import deployEdit from "./deployEdit";
export default {
  components: {
    ARow,
    detailData,
    deployEdit
  },
  data() {
    return {
      defaultTab: "1",

      //data
      deviceProfile: {
        id: "",
        name: ""
        //internalState: "",
        //sign: "",
        //gateway: "",
        //heartTime: ""
      },

      deviceDetail: {
        devEUI: "",
        name: "",
        description: "",
        province: "",
        city: "",
        district: "",
        location: {
          accuracy: 0,
          altitude: 0,
          latitude: 0,
          longitude: 0,
          source: "UNKNOWN"
        },

        deviceStatusBattery: 0,
        deviceStatusMargin: 0,
        lastSeenAt: ""
      }
    };
  },

  computed: {
    getNodeState() {
      debugger;
      if (
        this.common.isEmpty(this.deviceDetail.devEUI) ||
        this.deviceDetail.devEUI === "0000000000000000"
      )
        return "未部署";
      else return "已部署";
    },
    getNetworkStatus() {
      return "off";
    },
    getSign() {
      return this.deviceDetail.deviceStatusBattery;
    },

    getGateway() {
      return "";
    },

    getHeartTime() {
      return this.deviceDetail.lastSeenAt;
    }
  },

  beforeMount() {
    this.deviceProfile.id = this.$route.query.id;
    this.deviceDetail.devEUI = this.$route.query.devEUI;
    this.defaultTab = this.$route.query.tab;

    this.getDeviceDetail();
  },

  methods: {
    getDeviceProfileDetail() {
      this.$api.node
        .getDeviceProfileById({
          extra: this.deviceProfile.id
        })
        .then(res => {
          let data = res.data;
          console.log(data);
          this.returnedData = data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    getDeviceDetail() {
      debugger;
      if (
        this.common.isEmpty(this.deviceDetail.devEUI) ||
        this.deviceDetail.devEUI === "0000000000000000"
      )
        return;

      this.$api.appManage
        .getAppNodeDetail({ extra: this.deviceDetail.devEUI })
        .then(res => {
          let temp = res.data;

          this.deviceDetail = temp.device;
          this.deviceDetail.location = temp.location;
          this.deviceDetail.deviceStatusBattery = temp.deviceStatusBattery;
          this.deviceDetail.deviceStatusMargin = temp.deviceStatusMargin;
          this.deviceDetail.lastSeenAt = temp.lastSeenAt;
        })
        .catch(err => {
          console.log(err);
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
</style>
