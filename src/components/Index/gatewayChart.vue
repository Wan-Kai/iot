<template>
  <div style="width: available;height: 400px">
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
      this.drawLine();
    });
  },
  methods: {
    drawLine() {
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
          trigger: "none",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#fffff"
            }
          }
        },
        legend: {
          data: ["发送", "接收"],
          icon: "circle",
          right: 14
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
            ],
            axisLine: {
              show: false
            },
            axisPointer: {
              label: {
                formatter: function(params) {
                  return (
                    "发送 " +
                    params.value +
                    (params.seriesData.length
                      ? ": " + params.seriesData[0].data
                      : "") +
                    "\n" +
                    "接收 " +
                    params.value +
                    (params.seriesData.length
                      ? ": " + params.seriesData[1].data
                      : "")
                  );
                }
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "发送",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210, 220],
            color: "#2fe2ad",
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#2fe2ad"
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
                  color: "#3bc5ff"
                },
                {
                  offset: 1,
                  color: "#ffe"
                }
              ])
            },
            data: [220, 182, 191, 234, 290, 330, 310, 360],
            color: "#3bc5ff"
          }
        ]
      });
    }
  }
};
</script>

<style scoped></style>
