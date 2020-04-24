<template>
  <a-layout>
    <a-card style="width: 100%">
      <a-row style="padding-bottom: 8px">
        <a-col :span="24">
          <span style="font-size: 16px;font-weight: normal;color: black"
            >网关编号： {{ this.id }}</span
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
                {{ this.internalState }}
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
              <div style="font-size: 12px">{{ this.sign }}</div>
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
              <div style="font-size: 12px">{{ this.up }}</div>
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
              <div style="font-size: 12px">{{ this.down }}</div>
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
              <div style="font-size: 12px">{{ this.heartTime }}</div>
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
          <a-tab-pane tab="详细信息" key="1" style="height: auto">
            <Detail />
          </a-tab-pane>
          <a-tab-pane tab="最新一帧上行数据" key="2" style="height: auto">
            暂定
          </a-tab-pane>
          <a-tab-pane tab="配置修改" key="3" style="height: auto">
            <DeployEdit />
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-layout>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
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
      defaultTab: "1",
      id: "",

      //data
      internalState: "",
      sign: "",
      up: "",
      down: "",
      heartTime: ""
    };
  },
  beforeMount() {
    this.id = this.$route.query.id;
    this.defaultTab = this.$route.query.tab;
    this.$api.gateway
      .gatewayDetail({
        extra: this.id
      })
      .then(res => {
        this.infoData = res.data;
        if (res.data.lastSeenAt) {
          console.log("little test");
          this.internalState = "测试";
          this.heartTime = "有数据";
        } else {
          this.internalState = "离线";
          this.heartTime = "暂无数据";
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    // getTime(){
    //   let date = new Date();
    //   let seperator1 = "-";
    //   let seperator2 = ":";
    //   //以下代码依次是获取当前时间的年月日时分秒
    //   let year = date.getFullYear();
    //   let month = date.getMonth() + 1;
    //   let strDate = date.getDate();
    //   let minute = date.getMinutes();
    //   let hour = date.getHours();
    //   let second = date.getSeconds();
    //   //固定时间格式
    //   if (month >= 1 && month <= 9) {
    //     month = "0" + month;
    //   }
    //   if (strDate >= 0 && strDate <= 9) {
    //     strDate = "0" + strDate;
    //   }
    //   if (hour >= 0 && hour <= 9) {
    //     hour = "0" + hour;
    //   }
    //   if (minute >= 0 && minute <= 9) {
    //     minute = "0" + minute;
    //   }
    //   if (second >= 0 && second <= 9) {
    //     second = "0" + second;
    //   }
    //   let currentdateNow =  year + seperator1 + month + seperator1 + strDate
    //           + " " + hour + seperator2 + minute + seperator2 + second;
    //   return currentdateNow;
    // }
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
