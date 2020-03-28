<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div class="iot_view_userManage_top">
      <a-row>
        <a-col :span="8" style="float: left">
          <a-input-search
            class="iot_view_userManage_top_search"
            placeholder="请输入要查找的内容"
            style="width: 300px;float: left"
          />
        </a-col>
        <a-col :span="8" :offset="8">
          <a-button
            type="primary"
            icon="plus"
            style="float: right"
            @click="addUser"
          >
            添加账号
          </a-button>
        </a-col>
      </a-row>
    </div>
    <div class="iot_view_userManage_table_layout">
      <a-table
        :rowSelection="rowSelection"
        :columns="columns"
        :dataSource="interData"
        style="min-width: auto"
        class="iot_view_userManage_table"
        :pagination="pagination"
        :rowKey="record => record.uid"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="checkRouter(record)">查看</a>
          <a-divider type="vertical" />
          <a @click="editRouter(record)">编辑</a>
        </span>
      </a-table>
      <div class="iot_view_userManage_button_content">
        <a-button icon="delete">删除</a-button>
      </div>
    </div>
  </a-layout>
</template>

<script>
import ACol from "ant-design-vue/es/grid/Col";
const columns = [
  {
    title: "手机号",
    dataIndex: "phoneNumber",
    key: "phoneNumber"
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email"
  },
  {
    title: "单位",
    key: "unit",
    dataIndex: "unit"
  },
  {
    title: "备注",
    key: "description",
    dataIndex: "description"
  },
  {
    title: "角色",
    key: "role",
    dataIndex: "role"
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
  components: { ACol },
  data() {
    return {
      columns,
      interData: [],

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
    this.$api.usersManage
      .usersData({
        page: 0
      })
      .then(res => {
        this.interData = res.data.result;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    checkRouter(record) {
      this.$router.push({
        name: "checkUser",
        query: { number: record["phoneNumber"], id: "1" }
      });
    },
    editRouter(record) {
      this.$router.push({
        name: "editUser",
        query: { number: record["phoneNumber"], id: "1" }
      });
    },
    addUser() {
      this.$router.push({
        name: "addUser"
      });
    }
  }
};
</script>

<style>
.iot_view_userManage_top {
  width: 100%;
  margin-bottom: 14px;
  margin-top: 14px;
}
.iot_view_userManage_table_layout {
  min-height: fit-content;
}
.iot_view_userManage_button_content {
  float: left;
  margin-top: -40px;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 8px 8px;
}
</style>
