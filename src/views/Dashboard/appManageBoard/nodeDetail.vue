<template>
  <a-layout>
    <a-row
      style="background: #fff"
      type="flex"
      justify="space-between"
      align="top"
      :gutter="16"
    >
      <a-col :span="10">
        <div class="iot_view_node_detail_textCard">
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">节点编号：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.deviceProfileID }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">应用编号：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.applicationID }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">节点名称：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.name }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">入网方式：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.skipFCntCheck }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">协议版本：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.macVersion }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">频段：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.band }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">Class：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.class }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">"网络状态：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.netState }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">信号：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.sign }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">所在网关：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.gateway }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">AppKey：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.appKey }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">超时周期（分钟）：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.overTime }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">最后心跳时间：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.lastSeenAt }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">使用状态：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.useState }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">添加时间：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.createdAt }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">地理位置：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.area }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">节点描述：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.description }}
              </p>
            </a-col>
          </a-row>
        </div>
      </a-col>
      <a-col :span="14">
        <div class="iot_amap_app_nodeEdit_container">
          <el-amap vid="app_note_edit_map"> </el-amap>
        </div>
      </a-col>
    </a-row>

    <div style="background: #fff">
      <div
        id="myChartUp"
        :style="{ width: '100%', height: '300px', marginTop: '20px' }"
      />
      <div
        id="myChartDown"
        :style="{ width: '100%', height: '300px', marginTop: '12px' }"
      />
    </div>
  </a-layout>
</template>

<script>
import wifi_map from "@/assets/wifi.png";
export default {
  name: "nodeDetails",
  data() {
    return {
      //params
      id: "",
      appId: "",

      returnedData: {
        deviceProfileID: "",
        applicationID: "",
        name: "",
        skipFCntCheck: "",
        macVersion: "缺失",
        band: "缺失",
        class: "缺失",
        netState: "缺失",
        sign: "缺失",
        gateway: "",
        appKey: "",
        overTime: "",
        lastSeenAt: "",
        useState: "",
        createdAt: "",
        area: "",
        description: ""
      },

      //mapData
      mapObj: {},
      mapData: []
    };
  },
  beforeMount() {
    this.id = sessionStorage.getItem("devEUI");
    this.appId = sessionStorage.getItem("appId");

    this.$api.appManage
      .getAppNode({
        extra: this.id
      })
      .then(res => {
        let infoDataTemp = res.data;

        this.returnedData.deviceProfileID = infoDataTemp.device.deviceProfileID;
        this.returnedData.applicationID = infoDataTemp.device.applicationID;
        this.returnedData.name = infoDataTemp.device.name;
        this.returnedData.skipFCntCheck = infoDataTemp.device.skipFCntCheck;
        this.returnedData.macVersion = "暂定";
        this.returnedData.band = "暂定";
        this.returnedData.class = "暂定";
        this.returnedData.netState = "暂定";
        this.returnedData.sign = "暂定";
        this.returnedData.gateway = "暂定";
        this.returnedData.appKey = "暂定";
        this.returnedData.useState = "暂定";
        this.returnedData.createdAt = "暂定";
        this.returnedData.area = infoDataTemp.location;
        this.returnedData.description = infoDataTemp.device.description;
        this.returnedData.lastSeenAt = infoDataTemp.lastSeenAt;
      })
      .catch(err => {
        console.log(err);
      });

    this.$api.index
      .mapMarkers({})
      .then(res => {
        this.mapData = res.data.result;

        this.mapObj = new AMap.Map("app_note_edit_map", {
          // eslint-disable-line no-unused-vars
          resizeEnable: true, //自适应大小
          zoom: 14,
          center: this.mapData.center
        });
        let _slef = this;
        let startIcon = new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(25, 25),
          // 图标的取图地址
          image: wifi_map, // 您自己的图标
          // 图标所用图片大小
          imageSize: new AMap.Size(25, 25)
        });
        const marker = new AMap.Marker({
          // eslint-disable-line no-unused-vars
          map: _slef.mapObj,
          icon: startIcon,
          position: _slef.mapObj.center, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: "网关"
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    this.drawLineUp();
    this.drawLineDown();
  },
  methods: {
    drawLineUp() {
      // 基于准备好的dom，初始化echarts实例
      let myChartUp = this.$echarts.init(document.getElementById("myChartUp"));
      // 绘制图表
      myChartUp.setOption({
        title: { text: "上行数据统计(30天)" },
        tooltip: {},
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "20th",
            "21th",
            "22th",
            "23th",
            "24th",
            "25th",
            "26th",
            "27th",
            "28th",
            "29th",
            "30th",
            "31th",
            "1th",
            "2th",
            "3th",
            "4th",
            "5th",
            "6th",
            "7th",
            "8th",
            "9th",
            "10th",
            "11th",
            "12th",
            "13th",
            "14th",
            "15th",
            "16th",
            "17th",
            "18th"
          ]
        },
        itemStyle: {
          color: "#1eaf84"
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [
              5,
              7,
              4,
              0,
              7,
              12,
              27,
              27,
              27,
              27,
              27,
              7,
              27,
              2,
              27,
              27,
              2,
              7,
              27,
              7,
              7,
              5,
              7,
              4,
              2,
              6,
              54,
              1,
              4,
              2,
              5
            ],
            type: "line"
          }
        ]
      });
    },
    drawLineDown() {
      // 基于准备好的dom，初始化echarts实例
      let myChartDown = this.$echarts.init(
        document.getElementById("myChartDown")
      );
      // 绘制图表
      myChartDown.setOption({
        title: { text: "下行数据统计(30天)" },
        tooltip: {},
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "20th",
            "21th",
            "22th",
            "23th",
            "24th",
            "25th",
            "26th",
            "27th",
            "28th",
            "29th",
            "30th",
            "31th",
            "1th",
            "2th",
            "3th",
            "4th",
            "5th",
            "6th",
            "7th",
            "8th",
            "9th",
            "10th",
            "11th",
            "12th",
            "13th",
            "14th",
            "15th",
            "16th",
            "17th",
            "18th"
          ]
        },
        itemStyle: {
          color: "#1eaf84"
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [
              5,
              7,
              4,
              0,
              7,
              12,
              27,
              27,
              27,
              27,
              27,
              7,
              27,
              2,
              27,
              27,
              2,
              7,
              27,
              7,
              7,
              5,
              7,
              4,
              2,
              6,
              54,
              1,
              4,
              2,
              5
            ],
            type: "line"
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.iot_view_node_detail_textCard {
  border-style: solid;
  border-color: #e8e8e8;
  border-width: 1px;
  background: #fff;
}
.iot_view_node_detail_textCard_p {
  line-height: 24px;
  height: 24px;
  margin-bottom: 0;
  margin-left: 10px;
  font-size: 8px;
}
.iot_view_gatewayList_detail_textCard_text_dark {
  background: #f0f0f0;
}
.iot_view_gatewayList_detail_textCard_text_light {
  background: #fff;
}
.iot_amap_app_nodeEdit_container {
  height: 410px;
  width: 100%;
  margin-bottom: 10px;
}
</style>
