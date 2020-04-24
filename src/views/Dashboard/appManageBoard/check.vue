<template>
  <a-layout>
    <a-card style="width: 100%">
      <a-row style="padding-bottom: 8px">
        <a-col :span="24">
          <span style="font-size: 16px;font-weight: normal;color: black"
            >编号： {{ this.id }}</span
          >
        </a-col>
      </a-row>
      <div class="iot_line" />
      <a-row style="margin-top: 10px;display: flex">
        <span style="margin-left: 30px;margin-bottom: 8px"
          >应用名称：{{ this.appName }}</span
        >
        <span style="margin-left: 30px;margin-bottom: 8px"
          >设备分配容量：{{ this.capacity }}</span
        >
        <span style="margin-left: 30px;margin-bottom: 8px"
          >设备使用容量：{{ this.usedCapacity }}</span
        >
        <span style="margin-left: 30px;margin-bottom: 8px"
          >创建时间：{{ this.time }}</span
        >
      </a-row>
      <a-row style="display: flex">
        <span style="margin-left: 30px;margin-bottom: 2px"
          >应用描述：{{ this.description }}</span
        >
      </a-row>
    </a-card>

    <a-layout
      style="background: #fff;padding: 0 14px 0;margin-top: 14px;height: min-content"
    >
      <div style="height: min-content">
        <a-tabs
          type="card"
          :defaultActiveKey="defaultTab"
          size="small"
          style="text-align: left;padding-top: 0;height: min-content"
        >
          <a-tab-pane tab="节点" key="1" style="height: auto">
            <NodeList />
          </a-tab-pane>
          <a-tab-pane tab="配置修改" key="2" style="height: auto">
            <Edit />
          </a-tab-pane>
          <a-button
            slot="tabBarExtraContent"
            icon="plus"
            type="primary"
            @click="addNode"
            >添加节点</a-button
          >
          <a-button
            slot="tabBarExtraContent"
            icon="plus"
            style="margin-left: 10px"
            @click="addNodes"
            >批量添加</a-button
          >
        </a-tabs>
      </div>
      <a-modal
        v-model="nodeListModalVisible"
        title="应用节点分配"
        onOk="handleOk"
        style="min-width: fit-content"
      >
        <template slot="footer" style="float: right">
          <a-button
            key="comfirm"
            @click="handleNodeChangeComfirm"
            :loading="nodeComfirmLoading"
            >确定</a-button
          >
          <a-button key="cancel" @click="handleNodeChangeCancel">取消</a-button>
        </template>

        <a-transfer
          :dataSource="mockData"
          showSearch
          :listStyle="{
            width: '250px',
            height: '300px'
          }"
          :titles="['所有节点', '选中节点']"
          :operations="['选中', '撤回']"
          :targetKeys="targetKeys"
          @change="handleNodeChange"
          :render="item => `${item.title}`"
        >
          <span slot="notFoundContent">
            没数据
          </span>
        </a-transfer>
      </a-modal>
    </a-layout>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import NodeList from "./nodeList";
import Edit from "./edit.vue";
import ACol from "ant-design-vue/es/grid/Col";
export default {
  components: { ACol, ARow, NodeList, Edit },
  data() {
    return {
      //params
      id: "1",
      defaultTab: "1",

      //data
      appName: "lora100",
      capacity: "暂无",
      usedCapacity: "暂无",
      time: "暂无",
      description: "描述内容描述内容描述内容描述内容描述内容描述内容描述内容",

      //modal
      nodeListModalVisible: false,
      targetKeys: [],

      //loading
      nodeComfirmLoading: false,

      mockData: []
    };
  },
  beforeMount() {
    this.id = this.$route.query.id;
    if (this.$route.query.tab) {
      this.defaultTab = this.$route.query.tab;
    }

    this.$api.appManage
      .getAppDetail({
        extra: this.id
      })
      .then(res => {
        console.log(res);
        let infoDataTemp = res.data.application;

        this.appName = infoDataTemp.name;
        this.description = infoDataTemp.description;
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    // this.getMock();
  },
  methods: {
    handleNodeChangeComfirm() {
      this.nodeComfirmLoading = true;
    },
    addNodes() {
      this.nodeListModalVisible = !this.nodeListModalVisible;
    },
    addNode() {
      this.$router.push({
        name: "addNodeInApp",
        query: { id: this.id }
      });
    },
    handleNodeChangeCancel() {
      this.nodeListModalVisible = !this.nodeListModalVisible;
    },
    handleNodeChange(targetKeys, moveKeys) {
      console.log(targetKeys, moveKeys);
      this.targetKeys = targetKeys;
    },
    getMock() {
      const targetKeys = [];
      const mockData = [];
      for (let i = 0; i < 20; i++) {
        const data = {
          key: i.toString(),
          title: `0047SDA4454${i + 1}`,
          chosen: Math.random() * 2 > 1
        };
        if (data.chosen) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      }
      this.mockData = mockData;
      this.targetKeys = targetKeys;
    }
  }
};
</script>

<style>
.iot_line {
  width: 100%;
  height: 1px;
  border-top: solid #dddddd 1px;
  padding: 2px 0;
}
.ant-card-wider-padding .ant-card-body {
  padding: 16px 8px;
}
</style>
