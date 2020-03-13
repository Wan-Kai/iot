<template>
  <a-layout style="background: #fff;padding: 0 14px 0">
    <div class="iot_view_ilogFlow_top">
      <a-input-group compact>
        <a-input
          style="width: 20%;float: left;text-align: left"
          placeholder="请输入编号查询"
        />
        <a-date-picker
          style="width: 20%;float: left;text-align: left"
          placeholder="开始时间"
        />
        <a-date-picker
          style="width: 20%;float: left;text-align: left"
          placeholder="结束时间"
        />
        <a-button style="float: left" icon="search" />
      </a-input-group>
    </div>
    <div class="iot_view_ilogFlow_table_layout">
      <a-table
        :columns="columns"
        :dataSource="interData"
        style="min-width: auto"
        class="iot_view_ilogFlow_table"
        :pagination="pagination"
        rowKey="id"
      >
      </a-table>
    </div>
  </a-layout>
</template>

<script>
const columns = [
  {
    title: "网关编号",
    dataIndex: "gatewayId",
    key: "gatewayId"
  },
  {
    title: "心跳时间",
    dataIndex: "heartTime",
    key: "heartTime"
  },
  {
    title: "周期",
    dataIndex: "period",
    key: "period"
  },
  {
    title: "时延",
    dataIndex: "delayTime",
    key: "delayTime"
  },
  {
    title: "数据类型",
    dataIndex: "type",
    key: "type"
  },
  {
    title: "网关时间",
    dataIndex: "gatewayTime",
    key: "gatewayTime"
  },
  {
    title: "射频侧接收的射频帧数",
    dataIndex: "radioFrame",
    key: "radioFrame"
  },
  {
    title: "射频侧接收的CRC正确的射频包数",
    dataIndex: "rightBagNumber",
    key: "rightBagNumber"
  },
  {
    title: "射频侧接收且需转发的射频包数",
    dataIndex: "transportBagNumber",
    key: "transportBagNumber"
  },
  {
    title: "网络侧接受的下行包数",
    dataIndex: "downBagNumber",
    key: "downBagNumber"
  },
  {
    title: "网络侧且转发成功的包数",
    dataIndex: "transportSusBagNumber",
    key: "transportSusBagNumber"
  }
];
export default {
  data() {
    return {
      columns,
      interData: [],

      pagination: {
        size: "small",
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        buildOptionText(value) {
          return `${value.value} 条/页`;
        },
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "15", "20"],
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize)
      }
    };
  },

  beforeMount() {
    this.$api.gateway
      .ilogFlowData({
        page: 0
      })
      .then(res => {
        this.interData = res.data.ilogData;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
.iot_view_ilogFlow_top {
  width: 100%;
  margin-top: 14px;
  margin-bottom: 14px;
}
.iot_view_ilogFlow_table_layout {
}
.iot_view_ilogFlow_table {
  font-size: 10px;
  line-height: 8px;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 8px 8px;
}
</style>
