<template>
  <a-layout style="background: #fff;padding: 0 14px 0">
    <div class="iot_view_internetServer_top">
      <a-input-search
        class="iot_view_message_top_search"
        placeholder="请输入要查找的内容"
      />
    </div>
    <div class="iot_view_message_table_layout">
      <a-table
        :rowSelection="rowSelection"
        :columns="columns"
        :dataSource="interData"
        style="min-width: auto"
        class="iot_view_message_table"
        :pagination="pagination"
        rowKey="id"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="showModal(record)">查看</a>
        </span>
      </a-table>
      <a-button class="iot_view_message_button">删除</a-button>
      <a-modal v-model="visible" title="消息" onOk="handleOk">
        <template slot="footer">
          <a-button key="back" @click="handleCancel">关闭</a-button>
        </template>
        <p>标题：{{ this.title }}</p>
        <p>时间：{{ this.messageDetail.time }}</p>
        <p>内容：{{ this.messageDetail.content }}</p>
      </a-modal>
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
      rowSelection,
      title: "",

      messageDetail: {
        title: "",
        time: "",
        content: ""
      },

      visible: false,

      pagination: {
        size: "small",
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "15", "20"],
        buildOptionText(value) {
          return `${value.value} 条/页`;
        },
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize)
      }
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
    showModal(record) {
      console.log(record);
      this.visible = true;
      this.title = record.title.toString(); //检索条件

      this.$api.interServer
        .getMessageDetail({
          title: this.title
        })
        .then(res => {
          this.messageDetail = res.data.messageDetail[0];
          console.log(this.messageDetail);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCancel() {
      this.visible = false;
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
  width: 300px;
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
/*.ant-input {*/
/*  height: 28px;*/
/*  line-height: 28px;*/
/*}*/
</style>
