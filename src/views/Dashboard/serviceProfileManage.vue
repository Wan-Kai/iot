<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div class="iot_view_top">
      <a-row>
        <a-col :span="12">
          <a-input-search
            class="iot_view_top_search"
            placeholder="请输入要查找的内容"
          />
        </a-col>
        <a-col :span="8" :offset="4">
          <a-button
            type="primary"
            icon="plus"
            @click="createServiceProfile"
            style="float: right"
          >
            添加服务
          </a-button>
        </a-col>
      </a-row>
    </div>
    <div class="iot_view_table_layout">
      <a-table
        :columns="columns"
        :dataSource="tableData"
        style="min-width: auto"
        class="iot_view_table"
        :pagination="pagination"
        :loading="tableLoadingState"
        :rowKey="record => record.name"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="checkRouter(record)">查看</a>
          <a-divider type="vertical" />
          <a @click="editRouter(record)">编辑</a>
        </span>
      </a-table>
      <div class="iot_view_button">
        <a-button v-if="!tableLoadingState">批量选择</a-button>
        <a-button
          v-if="!tableLoadingState"
          @click="handleDelete"
          style="margin: 0 20px"
          icon="delete"
          >删除</a-button
        >
      </div>
    </div>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
const columns = [
  {
    title: "服务名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "企业",
    key: "organizationName",
    dataIndex: "organizationName"
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

import { getOrganizationNameById } from "@/utils/util";
export default {
  name: "serviceProfileManage",
  data() {
    return {
      columns,
      tableData: [],
      messageDetail: [],
      tableLoadingState: true,

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
    this.getTable();
  },
  methods: {
    getTable() {
      this.$api.serviceProfile
        .getServices({
          limit: 100
        })
        .then(res => {
          console.log(res);
          let returnedData = res.data.result;

          for (let i = 0; i < returnedData.length; i++) {
            var item = returnedData[i];
            item.organizationName = getOrganizationNameById(
              item.organizationID
            );
            if (this.common.isEmpty(item.organizationName)) continue;
            this.tableData.push(item);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.tableLoadingState = false;
        });
    },

    createServiceProfile() {
      this.$router.push({
        name: "serviceProfileManageAdd"
      });
    },

    checkRouter(record) {
      console.log(record);
      this.$router.push({
        name: "serviceProfileManageCheck",
        query: { id: record.id, tab: "1" }
      });
    },
    editRouter(record) {
      console.log(record);
      this.$router.push({
        name: "serviceProfileManageEdit",
        query: { id: record.id, tab: "2" }
      });
    },
    handleDelete() {}
  }
};
</script>

<style>
.iot_view_top {
  width: 100%;
  margin-top: 14px;
  margin-bottom: 14px;
  padding-bottom: 30px;
  height: 26px;
  line-height: 26px;
}
.iot_view_top_search {
  float: left;
  width: 300px;
  text-align: left;
}
.iot_view_table_layout {
  min-height: fit-content;
}
.iot_view_table {
}
.iot_view_button {
  float: left;
  margin-top: -40px;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 8px 8px;
}
</style>
