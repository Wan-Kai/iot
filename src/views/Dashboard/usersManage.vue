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
            添加用户
          </a-button>
        </a-col>
      </a-row>
    </div>
    <div class="iot_view_userManage_table_layout">
      <a-table
        :columns="columns"
        :dataSource="returnedData"
        style="min-width: auto"
        class="iot_view_userManage_table"
        :pagination="pagination"
        :rowKey="record => record.phonenumber"
      >
        <span slot="role" slot-scope="text, record">
          <span>
            {{ record.isAdmin | roleName }}
          </span>
        </span>

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
    dataIndex: "phonenumber",
    key: "phonenumber"
  },
  {
    title: "姓名",
    dataIndex: "username",
    key: "username"
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email"
  },

  {
    title: "备注",
    key: "note",
    dataIndex: "note"
  },
  {
    title: "角色",
    key: "role",
    scopedSlots: { customRender: "role" }
  },
  {
    title: "创建时间",
    key: "createdAt",
    dataIndex: "createdAt"
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
      tableData: [],

      returnedData: [
        {
          userID: "",
          username: "",
          isAdmin: false,
          isGatewayAdmin: false,
          isDeviceAdmin: false,
          createdAt: "",
          updatedAt: "",
          phonenumber: "",
          email: "",
          note: ""
        }
      ],
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

  computed: {
    currentOrganizationID() {
      return this.common.getCurrentOrganizationID();
    }
  },

  watch: {
    currentOrganizationID() {
      this.getTable();
    }
  },

  beforeMount() {
    this.getTable();
  },
  methods: {
    getTable() {
      this.$api.usersManage
        .getOrganizationUsers({
          limit: 100
        })
        .then(res => {
          if (res.status === 200) {
            this.returnedData = res.data.result;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    checkRouter(record) {
      this.$router.push({
        name: "checkUser",
        query: { id: record["userID"] }
      });
    },
    editRouter(record) {
      this.$router.push({
        name: "editUser",
        query: { id: record["userID"] }
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
