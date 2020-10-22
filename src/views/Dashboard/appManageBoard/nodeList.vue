<template>
  <div>
    <div>
      <a-row>
        <a-col :span="6">
          <a-input-search
            class="iot_view_nodeManage_top_search"
            placeholder="请输入节点编号或名称"
            v-model="searchKey"
          />
        </a-col>
      </a-row>
    </div>
    <div>
      <a-table
        :columns="columns"
        :dataSource="filteredTable"
        style="min-width: auto"
        class="iot_view_nodeManage_table"
        :pagination="pagination"
        :rowKey="record => record.devEUI"
      >
        <span slot="state" slot-scope="tags">
          <a-tag :color="tags === 'on' ? 'green' : 'red'" :key="tags">
            {{ tags.toUpperCase() }}
          </a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="checkRouter(record)">查看</a>
          <!-- <a-divider type="vertical" />
        <a @click="editRouter(record)">编辑</a> -->
        </span>
      </a-table>
    </div>
    <!-- <div class="iot_view_nodeManage_table_button_content">
      <a-button>批量选择</a-button>
      <a-button icon="delete" style="margin: 0 20px">删除</a-button>
      <a-button icon="download">导出</a-button>
    </div> -->
  </div>
</template>

<script>
const columns = [
  {
    title: "节点编号(devEUI)",
    dataIndex: "devEUI",
    key: "devEUI"
  },
  {
    title: "节点名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "网络状态",
    key: "state",
    dataIndex: "state",
    scopedSlots: { customRender: "state" }
  },
  {
    title: "创建时间",
    key: "createdAt",
    dataIndex: "createdAt"
  },
  {
    title: "最后心跳时间",
    key: "heartAt",
    dataIndex: "heartAt"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  data() {
    return {
      columns,

      //params
      query: {
        appID: ""
      },
      searchKey: "",
      //tableData
      tableData: [],

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
    this.query.appID = sessionStorage.getItem("appID");
    this.getAppNodes();
  },
  computed: {
    filteredTable: function() {
      var searchKey = this.searchKey;
      var array = this.tableData;
      if (this.common.isEmpty(searchKey)) return array;

      searchKey = searchKey.trim().toLowerCase();
      array = array.filter(function(item) {
        if (
          item.name.toLowerCase().indexOf(searchKey) !== -1 ||
          item.devEUI.toLowerCase().indexOf(searchKey) !== -1
        ) {
          return item;
        }
      });

      return array;
    }
  },
  methods: {
    getAppNodes() {
      var th = this;
      this.$api.appManage
        .getNodeInApp({
          applicationID: this.query.appID,
          limit: 5000
        })
        .then(res => {
          if (res.status === 200) {
            let infoDataTemp = res.data.result;
            infoDataTemp.forEach(item => {
              //比较
              var ls = item.lastSeenAt;
              item.heartAt = th.common.timestamp2LocalDateTime(ls);
              item.createdAt = th.common.timestamp2LocalDateTime(
                item.createdAt
              );
              var ps = th.common.checkUTCpast(ls);
              if (ps !== "" && ps < 24 * 60 * 60 * 1000) {
                item.state = "ON";
              } else {
                item.state = "OFF";
              }
            });
            console.log(res.data.result);
            this.tableData = res.data.result;
          } else {
            console.log("获取节点列表失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    checkRouter(record) {
      sessionStorage.setItem("tab", "1");
      sessionStorage.setItem("appID", this.query.appID);
      sessionStorage.setItem("devEUI", record.devEUI);
      sessionStorage.setItem("lastSeenAt", record.lastSeenAt);
      // sessionStorage.setItem("deviceProfileID", record.deviceProfileID);
      // sessionStorage.setItem("deviceProfileName", record.deviceProfileName);
      //debugger;
      this.$router.push({
        name: "checkNodeInApp"
      });
    }
    // editRouter(record) {
    //   sessionStorage.setItem("tab", "2");
    //   sessionStorage.setItem("appID", this.query.appID);
    //   sessionStorage.setItem("devEUI", record.devEUI);
    //   sessionStorage.setItem("deviceProfileID", record.deviceProfileID);
    //   sessionStorage.setItem("deviceProfileName", record.deviceProfileName);
    //   this.$router.push({
    //     name: "checkNodeInApp"
    //   });
    // }
  }
};
</script>

<style>
.iot_view_nodeManage_table_button_content {
  float: left;
  margin-top: -40px;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 8px 8px;
}
.iot_view_nodeManage_top_search {
  float: left;
  width: 250px;
  text-align: left;
}
</style>
