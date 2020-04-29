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
          <a-row class="black">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">节点编号:</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.id }}
              </p>
            </a-col>
          </a-row>
          <a-row class="light">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">节点名称:</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.name }}
              </p>
            </a-col>
          </a-row>
          <a-row class="black">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">入网方式:</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.getSupportJoinType }}
              </p>
            </a-col>
          </a-row>
          <a-row class="light">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">协议版本:</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.macVersion }}
              </p>
            </a-col>
          </a-row>
          <a-row class="black">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">超时周期（分钟）:</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.overTime }}
              </p>
            </a-col>
          </a-row>
          <a-row class="light">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">使用状态:</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.getNodeState }}
              </p>
            </a-col>
          </a-row>
          <a-row class="black">
            <a-col :span="8">
              <p class="iot_view_node_detail_textCard_p">添加时间:</p>
            </a-col>
            <a-col :span="16">
              <p class="iot_view_node_detail_textCard_p">
                {{ this.returnedData.createdAt }}
              </p>
            </a-col>
          </a-row>
        </div>
      </a-col>
      <a-col :span="14"> </a-col>
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
export default {
  components: { ACol, ARow },
  data() {
    return {
      isDark: false,

      returnedData: {
        id: "",
        name: "",
        supportsJoinType: "",
        macVersion: "",
        overTime: "",

        createdAt: "",
        updatedAt: ""
      },

      deviceDetail: {
        devEUI: ""
      }
    };
  },

  computed: {
    getNodeState() {
      if (
        this.common.isEmpty(this.deviceDetail.devEUI) ||
        this.deviceDetail.devEUI === "0000000000000000"
      )
        return "未部署";
      else return "已部署";
    },

    getSupportJoinType() {
      if (this.returnedData.supportsJoin) {
        return "OTAA";
      } else return "ABP";
    }
  },

  beforeMount() {
    this.returnedData.id = this.$route.query.id;
    this.deviceDetail.devEUI = this.$route.query.devEUI;
    this.getDeviceProfileDetail();
  },

  mounted() {
    this.drawLineUp();
    this.drawLineDown();
  },
  methods: {
    getDeviceProfileDetail() {
      this.$api.node
        .getDeviceProfileById({
          extra: this.returnedData.id
        })
        .then(res => {
          let data = res.data;
          //console.log(data);

          let infoDataTemp = data.deviceProfile;
          this.returnedData.createdAt = data.createdAt;
          this.returnedData.updatedAt = data.updatedAt;
          this.returnedData.name = infoDataTemp.name;
          this.returnedData.macVersion = infoDataTemp.macVersion;
          this.returnedData.supportsJoin = infoDataTemp.supportsJoin;
        })
        .catch(err => {
          console.log(err);
        });
    },

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
  font-size: 10px;
}
.black {
  background: #f0f0f0;
}
.light {
  background: #fff;
}
.iot_amap_noteDetail_container {
  height: 410px;
  width: 100%;
}
</style>
