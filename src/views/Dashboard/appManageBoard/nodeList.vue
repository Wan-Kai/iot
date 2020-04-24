<template>
  <div>
    <a-table
      :columns="columns"
      :dataSource="tableData"
      style="min-width: auto"
      class="iot_view_nodeManage_table"
      :pagination="pagination"
      rowKey="id"
    >
      <span slot="state" slot-scope="tags">
        <a-tag :color="tags === 'on' ? 'green' : 'red'" :key="tags">
          {{ tags.toUpperCase() }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="checkRouter(record)">查看</a>
        <a-divider type="vertical" />
        <a @click="editRouter(record)">编辑</a>
      </span>
    </a-table>
    <div class="iot_view_nodeManage_table_button_content">
      <a-button>批量选择</a-button>
      <a-button icon="delete" style="margin: 0 20px">删除</a-button>
      <a-button icon="download">导出</a-button>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: "节点编号",
    dataIndex: "devEUI",
    key: "devEUI"
  },
  {
    title: "节点名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "网络状态",
    key: "state",
    dataIndex: "state",
    scopedSlots: { customRender: "state" }
  },
  {
    title: "信号强度",
    key: "signal",
    dataIndex: "signal"
  },
  {
    title: "最后心跳时间",
    key: "heartTime",
    dataIndex: "heartTime"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  data() {
    return {
      columns,

      //params
      id: "",

      //tableData
      tableData: [],

      pagination: {
        size: "small",
        defaultPageSize: 10,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10"],
        buildOptionText(value) {
          return `${value.value} 条/页`;
        },
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize)
      }
    };
  },
  beforeMount() {
    this.id = this.$route.query.id;
    this.$api.node
      .getNodeInApp({
        applicationID: this.id,
        limit: 100
      })
      .then(res => {
        let infoDataTemp = res.data.result;
        infoDataTemp.forEach(item => {
          item.state = "off";
        });
        this.tableData = res.data.result;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    checkRouter(record) {
      this.$router.push({
        name: "checkNodeInApp",
        query: { id: record.devEUI, tab: "1" }
      });
    },
    editRouter(record) {
      this.$router.push({
        name: "checkNodeInApp",
        query: { id: record.devEUI, tab: "2" }
      });
    }
  }
};
</script>

<style>
.iot_view_nodeManage_table_button_content {
  float: left;
  margin-top: -40px;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 8px 8px;
}
</style>
