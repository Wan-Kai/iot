<template>
  <a-layout>
    <a-card style="width: 100%">
      <a-row style="padding-bottom: 8px">
        <a-col :span="24">
          <span style="font-size: 16px;font-weight: normal;color: black"
            >节点编号： {{ this.query.devEUI }}</span
          >
        </a-col>
      </a-row>
      <!-- <div class="iot_line" /> -->
      <!-- - <a-row type="flex" justify="space-around" style="margin-top: 8px">
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
                {{this.query.netstatus}}
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
              <div style="font-size: 12px">{{this.query.rssi}}</div>
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
              <div style="font-size: 12px">{{this.query.gatewayId}}</div>
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
              <div style="font-size: 12px">{{this.query.lastSeenAt}}</div>
            </a-col>
          </a-row>
        </a-col>
      </a-row> -->
    </a-card>

    <a-layout
      style="background: #fff;padding: 0 14px 0;margin-top: 14px;height: min-content"
    >
      <div style="height: min-content">
        <a-tabs
          type="line"
          :defaultActiveKey="query.defaultTab"
          size="small"
          style="text-align: left;padding-top: 0;height: min-content"
        >
          <!-- <a-tab-pane tab="详细信息" key="1">
            <nodeDetail />
          </a-tab-pane> -->
          <a-tab-pane tab="配置修改" key="1">
            <nodeEdit />
          </a-tab-pane>

          <a-tab-pane tab="上行日志" key="2">
            <nodeUplog />
          </a-tab-pane>

          <a-tab-pane tab="下行日志" key="3">
            <nodeDownlog />
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-layout>
  </a-layout>
</template>

<script>
import nodeDetail from "./nodeDetail";
import nodeEdit from "./nodeEdit";
import nodeUplog from "./upLogFlow";
import nodeDownlog from "./downLogFlow";
export default {
  name: "checkNode",
  components: {
    // nodeDetail,
    nodeEdit,
    nodeUplog,
    nodeDownlog
  },
  data() {
    return {
      //params
      query: {
        defaultTab: "",
        appID: "",
        devEUI: "",
        netstatus: "",
        rssi: "",
        gatewayId: "",
        lastSeenAt: ""
        // deviceProfileID: "",
        // deviceProfileName: ""
      }
    };
  },
  beforeMount() {
    this.query.defaultTab = sessionStorage.getItem("tab");
    this.query.appID = sessionStorage.getItem("appID");
    this.query.devEUI = sessionStorage.getItem("devEUI");
    // this.query.lastSeenAt = sessionStorage.getItem("lastSeenAt");
    //   this.query.deviceProfileID = sessionStorage.getItem("deviceProfileID");
    //   this.query.deviceProfileName = sessionStorage.getItem("deviceProfileName");
    // this.getUpLog();
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
