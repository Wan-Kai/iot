<template>
  <a-layout style="background: #fff;padding: 0 14px 0">
    <a-row>
      <a-col :span="16">
        <div>
          <span style="font-size: 14px">网关数：{{ gatewayNum }}</span>
          <span style="font-size: 14px;margin: 0 20px">在线：{{ online }}</span>
          <span style="font-size: 14px">掉线：{{ outline }}</span>
        </div>
        <div style="margin-top: 10px">
          <img
            src="../../../assets/map.png"
            style="height: 412px;display: inherit"
          />
        </div>
      </a-col>
      <a-col :span="8">
        <div style="margin-top: 8px">
          <a-input-search
            size="small"
            class="iot_view_gatewayMap_top_search"
            placeholder="请输入要查找的内容"
          />
        </div>
        <div style="margin-top: 18px">
          <a-table
            :columns="columns"
            :dataSource="interData"
            style="min-width: auto"
            class="iot_view_internetServer_table"
            :pagination="pagination"
            rowKey="id"
          >
            <span slot="action" slot-scope="text, record">
              <a @click="checkRouter(record)">查看</a>
              <a-divider type="vertical" />
              <a @click="editRouter(record)">编辑</a>
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
    dataIndex: "number",
    key: "number"
  },
  {
    title: "管理",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];
import ACol from "ant-design-vue/es/grid/Col";
export default {
  data() {
    return {
      gatewayNum: 10,
      online: 8,
      outline: 2,

      columns,
      interData: [],

      pagination: {
        size: "small",
        defaultPageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        buildOptionText(value) {
          return `${value.value} 条/页`;
        },
        showSizeChanger: true,
        pageSizeOptions: ["10", "15", "20"],
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize)
      }
    };
  },
  beforeMount() {
    this.$api.gateway
      .gatewayMap({
        page: 0
      })
      .then(res => {
        this.interData = res.data.gatewayMapData;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    checkRouter(data) {
      this.$router.push({
        name: "checkGatewayManage",
        query: { number: data["number"], id: "1" }
      });
    },
    editRouter(data) {
      this.$router.push({
        name: "checkGatewayManage",
        query: { number: data["number"], id: "3" }
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
</style>
