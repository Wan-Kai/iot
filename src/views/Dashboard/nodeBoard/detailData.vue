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
          <a-row class="iot_view_node_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">节点编号：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.infoData.number }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_node_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">应用编号：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.infoData.appNumber }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_node_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">节点名称：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.infoData.name }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_node_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">入网方式：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.infoData.getIntelWay }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_node_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">协议版本：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.infoData.version }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_node_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">频段：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.infoData.band }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_node_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">Class：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.infoData.class }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_node_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">网络状态：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.infoData.internalState }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_node_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">信号：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.infoData.sign }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_node_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">所在网关：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.infoData.gateway }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_node_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">AppKey：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.infoData.appKey }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_node_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">超时周期(分钟)：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.infoData.utroTime }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_node_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">最后心跳时间：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.infoData.heartTime }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_node_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">使用状态：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.infoData.useState }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_node_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">添加时间：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.infoData.addTime }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_node_detail_textCard_text_light">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">地理位置：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.infoData.area }}
              </p>
            </a-col>
          </a-row>
          <a-row class="iot_view_node_detail_textCard_text_dark">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">节点描述：</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.infoData.description }}
              </p>
            </a-col>
          </a-row>
        </div>
      </a-col>
      <a-col :span="14">
        <div class="iot_amap_noteDetail_container">
          <el-amap vid="note_detail_map"> </el-amap>
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
import wifi_map from "../../../assets/wifi.png";
export default {
  components: { ACol, ARow },
  data() {
    return {
      infoData: {}
    };
  },

  beforeMount() {
    this.$api.node
      .nodeDetailData({
        id: this.number
      })
      .then(res => {
        this.infoData = res.data.result;
        console.log(this.infoData);
        let mapObj = new AMap.Map("note_detail_map", {
          // eslint-disable-line no-unused-vars
          resizeEnable: true, //自适应大小
          zoom: this.infoData.zoom,
          center: this.infoData.center
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
.iot_view_node_detail_textCard_text_dark {
  background: #f0f0f0;
}
.iot_view_node_detail_textCard_text_light {
  background: #fff;
}
.iot_amap_noteDetail_container {
  height: 410px;
  width: 100%;
}
</style>
