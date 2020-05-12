<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div class="iot_view_top">
      <a-input-search
        class="iot_view_top_search"
        placeholder="请输入要查找的网络服务器"
      />
      <a-button
        class="iot_view_top_add"
        type="primary"
        icon="plus"
        @click="addNetworkServer"
      >
        添加服务器
      </a-button>
    </div>
    <div class="iot_view_table_layout">
      <a-table
        :columns="columns"
        :dataSource="tableData"
        style="min-width: auto"
        class="iot_view_table"
        :pagination="pagination"
        key="netWorkServerList"
        :rowKey="record => record.id"
        :loading="tableLoadingState"
      >
        //style="min-width: min-content" :scroll="{ x: min-content, y:
        min-content }"
        <span
          slot="gatewayDiscoveryEnabled"
          slot-scope="gatewayDiscoveryEnabled"
        >
          <a-tag
            :color="gatewayDiscoveryEnabled === true ? 'green' : 'red'"
            :key="gatewayDiscoveryEnabled"
          >
            {{ gatewayDiscoveryEnabled == true ? "ON" : "OFF" }}
          </a-tag>
        </span>
        <span slot="time"> 创建时间</span>
        <span slot="action" slot-scope="text, record">
          <a @click="checkNetworkServer(record)">查看</a>
          <a-divider type="vertical" />
          <a @click="editNetworkServer(record)">编辑</a>
        </span>
      </a-table>
    </div>
  </a-layout>
</template>

<script>
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "主机名",
    dataIndex: "ip",
    key: "ip"
  },
  {
    title: "端口",
    dataIndex: "port",
    key: "port"
  },
  {
    title: "网关发现",
    dataIndex: "gatewayDiscoveryEnabled",
    key: "gatewayDiscoveryEnabled",
    scopedSlots: { customRender: "gatewayDiscoveryEnabled" }
  },
  {
    title: "创建时间",
    key: "createdAt",
    dataIndex: "createdAt"
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
      tableLoadingState: true,
      returnedData: [
        {
          id: "",
          name: "",
          server: "",
          ip: "",
          port: "",
          gatewayDiscoveryEnabled: false,
          createdAt: "",
          updatedAt: ""
        }
      ],

      pagination: {
        size: "small",
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        buildOptionText(value) {
          return `${value.value} 条/页`;
        },
        showSizeChanger: true,
        pageSizeOptions: ["5", "10"],
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize)
      }
    };
  },
  beforeMount() {
    this.getTable();
  },
  methods: {
    getTable() {
      this.$api.networkServer
        .getServerData({
          limit: 10
        })
        .then(res => {
          this.returnedData = res.data.result;
          this.tableData = [];
          for (let i = 0; i < this.returnedData.length; i++) {
            let temp = {
              id: "",
              name: "",
              server: "",
              ip: "",
              port: "",
              gatewayDiscoveryEnabled: false,
              createdAt: "",
              updatedAt: ""
            };
            if (this.returnedData[i].server.split(":")) {
              let server = this.returnedData[i].server.split(":");
              temp.ip = server[0];
              temp.port = server[1];
            } else {
              temp.ip = this.returnedData[i].server;
              temp.port = "";
            }
            temp.gatewayDiscoveryEnabled = false;
            temp.createdAt = this.returnedData[i].createdAt;
            temp.updatedAt = this.returnedData[i].updatedAt;
            temp.id = this.returnedData[i].id;
            temp.name = this.returnedData[i].name;
            temp.server = this.returnedData[i].server;

            this.tableData.push(temp);
          }
          this.tableLoadingState = false;
        })
        .catch(err => {
          console.log(err);
        });
    },

    addNetworkServer() {
      setTimeout(() => {
        this.$router.push("/admin/dashboard/networkServer/addNetworkServer");
      }, 100);
    },
    checkNetworkServer(currentRecord) {
      debugger;
      this.$router.push({
        name: "checkNetworkServer",
        query: {
          id: currentRecord["id"]
        }
      });
    },
    editNetworkServer(currentRecord) {
      this.$router.push({
        name: "editNetworkServer",
        query: {
          id: currentRecord["id"],
          server: currentRecord["IP"],
          port: currentRecord["port"]
        }
      });
    }
  }
};
</script>

<style>
/*.ant-input {*/
/*  height: 30px;*/
/*  line-height: 28px;*/
/*}*/
.iot_view_top_search {
  float: left;
  width: 300px;
  text-align: left;
}
.iot_view_top_add {
  float: right;
}
.iot_view_top {
  width: 100%;
  margin-top: 14px;
  margin-bottom: 14px;
}
.iot_view_top_button_text {
  color: white;
}
.iot_view_table_layout {
  min-height: fit-content;
}
.iot_view_table {
  font-size: 10px;
  line-height: 8px;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 8px 8px;
}
</style>
