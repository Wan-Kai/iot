<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div class="iot_view_ilogFlow_top">
      <a-form :form="form" layout="flex" class="iot_view_form">
        <a-input-group compact>
          <a-form-item>
            <a-input
              style="width: 100%;float: left;text-align: left"
              placeholder="请输入网关MAC"
              v-decorator="[
                'gatewayID',
                {
                  initialValue: this.queryCondition.gatewayID,
                  rules: [{ required: true, message: '网关MAC' }]
                }
              ]"
            />
          </a-form-item>
          <a-form-item>
            <a-date-picker
              style="width: 100%;float: left;text-align: left"
              placeholder="开始时间"
              :defaultValue="moment(getCurrentData(), 'YYYY-MM-DD')"
              :showToday="false"
              @change="onChangeBegin"
            />
          </a-form-item>
          <a-form-item>
            <a-date-picker
              style="width: 100%;float: left;text-align: left"
              placeholder="结束时间"
              :defaultValue="moment(getCurrentData(), 'YYYY-MM-DD')"
              :showToday="false"
              @change="onChangeEnd"
            />
          </a-form-item>
          <a-form-item>
            <a-button style="float: left" icon="search" @click="handleQuery" />
          </a-form-item>
        </a-input-group>
      </a-form>
    </div>
    <div class="iot_view_ilogFlow_table_layout">
      <a-table
        :columns="columns"
        :dataSource="interData"
        style="min-width: auto"
        class="iot_view_ilogFlow_table"
        :pagination="pagination"
        :rowKey="record => record.uid"
      >
      </a-table>
    </div>
  </a-layout>
</template>

<script>
import moment from "moment";

const columns = [
  /*
  {
    title: "网关MAC",
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
  */
  {
    title: "网关时间",
    dataIndex: "timestamp",
    key: "timestamp"
  },
  {
    title: "网关收到的包数量",
    dataIndex: "rxPacketsReceived",
    key: "rxPacketsReceived"
  },
  {
    title: "网关收到包并通过CRC检验的包数量",
    dataIndex: "rxPacketsReceivedOK",
    key: "rxPacketsReceivedOK"
  },
  {
    title: "网关接收的用于传输的数据包",
    dataIndex: "txPacketsEmitted",
    key: "txPacketsEmitted"
  },
  {
    title: "网关传输的数据包",
    dataIndex: "txPacketsReceived",
    key: "txPacketsReceived"
  }
];
export default {
  data() {
    return {
      columns,

      queryCondition: {
        gatewayID: "0000000000000020",
        beginDay: "",
        endDay: ""
      },

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

  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: "queryForm"
    });
  },

  beforeMount() {
    this.getGatewayStat();
  },

  methods: {
    moment,
    getCurrentData() {
      return this.common.getNowDate();
    },

    onChangeGateway(e) {
      //debugger
      this.queryCondition.gatewayID = e.data;
      //console.log(e);
    },

    onChangeBegin(date, dateString) {
      this.queryCondition.beginDay = dateString;
      console.log(date, dateString);
    },

    onChangeEnd(date, dateString) {
      this.queryCondition.endDay = dateString;
      console.log(date, dateString);
    },

    handleQuery() {
      debugger;
      this.queryCondition.gatewayID = this.form.getFieldValue("gatewayID");
      this.getGatewayStat();
    },

    getGatewayStat() {
      if (this.common.isEmpty(this.queryCondition.gatewayID)) {
        this.$message.error("请输入网关MAC编号");
        return;
      }

      var params = {
        extra: this.queryCondition.gatewayID,
        startTimestamp: this.queryCondition.beginDay,
        endTimestamp: this.queryCondition.endDay
      };

      this.$api.gateway
        /*
        .ilogFlowData({
          page: 0
        })*/
        .statGateway(params)
        .then(res => {
          this.interData = res.data.result;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.iot_view_ilogFlow_top {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
}

.iot_view_form {
  float: left;
  margin-top: 10px;
  margin-left: 10px;
}

.iot_view_ilogFlow_table_layout {
  min-height: fit-content;
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
