<template>
  <a-layout style="background: #fff;padding: 0 14px 0">
    <div class="iot_view_gatewayList_top">
      <a-input-search
        class="iot_view_top_search"
        placeholder="请输入要查找的网关"
        style="width: 300px"
      />
      <div class="iot_view_top_right">
        <a-button type="primary" icon="plus" @click="addGateway">
          添加
        </a-button>
        <a-button
          icon="download"
          style="margin-left: 20px"
          @click="handleImport"
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

          <a-card class="iot_view_card">
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
        class="iot_view_table"
        :pagination="pagination"
        :rowKey="record => record.id"
        :loading="tableLoadingState"
      >
        <span slot="state" slot-scope="state">
          <a-tag :color="state === 'on' ? 'green' : 'red'" :key="state">
            {{ state.toUpperCase() }}
          </a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="checkGateway(record)">查看</a>
          <a-divider type="vertical" />
          <a @click="editGateway(record)">编辑</a>
        </span>
      </a-table>
      <div class="iot_view_button_layout">
        <a-button
          class="iot_view_button_delete"
          icon="delete"
          @click="deleteGateway"
          >删除</a-button
        >
        <a-button
          class="iot_view_button_export"
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
    title: "网关MAC",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "网关名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "网络服务器",
    key: "networkServerName",
    dataIndex: "networkServerName"
  },
  {
    title: "通信模式",
    key: "modulation",
    dataIndex: "modulation"
  },
  {
    title: "频段",
    key: "channels",
    dataIndex: "channels"
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

      returnedData: [
        {
          id: "",
          name: "",
          description: "",

          networkServerID: "",
          networkServerName: "", //根据networkServerID计算得到

          organizationID: "",

          province: "",
          city: "",
          district: "",
          area: "", //根据省市区计算得到

          modulation: "",
          channels: "",

          createdAt: "",
          updatedAt: "",

          firstSeenAt: "",
          lastSeenAt: "",
          state: "" //根据最近在线时间计算
        }
      ],
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
    this.getTable();
  },

  methods: {
    getTable() {
      this.$api.gateway
        .gatewayList({
          limit: 100
        })
        .then(res => {
          this.returnedData = res.data.result;
          // this.tableData = res.data.result;

          //console.log(data);
          for (let i = 0; i < this.returnedData.length; i++) {
            this.returnedData[i].state = "off";
            this.returnedData[i].area = getAreaLabel(
              this.returnedData[i].province,
              this.returnedData[i].city,
              this.returnedData[i].district
            );
            this.returnedData[i].networkServerName = getNetworkServerNameById(
              this.returnedData[i].networkServerID
            );
          }
          this.tableData = this.returnedData;
        })
        .catch(err => {
          console.log("出现错误");
          console.log(err);
        })
        .finally(() => {
          this.tableLoadingState = false;
        });
    },
    checkGateway(currentRecord) {
      this.$router.push({
        name: "checkGatewayManage",
        query: { id: currentRecord["id"], tab: "1" }
      });
    },
    editGateway(currentRecord) {
      this.$router.push({
        name: "editGatewayManage",
        query: { id: currentRecord["id"], tab: "3" }
      });
    },
    addGateway() {
      this.$router.push({ name: "addGatewayManage" });
    },

    handleImport() {
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
.iot_view_gatewayList_top {
  width: 100%;
  margin-bottom: 8px;
  margin-top: 0;
}
.iot_view_top_search {
  float: left;
}
.iot_view_top_right {
  float: right;
}
.iot_view_table {
  margin-top: 5px;
}
.iot_view_card {
  height: 200px;
  background: #dddddd;
}
.iot_view_button_layout {
  position: fixed;
  float: left;
  margin-top: -40px;
}

.iot_view_button_delete {
}

.iot_view_button_import {
  margin-left: 10px;
}

.iot_view_button_export {
  margin-left: 10px;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 8px 8px;
}
</style>
