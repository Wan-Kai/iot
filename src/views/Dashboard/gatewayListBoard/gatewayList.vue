<template>
  <a-layout style="background: #fff;padding: 0 14px 0">
    <div class="iot_view_gatewayManege_list_top">
      <a-input-search
        class="iot_view_gatewayManege_list_top_search"
        placeholder="请输入要查找的内容"
        style="width: 300px"
      />
      <div class="iot_view_gatewayManege_list_top_right">
        <a-button type="primary" icon="plus">
          节点注册
        </a-button>
        <a-button icon="download" style="margin-left: 20px">
          批量导入
        </a-button>
        <a-button icon="download" style="margin-left: 20px">
          批量导出
        </a-button>
      </div>
    </div>
    <a-table
      :columns="columns"
      :dataSource="interData"
      style="min-width: auto"
      class="iot_view_gatawayManage_table"
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
    title: "网关名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "网关ID",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "网络服务器",
    key: "server",
    dataIndex: "server"
  },
  {
    title: "频段/子网类型",
    key: "band",
    dataIndex: "band"
  },
  {
    title: "状态",
    key: "state",
    dataIndex: "state",
    scopedSlots: { customRender: "state" }
  },
  {
    title: "上行数据量(24h)",
    key: "up",
    dataIndex: "up"
  },
  {
    title: "下行数据量(24h)",
    key: "down",
    dataIndex: "down"
  },
  {
    title: "所在区域",
    key: "area",
    dataIndex: "area"
  },
  {
    title: "管理",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  data() {
    return {
      columns,
      interData: []
    };
  },
  beforeMount() {
    this.$api.gateway
      .gatewayData({
        page: 0
      })
      .then(res => {
        this.interData = res.data.gatewayTableData;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    checkRouter(data) {
      let id = data["number"];
      this.$router.push(
        "/admin/dashboard/gatewayListBoard/check/".concat(id.toString())
      );
      console.log(id);
    },
    editRouter(data) {
      let id = data["number"];
      this.$router.push(
        "/admin/dashboard/gatewayListBoard/edit/".concat(id.toString())
      );
      console.log(data);
    }
  }
};
</script>

<style>
.iot_view_gatewayManege_list_top {
  width: 100%;
  margin-bottom: 14px;
}
.iot_view_gatewayManege_list_top_search {
  float: left;
  margin-top: 5px;
}
.iot_view_gatewayManege_list_top_right {
  float: right;
}
.iot_view_gatawayManage_table {
  margin-top: 5px;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 8px 8px;
}
</style>
