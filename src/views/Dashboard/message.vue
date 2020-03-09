<template>
  <a-layout style="background: #fff;padding: 0 14px 0">
    <div class="iot_view_internetServer_top">
      <a-input-search
        class="iot_view_message_top_search"
        placeholder="请输入要查找的内容"
        style="width: 300px;height: 26px"
      />
    </div>
    <div class="iot_view_message_table_layout">
      <a-table
        :rowSelection="rowSelection"
        :columns="columns"
        :dataSource="interData"
        style="min-width: auto"
        class="iot_view_message_table"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="checkRouter(record)">查看</a>
        </span>
      </a-table>
      <a-button class="iot_view_message_button">删除</a-button>
    </div>
  </a-layout>
</template>

<script>
const columns = [
  {
    title: "标题",
    dataIndex: "title",
    key: "title"
  },
  {
    title: "时间",
    key: "time",
    dataIndex: "time"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  }
};
export default {
  data() {
    return {
      columns,
      interData: [],
      rowSelection
    };
  },
  beforeMount() {
    this.$api.interServer
      .getMessage({
        page: 0
      })
      .then(res => {
        this.interData = res.data.message;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    checkRouter(data) {
      let id = data["title"];
      this.$router.push(
        "/admin/dashboard/messageBoard/check/".concat(id.toString())
      );
      console.log(id);
    }
  }
};
</script>

<style>
.iot_view_internetServer_top {
  width: 100%;
  margin-top: 14px;
  margin-bottom: 14px;
  padding-bottom: 30px;
  height: 26px;
  line-height: 26px;
}
.iot_view_message_top_search {
  float: left;
}
.iot_view_message_table {
}
.iot_view_message_button {
  float: left;
  margin-top: -48px;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 8px 8px;
}
.ant-input {
  height: 28px;
  line-height: 28px;
}
</style>
