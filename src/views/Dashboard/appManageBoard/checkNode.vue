<template>
  <a-layout>
    <a-card style="width: 100%">
      <a-row style="padding-bottom: 8px">
        <a-col :span="24">
          <span style="font-size: 16px;font-weight: normal;color: black"
            >节点编号： {{ this.id }}</span
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
                状态
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
              <div style="font-size: 12px">强度</div>
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
              <div style="font-size: 12px">网关</div>
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
              <div style="font-size: 12px">心跳时间</div>
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
import detailData from "./nodeDetail";
import deployEdit from "./nodeEdit";
export default {
  name: "checkNode",
  components: {
    detailData,
    deployEdit
  },
  data() {
    return {
      //params
      id: "",
      defaultTab: ""
    };
  },
  beforeMount() {
    this.id = sessionStorage.getItem("devEUI");
    this.defaultTab = sessionStorage.getItem("tab");
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
