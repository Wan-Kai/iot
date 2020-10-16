<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div class="iot_view_nlogFlow_top">
      <a-form :form="form" layout="vertical" class="iot_view_downLogFlow_form">
        <a-input-group compact>
          <a-form-item class="iot_view_downLogFlow_form_formItem">
            <a-input
              style="width: 100%;float: left;text-align: left"
              placeholder="请输入设备编号(EUI)"
              v-model="queryCondition.searchKey"
              v-decorator="[
                'devEUI',
                {
                  initialValue: this.queryCondition.searchKey,
                  rules: [{ required: true, message: '设备编号(EUI)' }]
                }
              ]"
            />
          </a-form-item>
          <a-form-item class="iot_view_downLogFlow_form_formItem">
            <a-date-picker
              style="width: 100%;float: left;text-align: left"
              placeholder="开始时间"
              :defaultValue="moment(getCurrentData(), 'YYYY-MM-DD')"
              :showToday="false"
              @change="onChangeBegin"
            />
          </a-form-item>
          <a-form-item class="iot_view_downLogFlow_form_formItem">
            <a-date-picker
              style="width: 100%;float: left;text-align: left"
              placeholder="结束时间"
              :defaultValue="moment(getCurrentData(), 'YYYY-MM-DD')"
              :showToday="false"
              @change="onChangeEnd"
            />
          </a-form-item>
          <a-form-item class="iot_view_downLogFlow_form_formItem">
            <a-button style="float: left" icon="search" @click="handleQuery" />
          </a-form-item>
        </a-input-group>
      </a-form>
    </div>
    <div class="iot_view_nlogFlow_table_layout">
      <a-table
        :columns="columns"
        :dataSource="filteredTable"
        style="min-width: auto"
        class="iot_view_nlogFlow_table"
        :pagination="pagination"
        :rowKey="record => record.uid"
      >
        <span slot="data" slot-scope="text, record">
          {{ record.data }}
        </span>
      </a-table>
    </div>
  </a-layout>
</template>

<script>
import moment from "moment";
const Base64 = require("js-base64").Base64;
const columns = [
  {
    title: "节点编号",
    dataIndex: "devEUI",
    key: "devEUI"
  },
  {
    title: "下发时间",
    dataIndex: "sentAt",
    key: "sentAt"
  },
  {
    title: "数据",
    dataIndex: "data",
    key: "data"
    //scopedSlots: { customRender: "data" }
  },
  {
    title: "json对象",
    dataIndex: "jsonObject",
    key: "jsonObject"
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
];
export default {
  data() {
    return {
      columns,

      queryCondition: {
        searchKey: "",
        beginDay: "",
        endDay: ""
      },
      returnedData: [],

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

  computed: {
    currentOrganizationID() {
      return this.common.getCurrentOrganizationID();
    },

    filteredTable: function() {
      var searchKey = this.queryCondition.searchKey;
      var array = this.returnedData;
      if (this.common.isEmpty(searchKey)) return array;

      searchKey = searchKey.trim().toLowerCase();
      array = array.filter(function(item) {
        if (item.devEUI.toLowerCase().indexOf(searchKey) !== -1) {
          return item;
        }
      });

      return array;
    }
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: "queryForm"
    });
  },

  beforeMount() {
    this.getDownLog();
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
      this.queryCondition.searchKey = this.form.getFieldValue("devEUI");

      //let Base64 = require('js-base64').Base64;
      //alert(Base64.encode("xxx"));
      //alert(Base64.decode("AQ=="));
      this.getDownLog();
    },

    getDownLog() {
      this.$api.node
        .downDataQuery({
          extra: this.queryCondition.searchKey,
          countOnly: false
        })
        .then(res => {
          if (res.status === 200) {
            this.returnedData = res.data.deviceQueueItems;

            for (let i = 0; i < this.returnedData.length; i++) {
              this.returnedData[i].sentAt = this.common.timestamp2LocalDateTime(
                this.returnedData[i].sentAt
              );
              var d = this.returnedData[i].data;
              /*
              if (i===0)
                d = "AQ==";
              else if (i===1)
                d = "AA==";
              else if (i===2)
                d = "EjSrzQ==";
              */
              if (this.common.isBase64(d)) {
                //this.returnedData[i].data = this.common.Bytes2HexString(Base64.decode(d));
                //this.returnedData[i].data = Base64.decode(d);
                this.returnedData[i].data = this.common.CharToHex(
                  this.common.base64decode(d)
                );
              }
            }
          } else {
            console.log("下行数据日志获取失败");
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
.iot_view_downLogFlow_form {
  float: left;
}
.iot_view_downLogFlow_form_formItem {
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
