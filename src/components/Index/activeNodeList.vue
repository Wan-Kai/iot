<template>
  <div style="background: #fff;height: 400px;padding: 10px 10px">
    <a-row>
      <a-col :span="12">
        <div style="float: left">
          <span style="font-size: 14px;font-weight: bold">最新活跃节点</span>
        </div>
      </a-col>
    </a-row>
    <a-divider style="margin: 8px 0" />
    <a-table
      :columns="columns"
      :dataSource="returnedData"
      style="min-width: auto"
      class="iot_components_activeNode_table"
      :rowKey="record => record.devEUI"
      :pagination="false"
    >
    </a-table>
    <!--
    <div style="display: block;margin-top: 10px">
      <a @click="checkMessage">查看更多节点...</a>
    </div>
    -->
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
    title: "上报时间",
    dataIndex: "lastSeenAt",
    key: "lastSeenAt"
  }
];
export default {
  data() {
    return {
      columns,
      returnedData: []
    };
  },
  beforeMount() {
    this.getActiveNode();
  },
  methods: {
    getActiveNode() {
      var param = {
        lastSeenAt: 10080
      };
      this.$api.node
        .getNodeLatest()
        .then(res => {
          if (res.status === 200) {
            this.returnedData = res.data.result;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    checkMessage() {
      this.$router.push("/admin/dashboard/nodeManage");
    }
  }
};
</script>

<style>
.iot_components_activeNode_table {
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 8px 8px;
}
</style>
