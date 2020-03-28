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
              <p class="iot_view_gatewayList_detail_textCard_p">网关编号：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.infoData.number }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">网关名称：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.infoData.name }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">网关ID：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.infoData.id }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">网络服务器：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.infoData.internalServer }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">通信模式：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.infoData.massageMode }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">频段：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.infoData.band }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">状态：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.infoData.state }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">信号：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.infoData.single }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">
                上行数据量(24h)：
              </p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.infoData.up }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">
                下行数据量(24h)：
              </p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.infoData.down }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">
                最后心跳时间：
              </p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.infoData.heartTime }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">添加时间：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.infoData.addTime }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">经纬度：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.infoData.location }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">海拔：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.infoData.height }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">地理位置：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.infoData.height }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_gatewayList_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_gatewayList_detail_textCard_p">网关描述：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_gatewayList_detail_textCard_p">
                {{ this.infoData.description }}
              </p>
            </a-col>
          </a-row>
        </div>
      </a-col>
      <a-col :span="14">
        <div class="iot_amap-gatewayDetail-container">
          <el-amap
            vid="gateway_detail"
            :center="center"
            :map-manager="amapManager"
            :zoom="zoom"
            :events="events"
            class="iot_amap_gateawyNode_demo"
          >
          </el-amap>
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
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";

let amapManager = new VueAMap.AMapManager();
export default {
  components: { ACol, ARow },

  data() {
    return {
      infoData: {
        number: "",
        name: "",
        id: "",
        internalServer: "",
        massageMode: "",
        band: "",
        state: "",
        single: "",
        up: "",
        down: "",
        heartTime: "",
        addTime: "",
        location: "",
        height: "",
        area: "",
        description: ""
      },

      echartUp: {},
      echartDown: {},

      zoom: 14,
      center: [114.362272, 30.532565],
      amapManager,
      events: {
        init(map) {
          //map.setMapStyle("amap://styles/whitesmoke");
          AMapUI.loadUI(["overlay/SimpleMarker"], function(SimpleMarker) {
            const marker = new SimpleMarker({
              iconLabel: "A",
              iconStyle: "blue",
              map: map,
              position: map.getCenter()
            });
            map.add(marker);
          });
        }
      }
    };
  },

  beforeMount() {
    this.$api.gateway
      .gatewayDetailData({
        id: this.number
      })
      .then(res => {
        this.infoData = res.data.result;
        console.log(res.data.result);
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
  font-size: 8px;
}
.iot_view_gatewayList_detail_textCard_text_dark {
  background: #f0f0f0;
}
.iot_amap-gatewayDetail-container {
}
.iot_amap_gateawyNode_demo {
  height: 384px;
}
.iot_view_gatewayList_detail_textCard_text_light {
  background: #fff;
}
</style>
