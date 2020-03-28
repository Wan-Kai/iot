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
          <a-button type="primary" icon="plus" @click="add">
            节点注册
          </a-button>
          <a-button style="margin: 0 22px" icon="download" @click="showModalIn">
            批量导入
          </a-button>
          <a-modal v-model="visibleIn" title="节点批量导入" onOk="handleOk">
            <template slot="footer">
              <a-button key="back" @click="handleCancelIn">取消</a-button>
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
                :loading="loadingIn"
                @click="handleOkIn"
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
          <a-button icon="download" @click="showModalOut">
            批量导出
          </a-button>
          <a-modal v-model="visibleOut" title="节点批量导出" onOk="handleOk">
            <template slot="footer">
              <a-button key="back" @click="handleCancelOut">取消</a-button>
            </template>
            <p>内容尚待确定</p>
            <a-button
              key="submit"
              type="primary"
              :loading="loadingIn"
              @click="handleOkOut"
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
        :dataSource="interData"
        style="min-width: auto"
        class="iot_view_nodeManage_table"
        :pagination="pagination"
        rowKey="id"
      >
        <span slot="state" slot-scope="tags">
          <a-tag :color="tags === 'on' ? 'green' : 'red'" :key="tags">
            {{ tags.toUpperCase() }}
          </a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="checkRouter(record)">查看</a>
          <a-divider type="vertical" />
          <a @click="editRouter(record)">编辑</a>
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
const columns = [
  {
    title: "节点编号(DevEUI)",
    dataIndex: "devEUI",
    key: "devEUI"
  },
  {
    title: "节点名称",
    dataIndex: "nodeName",
    key: "nodeName"
  },
  {
    title: "信号强度(dBm)",
    dataIndex: "dBm",
    key: "dBm"
  },
  {
    title: "频段",
    key: "frequency",
    dataIndex: "frequency"
  },
  {
    title: "Class",
    key: "class",
    dataIndex: "class"
  },
  {
    title: "状态",
    key: "state",
    dataIndex: "state",
    scopedSlots: { customRender: "state" }
  },
  {
    title: "应用编号(AppEUI)",
    key: "AppEUI",
    dataIndex: "AppEUI"
  },
  {
    title: "使用状态",
    key: "type",
    dataIndex: "type"
  },
  {
    title: "创建时间",
    key: "time",
    dataIndex: "time"
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
      columns,
      interData: [],

      loadingIn: false,
      visibleIn: false,

      loadingOut: false,
      visibleOut: false,

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
      .nodeData({
        page: 0
      })
      .then(res => {
        this.interData = res.data.result;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    add() {
      this.$router.push({
        name: "addNodeManage"
      });
    },
    checkRouter(data) {
      this.$router.push({
        name: "checkNodeManage",
        query: { number: data["DevEUI"], id: "1" }
      });
    },
    editRouter(data) {
      this.$router.push({
        name: "checkNodeManage",
        query: { number: data["DevEUI"], id: "2" }
      });
    },
    showModalIn() {
      this.visibleIn = true;
    },
    handleOkIn() {
      this.loadingIn = true;
      setTimeout(() => {
        this.visibleIn = false;
        this.loadingIn = false;
      }, 3000);
    },
    handleCancelIn() {
      this.visibleIn = false;
    },

    showModalOut() {
      this.visibleOut = true;
    },
    handleOkOut() {
      this.loadingOut = true;
      setTimeout(() => {
        this.visibleOut = false;
        this.loadingOut = false;
      }, 3000);
    },
    handleCancelOut() {
      this.visibleOut = false;
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
