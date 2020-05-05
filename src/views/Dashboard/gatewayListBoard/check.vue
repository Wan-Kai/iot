<template>
  <a-layout>
    <a-card style="width: 100%">
      <a-row style="padding-bottom: 8px">
        <a-col :span="24">
          <span style="font-size: 16px;font-weight: normal;color: black"
            >网关MAC： {{ this.returnedData.id }}</span
          >
        </a-col>
      </a-row>
      <div class="iot_line" />
      <a-row type="flex" justify="space-around" style="margin-top: 8px">
        <a-col :span="5" style="width: 15%">
          <a-row type="flex" justify="space-around" align="middle">
            <a-col :span="8" style="height: 100%">
              <span
                class="iconfont icon-router_icon"
                style="font-size: 34px;color: #1eaf84;height: 12px;"
              ></span>
            </a-col>
            <a-col :span="16" style="text-align: left">
              <div style="font-size: 8px;color: #b0b0b0">网络状态</div>
              <div style="font-size: 12px">
                {{ this.getState }}
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="5" style="width: 15%">
          <a-row type="flex" justify="space-around" align="middle">
            <a-col :span="8" style="height: 100%">
              <span
                class="iconfont icon-wifi"
                style="font-size: 34px;color: #1eaf84;"
              ></span>
            </a-col>
            <a-col :span="16" style="text-align: left">
              <div style="font-size: 8px;color: #b0b0b0">信号</div>
              <div style="font-size: 12px">{{ this.getSign }}</div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="5" style="width: 15%">
          <a-row type="flex" justify="space-around" align="middle">
            <a-col :span="8" style="height: 100%">
              <span
                class="iconfont icon-router_icon"
                style="font-size: 34px;color: #1eaf84;"
              ></span>
            </a-col>
            <a-col :span="16" style="text-align: left">
              <div style="font-size: 8px;color: #b0b0b0">上行</div>
              <div style="font-size: 12px">{{ this.getUp }}</div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="5" style="width: 15%">
          <a-row type="flex" justify="space-around" align="middle">
            <a-col :span="8" style="height: 100%">
              <span
                class="iconfont icon-router_icon"
                style="font-size: 34px;color: #1eaf84;"
              ></span>
            </a-col>
            <a-col :span="16" style="text-align: left">
              <div style="font-size: 8px;color: #b0b0b0">下行</div>
              <div style="font-size: 12px">{{ this.getDown }}</div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="5" style="width: 15%">
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
                {{ this.returnedData.lastSeenAt }}
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
          :active-key="defaultTab"
          @change="changeTab"
          size="small"
          style="text-align: left;padding-top: 0;height: min-content"
        >
          <a-tab-pane tab="详细信息" key="1">
            <Detail ref="gatewayDetail" />
          </a-tab-pane>
          <a-tab-pane tab="最新一帧上行数据" key="2" forceRender>
            暂定
          </a-tab-pane>
          <a-tab-pane tab="配置修改" key="3">
            <DeployEdit ref="gatewayEdit" />
          </a-tab-pane>
          <!--          <a-tab-pane tab="详细信息" key="1" style="height: auto">-->
          <!--            <Detail />-->
          <!--          </a-tab-pane>-->
          <!--          <a-tab-pane tab="最新一帧上行数据" key="2" style="height: auto">-->
          <!--            暂定-->
          <!--          </a-tab-pane>-->
          <!--          <a-tab-pane tab="配置修改" key="3" style="height: auto;">-->
          <!--            <DeployEdit />-->
          <!--          </a-tab-pane>-->
        </a-tabs>
      </div>
    </a-layout>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import { getNetworkServerNameById, getAreaLabel } from "../../../utils/util";
import Detail from "./detailData";
import DeployEdit from "./deployEdit";
export default {
  components: {
    ARow,
    Detail,
    DeployEdit
  },
  data() {
    return {
      //data
      returnedData: {
        id: "",

        networkServerID: "",

        createdAt: "",
        updatedAt: "",

        firstSeenAt: "",
        lastSeenAt: ""
      },
      //params
      defaultTab: "1"
    };
  },

  computed: {
    getState() {
      return "off";
    },

    getSign() {
      return "off";
    },

    getUp() {
      return "";
    },

    getDown() {
      return "";
    },

    getArea() {
      return getAreaLabel(
        this.returnedData.province,
        this.returnedData.city,
        this.returnedData.district
      );
    },

    getServerName() {
      //debugger;
      return getNetworkServerNameById(this.returnedData.networkServerID);
    }
  },
  beforeMount() {
    this.returnedData.id = this.$route.query.id;
    this.defaultTab = this.$route.query.tab;

    this.getDetail(this.returnedData.id);
  },

  methods: {
    getDetail(id) {
      this.$api.gateway
        .gatewayDetail({
          extra: id
        })
        .then(res => {
          this.returnedData = res.data.gateway;
          this.returnedData.lastSeenAt = res.data.lastSeenAt;
          this.returnedData.firstSeenAt = res.data.firstSeenAt;
          /*
          if (res.data.lastSeenAt) {
            console.log("little test");
            this.returnedData.networkState = "测试";
            this.returnedData.heartTime = "有数据";
          } else {
            this.returnedData.networkState = "离线";
            this.returnedData.heartTime = "暂无数据";
          }
          */
        })
        .catch(err => {
          console.log(err);
        });
    },

    changeTab(key) {
      //alert(key);
      this.defaultTab = key;
      if (key == 1) {
        //this.$refs.gatewayDetail.getDetail(this.returnedData.id);
      } else if (key == 3) {
        //this.$refs.gatewayEdit.getDetail(this.returnedData.id);
      }
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
