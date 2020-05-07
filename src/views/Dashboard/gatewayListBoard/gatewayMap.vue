<template>
  <a-layout style="background: #fff;padding: 0 14px 0">
    <a-row :gutter="16">
      <a-col :span="16">
        <div>
          <span style="font-size: 14px">网关数：{{ gatewayNum }}</span>
          <span style="font-size: 14px;margin: 0 20px">在线：{{ online }}</span>
          <span style="font-size: 14px">掉线：{{ outline }}</span>
        </div>
        <div style="margin-top: 10px">
          <div class="iot_amap-gatewayMap_container">
            <el-amap vid="gateway_map"> </el-amap>
          </div>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="margin-top: 8px">
          <a-input-search
            class="iot_view_gatewayMap_top_search"
            placeholder="请输入要查找的内容"
          />
        </div>
        <div style="margin-top: 18px">
          <a-table
            :columns="columns"
            :dataSource="tableData"
            style="min-width: auto"
            class="iot_view_internetServer_table"
            :pagination="pagination"
          >
            <span slot="action" slot-scope="text, record">
              <a @click="checkGateway(record)">查看</a>
              <a-divider type="vertical" />
              <a @click="editGateway(record)">编辑</a>
            </span>
          </a-table>
        </div>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
const columns = [
  {
    title: "网关编号",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "管理",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];
import ACol from "ant-design-vue/es/grid/Col";
import wifi_map from "../../../assets/wifi.png";
export default {
  data() {
    return {
      //data
      gatewayNum: 10,
      online: "暂定",
      outline: "暂定",

      //tableData
      columns,
      tableData: [],
      mapData: {},

      pagination: {
        size: "small",
        defaultPageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        buildOptionText(value) {
          return `${value.value} 条/页`;
        },
        showSizeChanger: true,
        pageSizeOptions: ["5", "10"],
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize)
      }
    };
  },
  beforeMount() {
    this.infoData();
  },
  mounted() {},
  methods: {
    infoData() {
      this.$api.gateway
        .gatewayList({
          limit: 1000
        })
        .then(res => {
          this.gatewayNum = res.data.totalCount;
          this.tableData = res.data.result;
          this.drawMap();
        })
        .catch(err => {
          console.log(err);
        });
    },
    drawMap() {
      let mapObj = new AMap.Map("gateway_map", {
        // eslint-disable-line no-unused-vars
        resizeEnable: true, //自适应大小
        center: new AMap.LngLat(
          this.tableData[0].location.longitude,
          this.tableData[0].location.latitude
        )
      });

      let startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(25, 25),
        // 图标的取图地址
        image: wifi_map, // 您自己的图标
        // 图标所用图片大小
        imageSize: new AMap.Size(25, 25)
      });

      this.tableData.forEach(item => {
        const marker = new AMap.Marker({
          // eslint-disable-line no-unused-vars
          map: mapObj,
          icon: startIcon,
          position: new AMap.LngLat(
            item.location.longitude,
            item.location.latitude
          ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: item.name
        });
      });

      //自适应多个标记点
      let newCenter = mapObj.setFitView(); // eslint-disable-line no-unused-vars
    },
    checkGateway(data) {
      this.$router.push({
        name: "checkGatewayManage",
        query: { id: data["id"], tab: "1" }
      });
    },
    editGateway(data) {
      this.$router.push({
        name: "checkGatewayManage",
        query: { id: data["id"], tab: "3" }
      });
    }
  },
  components: { ACol }
};
</script>

<style>
.iot_view_gatewayMap_top_search {
  width: 100%;
}
.iot_amap-gatewayMap_container {
  height: 400px;
  width: 100%;
}
</style>
