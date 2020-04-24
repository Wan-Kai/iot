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
          <a-row
            :class="{ black: item.dark }"
            v-for="item in infoData"
            :key="item.id"
          >
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">{{ item.title }}</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ item.value }}
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
      //tempData State  后续可能会变化
      infoData: [
        {
          title: "节点编号:",
          name: "",
          value: "result",
          id: "1",
          dark: true
        },
        {
          title: "应用编号:",
          name: "",
          value: "result2",
          id: "2",
          dark: false
        },
        {
          title: "节点名称:",
          name: "",
          value: "result2",
          id: "3",
          dark: true
        },
        {
          title: "入网方式:",
          name: "",
          value: "result",
          id: "4",
          dark: false
        },
        {
          title: "协议版本:",
          name: "",
          value: "result2",
          id: "5",
          dark: true
        },
        {
          title: "频段:",
          name: "",
          value: "result2",
          id: "6",
          dark: false
        },
        {
          title: "Class:",
          name: "",
          value: "result2",
          id: "7",
          dark: true
        },
        {
          title: "网络状态:",
          name: "",
          value: "result2",
          id: "8",
          dark: false
        },
        {
          title: "信号:",
          name: "",
          value: "result2",
          id: "9",
          dark: true
        },
        {
          title: "所在网关:",
          name: "",
          value: "result2",
          id: "10",
          dark: false
        },
        {
          title: "AppKey:",
          name: "",
          value: "result2",
          id: "11",
          dark: true
        },
        {
          title: "超时周期（分钟）:",
          name: "",
          value: "result",
          id: "12",
          dark: false
        },
        {
          title: "最后心跳时间:",
          name: "",
          value: "result",
          id: "13",
          dark: true
        },
        {
          title: "使用状态:",
          name: "",
          value: "result2",
          id: "14",
          dark: false
        },
        {
          title: "添加时间:",
          name: "",
          value: "result",
          id: "15",
          dark: true
        },
        {
          title: "地理位置:",
          name: "",
          value: "result",
          id: "16",
          dark: false
        },
        {
          title: "节点描述:",
          name: "",
          value: "result",
          id: "17",
          dark: true
        }
      ],

      //mapData
      mapObj: {},
      mapData: []
    };
  },
  beforeMount() {
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
.black {
  background: #f0f0f0;
}
.iot_amap_app_nodeEdit_container {
  height: 410px;
  width: 100%;
  margin-bottom: 10px;
}
</style>
