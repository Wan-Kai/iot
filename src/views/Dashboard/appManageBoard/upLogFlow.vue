<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div class="iot_view_nlogFlow_top">
      <a-form :form="form" layout="vertical" class="iot_view_upLogFlow_form">
        <a-input-group compact>
          <!--
          <a-form-item class="iot_view_upLogFlow_form_formItem">
            <a-input
              style="width: 100%;float: left;text-align: left"
              placeholder="请输入设备编号(EUI)"
              v-decorator="[
                'devEUI',
                {
                  initialValue: this.queryCondition.devEUI,
                  rules: [{ required: true, message: '设备编号(EUI)' }]
                }
              ]"
            />
          </a-form-item>
          -->
          <a-form-item class="iot_view_upLogFlow_form_formItem">
            <a-date-picker
              style="width: 100%;float: left;text-align: left"
              placeholder="开始时间"
              :defaultValue="moment('2020-05-01', 'YYYY-MM-DD')"
              :showToday="false"
              @change="onChangeBegin"
            />
          </a-form-item>
          <a-form-item class="iot_view_upLogFlow_form_formItem">
            <a-date-picker
              style="width: 100%;float: left;text-align: left"
              placeholder="结束时间"
              :defaultValue="moment(getCurrentData(), 'YYYY-MM-DD')"
              :showToday="false"
              @change="onChangeEnd"
            />
          </a-form-item>
          <a-form-item class="iot_view_upLogFlow_form_formItem">
            <a-button style="float: left" icon="search" @click="handleQuery" />
          </a-form-item>
        </a-input-group>
      </a-form>
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
import moment from "moment";
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
  name: "nodeUplog",
  data() {
    return {
      columns,
      queryCondition: {
        devEUI: "",
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
    this.queryCondition.devEUI = sessionStorage.getItem("devEUI");
    this.getUpLog();
  },

  methods: {
    moment,
    getCurrentData() {
      return this.common.getNowDate();
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
      //debugger;
      //this.queryCondition.devEUI = this.form.getFieldValue("devEUI");
      this.getUpLog();
    },

    getUpLog() {
      var params = {
        limit: 100,
        search: this.queryCondition.devEUI,
        startTimestamp: this.queryCondition.beginDay,
        endTimestamp: this.queryCondition.endDay
      };

      this.$api.node
        //.upFlowData({page: 0})
        .upDataQuery(params)
        .then(res => {
          if (res.status === 200) {
            this.interData = res.data.result;
          } else {
            console.log("上行日志流水获取失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.iot_view_upLogFlow_form {
  float: left;
}
.iot_view_upLogFlow_form_formItem {
  margin-bottom: 0px;
}
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
