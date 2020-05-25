<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div class="iot_view_top">
      <a-row>
        <a-col :span="8">
          <a-input-group compact style="float: left;width: 100%">
            <a-input
              style="width: 40%;float: left;text-align: left"
              placeholder="请输入编号查询"
            />
            <a-select style="width: 40%;float: left;text-align: left">
              <a-select-option value="0">未部署</a-select-option>
              <a-select-option value="1">已部署</a-select-option>
            </a-select>
            <a-button style="float: left" icon="search" />
          </a-input-group>
        </a-col>
        <a-col :span="8" :offset="8">
          <a-button
            type="primary"
            icon="plus"
            @click="addNode"
            style="float:right;"
          >
            新增节点规范
          </a-button>
          <!--
          <a-button
            style="margin: 0 22px"
            icon="download"
            @click="handleImport"
          >
            批量导入
          </a-button>
          -->
          <!--
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
                :loading="importDialogVisibleState"
                @click="handleImportOk"
                style="margin-right: 8px"
              >
                确定
              </a-button>
              {{ this.warning }}
            </p>

            <a-card class="iot_view_in_card">
              <p style="margin-bottom: 0">Some contents...</p>
              <p style="margin-bottom: 0">Some contents...</p>
            </a-card>
          </a-modal>
          -->
          <!--
          <a-button icon="download" @click="handleExport">
            批量导出
          </a-button>
          -->
          <!--
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
          -->
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
        :rowKey="record => record.uid"
        :loading="tableLoadingState"
      >
        <span slot="state" slot-scope="text, record">
          <span>
            {{ record.device.devEUI | nodeState }}
          </span>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="check(record)">查看</a>
          <a-divider type="vertical" />
          <a @click="edit(record)">编辑</a>
        </span>
      </a-table>
      <div class="iot_view_button_layout">
        <a-button class="iot_view_button_delete" icon="delete">删除</a-button>
        <a-button class="iot_view_button_export" icon="download">导出</a-button>
      </div>
    </div>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
import { getNetworkServerNameById } from "@/utils/util";
const columns = [
  {
    title: "节点规范ID",
    dataIndex: "device_profile_id",
    key: "device_profile_id"
  },
  {
    title: "节点规范名称",
    dataIndex: "device_profile_name",
    key: "device_profile_name"
  },
  {
    title: "网络服务器",
    dataIndex: "networkServerName",
    key: "networkServerName "
  },
  /*
  {
    title: "协议版本",
    dataIndex: "macVersion",
    key: "macVersion "
  },
  {
    title: "入网方式",
    dataIndex: "supportsJoinType",
    key: "supportsJoinType "
  },

  {
    title: "使用状态",
    key: "state",
    scopedSlots: { customRender: "state" }
  },
  */
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
  components: { ACol, ARow },
  data() {
    return {
      //table
      columns,
      tableData: [],
      tableLoadingState: true,

      returnedData: [
        {
          device_profile_id: "",
          device_profile_name: "",
          network_server_id: "",
          networkServerName: "",

          organization_id: "",

          /*
          device: {
            devEUI: "",
            deviceStatusBattery: "",
            deviceStatusMargin: "",
            deviceStatusExternalPowerSource: "",
            deviceStatusBatteryLevelUnavailable: "",
            deviceStatusBatteryLevel: "",
            province: "",
            city: "",
            district: "",
            firstSeenAt: "",
            lastSeenAt: ""
          },
          */
          createdAt: "",
          updatedAt: ""
        }
      ],

      importLoadingState: false,
      importDialogVisibleState: false,

      exportLoadingState: false,
      exportDialogVisibleState: false,

      address: "E/admin",
      warning: "警告信息",

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
      this.$api.node
        //.getDeviceProfileAndDevice({
        .getDeviceProfile({
          limit: 100
        })
        .then(res => {
          this.returnedData = [];

          if (res.status === 200) {
            var result = res.data.result;
            for (let i = 0; i < result.length; i++) {
              var item = {
                device_profile_id: result[i].id,
                device_profile_name: result[i].name,
                network_server_id: result[i].networkServerID,
                networkServerName: "",
                organization_id: result[i].organizationID,
                createdAt: result[i].createdAt
              };
              item.networkServerName = getNetworkServerNameById(
                item.network_server_id
              );
              this.returnedData.push(item);
            }
            this.tableData = this.returnedData;
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.tableLoadingState = false;
        });
    },

    getServerName(record) {
      //alert(record.network_server_id);
      return getNetworkServerNameById(record.network_server_id);
    },

    addNode() {
      this.$router.push({
        name: "addNodeManage"
      });
    },
    check(data) {
      this.$router.push({
        name: "checkNodeManage",
        query: {
          id: data["device_profile_id"],
          //devEUI: data["device"]["devEUI"],
          tab: "1"
        }
      });
    },
    edit(data) {
      this.$router.push({
        name: "checkNodeManage",
        query: {
          id: data["device_profile_id"],
          //devEUI: data["device"]["devEUI"],
          tab: "2"
        }
      });
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
    }
  }
};
</script>

<style>
.iot_view_top {
  width: 100%;
  margin-bottom: 14px;
  margin-top: 14px;
}
.iot_view_table_layout {
  min-height: fit-content;
}
.iot_view_in_card {
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
.iot_view_button_export {
  margin-left: 10px;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 8px 8px;
}
</style>
