<template>
  <div>
    <div class="iot_view_gatewayManege_list_top">
      <a-input-search
        class="iot_view_gatewayManege_list_top_search"
        placeholder="请输入要查找的内容"
        style="width: 300px"
      />
      <div class="iot_view_gatewayManege_list_top_right">
        <a-button type="primary" icon="plus">
          添加
        </a-button>
        <a-button icon="download" style="margin-left: 20px">
          批量导入
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

      <span slot="action">
        <a href="javascript:;">查看</a>
        <a-divider type="vertical" />
        <a href="javascript:;">编辑</a>
      </span>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "网络编号",
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
  }
};
</script>

<style scoped>
.iot_view_gatewayManege_list_top {
  width: 100%;
  margin-bottom: 20px;
  padding-bottom: 30px;
}
.iot_view_gatewayManege_list_top_search {
  float: left;
}
.iot_view_gatewayManege_list_top_right {
  float: right;
}
.iot_view_gatawayManage_table {
  line-height: 1;
}
</style>
