<template>
  <div>
    <a-row>
      <div
        style="background: #2c3e50;width: 100%;min-height: 10%;display: inline-block;padding: 30px 10px"
      >
        <a-col :span="4" style="padding: 0 14px">
          <a-row>
            <a-col :span="12" style="text-align: left">
              <span
                class="iconfont icon-router_icon"
                style="font-size: 34px;color: dodgerblue"
              ></span>
            </a-col>
            <a-col :span="12" style="text-align: right">
              <p style="color: white;margin-bottom: 0">网关数</p>
              <p
                style="color: white;font-size: 26px;font-weight: bold;margin-bottom: 8px"
              >
                20
              </p>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12" style="text-align: left">
              <div class="iot_index_point" style="background-color: #1eaf84" />
              <span style="color: white;margin-left: 10px">在线：18</span>
            </a-col>
            <a-col :span="12" style="text-align: right">
              <div class="iot_index_point" style="background-color: grey" />
              <span style="color: white;margin-left: 10px">掉线：2</span>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="1">
          <div class="iot_divider" />
        </a-col>
        <a-col :span="4" style="padding: 0 14px">
          <a-row>
            <a-col :span="12" style="text-align: left">
              <span
                class="iconfont icon-iconfkzt"
                style="font-size: 34px;color: lightgreen"
              ></span>
            </a-col>
            <a-col :span="12" style="text-align: right">
              <p style="color: white;margin-bottom: 0">节点数</p>
              <p
                style="color: white;font-size: 26px;font-weight: bold;margin-bottom: 8px"
              >
                2320
              </p>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12" style="text-align: left">
              <div class="iot_index_point" style="background-color: #1eaf84" />
              <span style="color: white;margin-left: 10px">在线：2300</span>
            </a-col>
            <a-col :span="12" style="text-align: right">
              <div class="iot_index_point" style="background-color: grey" />
              <span style="color: white;margin-left: 10px">掉线：20</span>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="1">
          <div class="iot_divider" />
        </a-col>
        <a-col :span="4" style="padding: 0 14px">
          <a-row>
            <a-col :span="12" style="text-align: left">
              <span
                class="iconfont icon-app"
                style="font-size: 34px;color: yellow"
              ></span>
            </a-col>
            <a-col :span="12" style="text-align: right">
              <p style="color: white;margin-bottom: 0">应用数</p>
              <p
                style="color: white;font-size: 26px;font-weight: bold;margin-bottom: 8px"
              >
                546
              </p>
            </a-col>
          </a-row>
        </a-col>
      </div>
    </a-row>

    <a-row
      justify="space-between"
      style="margin-top: 10px;height: 400px"
      :gutter="16"
    >
      <a-col :span="16">
        <GatewayChart />
      </a-col>
      <a-col :span="8">
        <NewMessageList />
      </a-col>
    </a-row>
    <a-row
      justify="space-between"
      style="margin-top: 10px;height: 400px"
      :gutter="16"
    >
      <a-col :span="16">
        <GatewayMap />
      </a-col>
      <a-col :span="8">
        <ActiveNodeList />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
import GatewayChart from "../../components/Index/gatewayChart";
import ActiveNodeList from "../../components/Index/activeNodeList";
import GatewayMap from "../../components/Index/gatewayMap";
import NewMessageList from "../../components/Index/newMessageList";
export default {
  components: {
    ACol,
    ARow,
    GatewayChart,
    ActiveNodeList,
    GatewayMap,
    NewMessageList
  }
};
</script>

<style>
.iot_index_point {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.iot_divider {
  border-left: solid 1px #ccc;
  height: 80px;
  vertical-align: middle;
  display: inline-block;
}
</style>
