<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div class="iot_view_internetServer_top">
      <a-input-search
        class="iot_view_internetServer_top_search"
        placeholder="请输入要查找的内容"
      />
      <a-button
        class="iot_view_internetServer_top_add"
        type="primary"
        icon="plus"
        @click="handleSubmit"
      >
        添加服务器
      </a-button>
    </div>
    <div class="iot_view_internetServer_table_layout">
      <a-table
        :columns="columns"
        :dataSource="tableData"
        style="min-width: auto"
        class="iot_view_internetServer_table"
        :pagination="pagination"
        :rowKey="record => record.uid"
        :loading="tableLoadingState"
      >
        //style="min-width: min-content" :scroll="{ x: min-content, y:
        min-content }"
        <span slot="tags" slot-scope="tags">
          <a-tag :color="tags === 'on' ? 'green' : 'red'" :key="tags">
            {{ tags.toUpperCase() }}
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
    dataIndex: "IP",
    key: "IP"
  },
  {
    title: "端口",
    dataIndex: "port",
    key: "port"
  },
  {
    title: "网关发现",
    dataIndex: "gateway",
    key: "gateway",
    scopedSlots: { customRender: "tags" }
  },
  {
    title: "创建时间",
    key: "time",
    dataIndex: "time"
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
          IP: "",
          name: "",
          server: "",
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
    this.$api.networkServer
      .getServerData({
        limit: 10
      })
      .then(res => {
        this.returnedData = res.data.result;

        let temp = {
          id: "",
          IP: "",
          port: "",
          gateway: "",
          time: "",
          name: ""
        };
        for (let i = 0; i < this.returnedData.length; i++) {
          if (this.returnedData[i].server.split(":")) {
            let server = this.returnedData[i].server.split(":");
            temp.IP = server[0];
            temp.port = server[1];
          } else {
            temp.IP = this.returnedData[i].server;
            temp.port = "";
          }
          temp.gateway = "off";
          temp.time = this.returnedData[i].createdAt;
          temp.id = this.returnedData[i].id;
          temp.name = this.returnedData[i].name;

          this.tableData.push(temp);
        }
        this.tableLoadingState = false;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    handleSubmit() {
      setTimeout(() => {
        this.$router.push("/admin/dashboard/networkServer/addNetworkServer");
      }, 100);
    },
    checkNetworkServer(currentRecord) {
      this.$router.push({
        name: "checkNetworkServer",
        query: {
          nid: currentRecord["id"],
          server: currentRecord["IP"],
          port: currentRecord["port"]
        }
      });
    },
    editNetworkServer(currentRecord) {
      this.$router.push({
        name: "editNetworkServer",
        query: {
          nid: currentRecord["id"],
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
.iot_view_internetServer_top_search {
  float: left;
  width: 300px;
  text-align: left;
}
.iot_view_internetServer_top_add {
  float: right;
}
.iot_view_internetServer_top {
  width: 100%;
  margin-top: 14px;
  margin-bottom: 14px;
}
.iot_view_internetServer_top_button_text {
  color: white;
}
.iot_view_internetServer_table_layout {
  min-height: fit-content;
}
.iot_view_internetServer_table {
  font-size: 10px;
  line-height: 8px;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 8px 8px;
}
</style>
