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
        <div class="iot_view_gatewayList_detail_textCard">
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">网关ID：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.id }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">网关名称：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.name }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">网络服务器：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.serverName }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">通信模式：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.massageMode }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">频段：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.band }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">状态：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.state }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">信号：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.single }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">
                上行数据量(24h)：
              </p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.up }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">
                下行数据量(24h)：
              </p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.down }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">
                最后心跳时间：
              </p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.lastSeenAt }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">添加时间：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.createdAt }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">经纬度：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.location.latitude + "/" + this.location.longitude }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">海拔：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.location.altitude }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">地理位置：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.area }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">网关描述：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.description }}
              </p>
            </a-col>
          </a-row>
        </div>
      </a-col>
      <a-col :span="14">
        <div class="iot_amap-gatewayDetail-container">
          <el-amap vid="gateway_detail"> </el-amap>
        </div>
      </a-col>
    </a-row>

    <div style="background: #fff">
      <div
        id="gateway_myChartUp"
        style="width: 100%; height:300px;margin-top: 30px"
      ></div>
      <div id="gateway_myChartDown" style="width: 100%; height:300px"></div>
    </div>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
import wifi_map from "../../../assets/wifi.png";
import { getNetServerNameById, getAreaLabel } from "../../../utils/util";
export default {
  components: { ACol, ARow },

  data() {
    return {
      name: "",
      gatewayProfileID: "",
      serverName: "",
      description: "",

      location: {
        latitude: "",
        longitude: "",
        altitude: ""
      },
      massageMode: "",
      band: "",
      state: "",
      single: "",
      up: "",
      down: "",
      lastSeenAt: "",
      createdAt: "",
      area: "",
      province: "",
      city: "",
      district: "",
      id: ""
    };
  },

  beforeMount() {
    this.id = this.$route.query.id;
    this.$api.gateway
      .gatewayDetail({
        extra: this.id
      })
      .then(res => {
        let infoData = res.data;
        console.log(infoData);
        this.area =
          infoData.gateway.province +
          "/" +
          infoData.gateway.city +
          "/" +
          infoData.gateway.district;

        this.name = infoData.gateway.name;
        this.gatewayProfileID = infoData.gateway.gatewayProfileID;
        this.serverName = getNetServerNameById(
          infoData.gateway.networkServerID
        );
        this.description = infoData.gateway.description;
        this.location = infoData.gateway.location;
        this.lastSeenAt = infoData.lastSeenAt;
        this.createdAt = infoData.createdAt;
        this.area = getAreaLabel(
          infoData.gateway.province,
          infoData.gateway.city,
          infoData.gateway.district
        );

        // let netServer = this.$store.getters.getNetServer;

        // this.infoData.gateway.serverName = "空";
        // for(let i=0;i<netServer.length;i++){
        //   if(netServer[i].id === this.infoData.gateway.id){
        //     this.infoData.gateway.serverName = netServer[i].name
        //   }
        // }

        let mapObj = new AMap.Map("gateway_detail", {
          // eslint-disable-line no-unused-vars
          resizeEnable: true, //自适应大小
          zoom: 14,
          center: [
            this.infoData.gateway.location.longitude,
            this.infoData.gateway.location.latitude
          ]
        });
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
          map: mapObj,
          icon: startIcon,
          position: mapObj.center, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: "网关"
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  updated() {
    this.drawLineUp();
    this.drawLineDown();
  },
  methods: {
    drawLineUp() {
      // 基于准备好的dom，初始化echarts实例
      let myChartUp = this.$echarts.init(
        document.getElementById("gateway_myChartUp")
      );
      myChartUp.clear();
      // 绘制图表
      myChartUp.setOption({
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
    },
    drawLineDown() {
      // 基于准备好的dom，初始化echarts实例
      let myChartDown = this.$echarts.init(
        document.getElementById("gateway_myChartDown")
      );
      myChartDown.clear();
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
.iot_view_gatewayList_detail_textCard {
  border-style: solid;
  border-color: #e8e8e8;
  border-width: 1px;
  background: #fff;
}
.iot_view_gatewayList_detail_textCard_p {
  line-height: 24px;
  height: 24px;
  margin-bottom: 0;
  margin-left: 10px;
  font-size: 10px;
}
.iot_view_gatewayList_detail_textCard_text_dark {
  background: #f0f0f0;
}
.iot_amap-gatewayDetail-container {
  height: 384px;
  width: 100%;
}
.iot_view_gatewayList_detail_textCard_text_light {
  background: #fff;
}
</style>
