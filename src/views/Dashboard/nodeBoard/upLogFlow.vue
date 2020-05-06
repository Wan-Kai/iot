<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div class="iot_view_nlogFlow_top">
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
    <div class="iot_view_nlogFlow_table_layout">
      <a-table
        :columns="columns"
        :dataSource="interData"
        style="min-width: auto"
        class="iot_view_nlogFlow_table"
        :pagination="pagination"
        :rowKey="record => record.uid"
      >
      </a-table>
    </div>
  </a-layout>
</template>

<script>
const columns = [
  {
    title: "节点编号",
    dataIndex: "devEUI",
    key: "devEUI"
  },
  {
    title: "节点名称",
    dataIndex: "deviceName",
    key: "deviceName"
  },

  {
    title: "应用编号",
    dataIndex: "applicationID",
    key: "applicationID"
  },
  {
    title: "应用名称",
    dataIndex: "applicationName",
    key: "applicationName"
  },
  {
    title: "上报时间",
    dataIndex: "receivedAt",
    key: "receivedAt"
  },
  {
    title: "数据",
    dataIndex: "data",
    key: "data"
  },
  {
    title: "是否开启自适应速率",
    dataIndex: "adr",
    key: "adr"
  },
  {
    title: "数据率",
    dataIndex: "dr",
    key: "dr"
  },
  {
    title: "中心频率",
    dataIndex: "frequency",
    key: "frequency"
  },
  {
    title: "帧计数器",
    dataIndex: "fCnt",
    key: "fCnt"
  },
  {
    title: "端口",
    dataIndex: "fPort",
    key: "fPort"
  }
  /*
  {
    title: "接受帧的信道",
    dataIndex: "channel",
    key: "channel"
  },
  {
    title: "网关对帧的crc校验结果",
    dataIndex: "crc",
    key: "crc"
  },
  {
    title: "数据类型",
    dataIndex: "type",
    key: "type"
  },
  {
    title: "创建时间",
    key: "time",
    dataIndex: "time"
  }
  */
];
export default {
  data() {
    return {
      columns,
      interData: [],

      pagination: {
        size: "small",
        defaultPageSize: 10,
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
    this.$api.node
      //.upFlowData({page: 0})
      .upDataQuery({ limit: 100 })
      .then(res => {
        this.interData = res.data.result;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
.iot_view_nlogFlow_top {
  width: 100%;
  margin-top: 14px;
  margin-bottom: 14px;
}
.iot_view_nlogFlow_table_layout {
  min-height: fit-content;
}
.iot_view_nlogFlow_table {
  font-size: 10px;
  line-height: 8px;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 8px 8px;
}
</style>
