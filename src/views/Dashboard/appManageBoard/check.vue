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
          >应用名称：{{ this.returnedData.appName }}</span
        >
        <span style="margin-left: 30px;margin-bottom: 8px"
          >设备分配容量：{{ this.returnedData.capacity }}</span
        >
        <span style="margin-left: 30px;margin-bottom: 8px"
          >设备使用容量：{{ this.returnedData.usedCapacity }}</span
        >
        <span style="margin-left: 30px;margin-bottom: 8px"
          >创建时间：{{ this.returnedData.time }}</span
        >
      </a-row>
      <a-row style="display: flex">
        <span style="margin-left: 30px;margin-bottom: 2px"
          >应用描述：{{ this.returnedData.description }}</span
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
        :maskClosable="false"
        :keyboard="false"
        :closable="false"
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
          :dataSource="nodeData"
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
  inject: ["reload"],
  data() {
    return {
      //params
      id: "1",
      defaultTab: "1",

      //data
      returnedData: {
        appName: "lora100",
        capacity: "暂无",
        usedCapacity: "暂无",
        time: "暂无",
        description: "描述内容描述内容描述内容描述内容描述内容描述内容描述内容"
      },

      //modal
      nodeListModalVisible: false,
      targetKeys: [],
      targetKeysTemp: [],
      nodeData: [],
      chosenData: [],

      //loading
      nodeComfirmLoading: false
    };
  },
  beforeMount() {
    this.id = sessionStorage.getItem("appId");
    this.defaultTab = sessionStorage.getItem("tab");

    this.$api.appManage
      .getAppDetail({
        extra: this.id
      })
      .then(res => {
        let infoDataTemp = res.data.application;

        this.returnedData.appName = infoDataTemp.name;
        this.returnedData.description = infoDataTemp.description;
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleNodeChangeComfirm() {
      //this.nodeComfirmLoading = true;
      //与最开始相比，从右侧移除的节点 供参考
      let deleteNodes = this.targetKeysTemp.filter(
        temp => !this.targetKeys.includes(temp)
      );
      //与最开始相比，从左侧添加进的节点
      let addNodes = this.targetKeys.filter(
        temp => !this.targetKeysTemp.includes(temp)
      );

      console.log(addNodes);
      let sentData = {
        applicationID: this.id,
        name: "name",
        description: "",
        devEUI: "",
        deviceProfileID: ""
      };
      if (addNodes.length > 0) {
        for (let i = 0; i < addNodes.length; i++) {
          //Todo
          sentData.deviceProfileID = addNodes[i];
          //创建新节点
          // this.$api.appManage
          //         .createAppNode({
          //           device: sentData
          //         }).then(res => {
          //   if (res.status === 200) {
          //     console.log(res)
          //   }
          // }).catch(err =>{
          //   console.log(err)
          // })
        }
      }

      //刷新界面
      //this.reload();

      //同步修改暂存区
      this.targetKeysTemp = this.targetKeys;
    },
    addNodes() {
      this.nodeListModalVisible = !this.nodeListModalVisible;
    },
    addNode() {
      sessionStorage.setItem("appId", this.id);
      this.$router.push({
        name: "addNodeInApp"
      });
    },
    handleNodeChangeCancel() {
      this.nodeListModalVisible = !this.nodeListModalVisible;
      this.targetKeys = this.targetKeysTemp;
    },
    handleNodeChange(targetKeys, moveKeys) {
      this.targetKeys = targetKeys;
    },
    getData() {
      const nodeData = [];
      this.$api.node
        .getNode({
          limit: 100
        })
        .then(res => {
          let infoDataTemp = res.data.result;
          for (let i = 0; i < infoDataTemp.length; i++) {
            const data = {
              key: infoDataTemp[i].id,
              title: infoDataTemp[i].name,
              chosen: false
            };
            nodeData.push(data);
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.nodeData = nodeData;
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
