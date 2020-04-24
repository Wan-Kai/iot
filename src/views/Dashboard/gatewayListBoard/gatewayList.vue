<template>
  <a-layout style="background: #fff;padding: 0 14px 0">
    <div class="iot_view_gatewayManege_list_top">
      <a-input-search
        class="iot_view_gatewayManege_list_top_search"
        placeholder="请输入要查找的内容"
        style="width: 300px"
      />
      <div class="iot_view_gatewayManege_list_top_right">
        <a-button type="primary" icon="plus" @click="addGateway">
          添加
        </a-button>
        <a-button
          icon="download"
          style="margin-left: 20px"
          @click="showAddModalIn"
        >
          批量导入
        </a-button>
        <a-modal
          v-model="importDialogVisibleState"
          title="节点批量导入"
          @onOk="handleImportOk"
        >
          <template slot="footer">
            <a-button key="back" @click="handleImportCancel">取消</a-button>
          </template>
          <p>
            说明：仅支持扩展名为xlsx、csv格式的文件导入，<a>下载导入模板</a>
          </p>
          <p>
            <a-button style="margin-right: 8px">
              <a-icon type="folder-add" />
              选择文件
            </a-button>
            {{ this.address }}
          </p>

          <p style="color: red">
            <a-button
              key="submit"
              type="primary"
              :loading="importLoadingState"
              @click="handleImportOk"
              style="margin-right: 8px"
            >
              确定
            </a-button>
            {{ this.warning }}
          </p>

          <a-card class="iot_view_gatewayList_in_card">
            <p style="margin-bottom: 0">Some contents...</p>
            <p style="margin-bottom: 0">Some contents...</p>
          </a-card>
        </a-modal>
        <a-button
          icon="download"
          style="margin-left: 20px"
          @click="handleExport"
        >
          批量导出
        </a-button>
        <a-modal
          v-model="exportDialogVisibleState"
          title="节点批量导出"
          @onOk="handleExportOk"
        >
          <template slot="footer">
            <a-button key="back" @click="handleExportCancel">取消</a-button>
          </template>
          <p>内容尚待确定</p>
          <a-button
            key="submit"
            type="primary"
            :loading="exportLoadingState"
            @click="handleExportOk"
          >
            确定
          </a-button>
        </a-modal>
      </div>
    </div>
    <div>
      <a-table
        :rowSelection="rowSelection"
        :columns="columns"
        :dataSource="tableData"
        style="min-width: auto"
        class="iot_view_gatawayManage_table"
        :pagination="pagination"
        rowKey="id"
        :loading="tableLoadingState"
      >
        <span slot="state" slot-scope="tags">
          <a-tag :color="tags === 'on' ? 'green' : 'red'" :key="tags">
            {{ tags.toUpperCase() }}
          </a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="checkGateway(record)">查看</a>
          <a-divider type="vertical" />
          <a @click="editGateway(record)">编辑</a>
        </span>
      </a-table>
      <div class="iot_view_gatewayList_button_layout">
        <a-button
          class="iot_view_gatewayList_delete_button"
          icon="delete"
          @click="deleteGateway"
          >删除</a-button
        >
        <a-button
          class="iot_view_gatewayList_export_button"
          icon="download"
          @click="exportGateway"
          >导出</a-button
        >
      </div>
    </div>
  </a-layout>
</template>

<script>
import { getAreaLabel, getNetworkServerNameById } from "@/utils/util";

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
const columns = [
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
    key: "networkServerName",
    dataIndex: "networkServerName"
  },
  {
    title: "通信方式/频段",
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
      tableData: [],

      rowSelection,
      tableLoadingState: true,

      //importControl
      importLoadingState: false,
      importDialogVisibleState: false,

      //exportControl
      exportLoadingState: false,
      exportDialogVisibleState: false,

      //importData
      address: "E/admin",
      warning: "警告信息",

      pageSize: "",
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
    this.$api.gateway
      .gatewayList({
        limit: 100
      })
      .then(res => {
        let returnedData = res.data.result;
        // this.tableData = res.data.result;

        //console.log(returnedData);
        for (let i = 0; i < returnedData.length; i++) {
          returnedData[i].state = "off";
          returnedData[i].area = getAreaLabel(
            returnedData[i].province,
            returnedData[i].city,
            returnedData[i].district
          );
          returnedData[i].networkServerName = getNetworkServerNameById(
            returnedData[i].networkServerID
          );
        }
        this.tableData = returnedData;
      })
      .catch(err => {
        console.log("出现错误");
        console.log(err);
      })
      .finally(() => {
        this.tableLoadingState = false;
      });
  },
  methods: {
    checkGateway(currentRecord) {
      this.$router.push({
        name: "checkGatewayManage",
        query: { id: currentRecord["id"], tab: "1" }
      });
    },
    editGateway(currentRecord) {
      this.$router.push({
        name: "checkGatewayManage",
        query: { id: currentRecord["id"], tab: "3" }
      });
    },
    addGateway() {
      this.$router.push({ name: "addGatewayManage" });
    },

    showAddModalIn() {
      this.importDialogVisibleState = true;
    },

    handleImportOk() {
      this.importLoadingState = true;
      setTimeout(() => {
        this.importDialogVisibleState = false;
        this.importLoadingState = false;
      }, 3000);
    },
    handleImportCancel() {
      this.importDialogVisibleState = false;
    },

    handleExport() {
      this.exportDialogVisibleState = true;
    },
    handleExportOk() {
      this.exportLoadingState = true;
      setTimeout(() => {
        this.exportDialogVisibleState = false;
        this.exportLoadingState = false;
      }, 3000);
    },
    handleExportCancel() {
      this.exportDialogVisibleState = false;
    },
    deleteGateway() {},
    exportGateway() {}
  }
};
</script>

<style>
.iot_view_gatewayManege_list_top {
  width: 100%;
  margin-bottom: 8px;
}
.iot_view_gatewayManege_list_top_search {
  float: left;
}
.iot_view_gatewayManege_list_top_right {
  float: right;
}
.iot_view_gatawayManage_table {
  margin-top: 5px;
}
.iot_view_gatewayList_in_card {
  height: 200px;
  background: #dddddd;
}
.iot_view_gatewayList_button_layout {
  position: fixed;
  float: left;
  margin-top: -40px;
}

.iot_view_gatewayList_delete_button {
}
.iot_view_gatewayList_export_button {
  margin-left: 10px;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 8px 8px;
}
</style>
