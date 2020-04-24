<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div class="iot_view_nodeManage_top">
      <a-row>
        <a-col :span="8">
          <a-input-group compact style="float: left;width: 100%">
            <a-input
              style="width: 40%;float: left;text-align: left"
              placeholder="请输入编号查询"
            />
            <a-select style="width: 40%;float: left;text-align: left">
              <a-select-option value="test">研发测试</a-select-option>
              <a-select-option value="sell">销售</a-select-option>
            </a-select>
            <a-button style="float: left" icon="search" />
          </a-input-group>
        </a-col>
        <a-col :span="8" :offset="8">
          <a-button type="primary" icon="plus" @click="addNode">
            节点注册
          </a-button>
          <a-button
            style="margin: 0 22px"
            icon="download"
            @click="showImportModalIn"
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
                :loading="importDialogVisibleState"
                @click="handleImportOk"
                style="margin-right: 8px"
              >
                确定
              </a-button>
              {{ this.warning }}
            </p>

            <a-card class="iot_view_nodeManage_in_card">
              <p style="margin-bottom: 0">Some contents...</p>
              <p style="margin-bottom: 0">Some contents...</p>
            </a-card>
          </a-modal>
          <a-button icon="download" @click="showExportModalOut">
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
        </a-col>
      </a-row>
    </div>
    <div class="iot_view_nodeManage_table_layout">
      <a-table
        :columns="columns"
        :dataSource="tableData"
        style="min-width: auto"
        class="iot_view_nodeManage_table"
        :pagination="pagination"
        :rowKey="record => record.uid"
        :loading="tableLoadingState"
      >
        <span slot="state" slot-scope="tags">
          <a-tag :color="tags === 'on' ? 'green' : 'red'" :key="tags">
            {{ tags.toUpperCase() }}
          </a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="check(record)">查看</a>
          <a-divider type="vertical" />
          <a @click="edit(record)">编辑</a>
        </span>
      </a-table>
      <div class="iot_view_nodeManage_button_layout">
        <a-button class="iot_view_nodeManage_delete_button" icon="delete"
          >删除</a-button
        >
        <a-button class="iot_view_nodeManage_export_button" icon="download"
          >导出</a-button
        >
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
    title: "节点编号",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "节点名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "网络服务器",
    dataIndex: "server",
    key: "server "
  },
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
    key: "type",
    dataIndex: "type"
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
  components: { ACol, ARow },
  data() {
    return {
      //table
      columns,
      tableData: [],
      tableLoadingState: true,

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
  beforeMount() {
    this.$api.node
      .getNode({
        limit: 100
      })
      .then(res => {
        let infoDataTemp = res.data.result;
        console.log(res.data.result);
        for (let i = 0; i < infoDataTemp.length; i++) {
          infoDataTemp[i].server = getNetworkServerNameById(
            infoDataTemp[i].networkServerID
          );
        }
        this.tableData = infoDataTemp;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.tableLoadingState = false;
      });
  },
  methods: {
    addNode() {
      this.$router.push({
        name: "addNodeManage"
      });
    },
    check(data) {
      this.$router.push({
        name: "checkNodeManage",
        query: { id: data["id"], tab: "1" }
      });
    },
    edit(data) {
      this.$router.push({
        name: "checkNodeManage",
        query: { id: data["id"], tab: "2" }
      });
    },
    showImportModalIn() {
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

    showExportModalOut() {
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
.iot_view_nodeManage_top {
  width: 100%;
  margin-bottom: 14px;
  margin-top: 14px;
}
.iot_view_nodeManage_table_layout {
  min-height: fit-content;
}
.iot_view_nodeManage_in_card {
  height: 200px;
  background: #dddddd;
}
.iot_view_nodeManage_button_layout {
  position: fixed;
  float: left;
  margin-top: -40px;
}
.iot_view_nodeManage_delete_button {
}
.iot_view_nodeManage_export_button {
  margin-left: 10px;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 8px 8px;
}
</style>
