<template>
  <div>
    <div class="iot_view_internetServer_top">
      <a-input-search
        class="iot_view_message_top_search"
        placeholder="请输入要查找的内容"
        style="width: 200px"
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
        <span slot="action">
          <a href="javascript:;">查看</a>
        </span>
      </a-table>
    </div>
  </div>
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
  }
};
</script>

<style scoped>
.iot_view_internetServer_top {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 30px;
}
.iot_view_message_top_search {
  float: left;
}
.iot_view_message_table {
}
</style>
