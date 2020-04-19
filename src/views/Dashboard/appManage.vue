<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div class="iot_view_appManage_top">
      <a-row>
        <a-col :span="12">
          <a-input-search
            class="iot_view_appManage_top_search"
            placeholder="请输入要查找的内容"
          />
        </a-col>
        <a-col :span="8" :offset="4">
          <a-button
            type="primary"
            icon="plus"
            @click="createApp"
            style="float: right"
          >
            应用申请
          </a-button>
        </a-col>
      </a-row>
    </div>
    <div class="iot_view_appManage_table_layout">
      <a-table
        :columns="columns"
        :dataSource="interData"
        style="min-width: auto"
        class="iot_view_appManage_table"
        :pagination="pagination"
        :rowKey="record => record.uid"
        :Key="record => record.uid"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="checkRouter(record)">查看</a>
          <a-divider type="vertical" />
          <a @click="editRouter(record)">编辑</a>
        </span>
      </a-table>
      <div class="iot_view_appManage_button">
        <a-button>批量选择</a-button>
        <a-button @click="handleDelete" style="margin: 0 20px" icon="delete"
          >删除</a-button
        >
        <a-button icon="download">导出</a-button>
      </div>
    </div>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
const columns = [
  {
    title: "应用编号",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "应用名称",
    key: "name",
    dataIndex: "name"
  },
  {
    title: "服务",
    key: "serviceProfileName",
    dataIndex: "serviceProfileName"
  },
  {
    title: "设备分配容量",
    key: "capacity",
    dataIndex: "capacity"
  },
  {
    title: "设备使用容量",
    key: "usedCapacity",
    dataIndex: "usedCapacity"
  },
  {
    title: "应用描述",
    key: "description",
    dataIndex: "description"
  },
  {
    title: "创建时间",
    key: "time",
    dataIndex: "time"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  components: { ACol, ARow },
  data() {
    return {
      columns,
      interData: [],
      messageDetail: [],

      pagination: {
        size: "small",
        defaultPageSize: 5,
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
    this.$api.appManage
      .getAppList({
        limit: 100
      })
      .then(res => {
        this.interData = res.data.result;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    createApp() {
      this.$router.push({
        name: "addApp"
      });
    },

    checkRouter(record) {
      console.log(record);
      this.$router.push({
        name: "checkApp",
        query: { number: record.id, tab: "1" }
      });
    },
    editRouter(record) {
      console.log(record);
      this.$router.push({
        name: "checkApp",
        query: { number: record.id, tab: "2" }
      });
    },
    handleCancel() {
      this.visible = false;
    },
    handleDelete() {
      // for(let item in messageSelectedRows ){
      //   this.$message.success("已删除"+ messageSelectedRows[item]);
      // }
      // this.$api.networkServer
      //         .deleteMessage(messageSelectedRows)
      //         .then(res => {
      //           this.interData = res.data.deletedMessage;
      //         })
      //         .catch(err => {
      //           console.log(err);
      //         });
    }
  }
};
</script>

<style>
.iot_view_appManage_top {
  width: 100%;
  margin-top: 14px;
  margin-bottom: 14px;
  padding-bottom: 30px;
  height: 26px;
  line-height: 26px;
}
.iot_view_appManage_top_search {
  float: left;
  width: 300px;
  text-align: left;
}
.iot_view_appManage_table_layout {
  min-height: fit-content;
}
.iot_view_appManage_table {
}
.iot_view_appManage_button {
  float: left;
  margin-top: -40px;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 8px 8px;
}
</style>
