<template>
  <div style="width: available;height: 300px">
    <div
      id="gatewayChart"
      :style="{ height: '100%', background: '#fff', padding: '10px 10px' }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {
    setTimeout(() => {
      this.drawLineUp();
    });
  },
  methods: {
    drawLineUp() {
      // 基于准备好的dom，初始化echarts实例
      let myChartUp = this.$echarts.init(
        document.getElementById("gatewayChart")
      );
      // 绘制图表
      myChartUp.setOption({
        title: {
          text: "网关数据统计",
          textStyle: {
            fontSize: 14
          },
          subtext: "单位KBs"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#fffff"
            }
          }
        },
        legend: {
          data: ["发送", "接收"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "20",
          right: "20",
          bottom: "20",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "01-09",
              "01-10",
              "01-11",
              "01-12",
              "01-13",
              "01-14",
              "01-15",
              "01-16"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "发送",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210, 220],
            color: "#33FF66",
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#33FF66"
                },
                {
                  offset: 1,
                  color: "#ffe"
                }
              ])
            }
          },
          {
            name: "接收",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#0066FF"
                },
                {
                  offset: 1,
                  color: "#ffe"
                }
              ])
            },
            data: [220, 182, 191, 234, 290, 330, 310, 360],
            color: "#0066FF"
          }
        ]
      });
    }
  }
};
</script>

<style scoped></style>
