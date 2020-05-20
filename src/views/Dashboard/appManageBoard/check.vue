<template>
  <a-layout>
    <a-card style="width: 100%">
      <a-row style="padding-bottom: 8px">
        <a-col :span="24">
          <span style="font-size: 16px;font-weight: normal;color: black"
            >应用编号： {{ this.query.appID }}</span
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
          :defaultActiveKey="query.defaultTab"
          size="small"
          style="text-align: left;padding-top: 0;height: min-content"
        >
          <a-tab-pane tab="节点" key="1">
            <NodeList />
          </a-tab-pane>
          <a-tab-pane tab="配置修改" key="2">
            <Edit />
          </a-tab-pane>
          <a-tab-pane tab="数据转发地址" key="3">
            <TranspondData />
          </a-tab-pane>
          <a-button
            slot="tabBarExtraContent"
            icon="plus"
            type="primary"
            @click="addNode"
            >添加节点</a-button
          >
          <!--
          <a-button
            slot="tabBarExtraContent"
            icon="plus"
            style="margin-left: 10px"
            @click="addNodes">批量添加</a-button>
          -->
          <a-button
            slot="tabBarExtraContent"
            icon="plus"
            style="margin-left: 10px"
            @click="importNodes"
            >导入</a-button
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
          :dataSource="undeployedNodes"
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
      <a-modal
        title="导入文件"
        :visible="uploadModalVisible"
        @cancel="uploadHandleModalCancel"
      >
        <template slot="footer">
          <a-button key="back" @click="uploadHandleModalCancel">完成</a-button>
        </template>
        <div>
          <a-upload
            name="fileUpload"
            :multiple="false"
            :customRequest="customRequest"
            @change="uploadHandleChange"
          >
            <a-button style="margin-bottom: 10px">
              <a-icon type="upload" /> 点击上传文件
            </a-button>
          </a-upload>
          <!--          <div style="margin: 10px auto">-->
          <!--            <textarea :rows="8" readonly style="cursor: default;width: 100%;background: #E0E0E0"/>-->
          <!--          </div>-->
        </div>
      </a-modal>
    </a-layout>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import NodeList from "./nodeList";
import Edit from "./edit.vue";
import TranspondData from "./transpondData.vue";
import ACol from "ant-design-vue/es/grid/Col";
import { base } from "../../../utils/axios";
import store from "../../../store/index";
import { getOrganizationNameById } from "@/utils/util";
export default {
  components: { ACol, ARow, NodeList, Edit, TranspondData },
  inject: ["reload"],
  data() {
    return {
      //params
      query: {
        appID: "",
        defaultTab: "1",
        organizationName: ""
      },

      //configuration
      url: base + "/upload",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "text/plain",
        "Grpc-Metadata-Authorization":
          "Bearer " + store.getters["login/getSessionKey"]
      },
      textAvailable: false,

      //data
      returnedData: {
        appName: "lora100",
        capacity: "暂无",
        usedCapacity: "暂无",
        time: "暂无",
        description: ""
      },
      //批量添加数据
      maxEndOfSix: 0, //所有node节点最大后六位int数

      nodeListModalVisible: false,
      undeployedNodes: [],
      targetKeys: [],
      targetKeysTemp: [],
      chosenData: [],
      sentData: [],

      //loading
      nodeComfirmLoading: false,
      uploadModalVisible: false,
      uploadLoading: false
    };
  },
  beforeMount() {
    this.query.appID = sessionStorage.getItem("appID");
    this.query.defaultTab = sessionStorage.getItem("tab");

    this.getAppDetail();
  },
  mounted() {
    this.getUnDeployedNodes();
    this.getMaxNodeDevProfileId();
    //this.organizationName = getOrganizationNameById(this.query.organizationN);
  },
  methods: {
    importNodes() {
      this.uploadModalVisible = true;
    },

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
      debugger;
      if (addNodes.length > 0) {
        //为解决闭包问题，分开写读入for函数和请求api的for函数
        for (let i = 0; i < addNodes.length; i++) {
          this.maxEndOfSix++;
          var devEUI = this.common.generateDevEUI(
            this.query.appID,
            this.maxEndOfSix
          );
          let sentDataTemp = {
            applicationID: this.query.appID,
            devEUI: devEUI,
            description: "批量添加，第" + this.maxEndOfSix + "个",
            deviceProfileID: addNodes[i],
            name: devEUI
          };
          this.sentData.push(sentDataTemp);
        }
        for (let j = 0; j < addNodes.length; j++) {
          (function(num, _self) {
            // 此时访问的num，是上层函数执行环境的num，数组有10个函数对象，每个对象的执行环境下的number都不一样
            _self.$api.appManage
              .createAppNode({
                device: _self.sentData[num]
              })
              .then(res => {
                if (res.status === 200) {
                  _self.$message.success(
                    "创建节点成功" + _self.sentData[num].devEUI
                  );
                } else {
                  _self.$message.error("创建节点" + _self.sentData[num].devEUI);
                }
              })
              .catch(err => {
                _self.$message.error(err);
              });
          })(j, this);
        }
      }

      //刷新界面
      this.reload();

      //同步修改暂存区
      this.targetKeysTemp = this.targetKeys;
    },

    getAppDetail() {
      this.$api.appManage
        .getAppDetail({
          extra: this.query.appID
        })
        .then(res => {
          if (res.status === 200) {
            let infoDataTemp = res.data.application;

            this.returnedData.appName = infoDataTemp.name;
            this.returnedData.description = infoDataTemp.description;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    addNodes() {
      this.nodeListModalVisible = !this.nodeListModalVisible;
    },
    addNode() {
      sessionStorage.setItem("appID", this.query.appID);
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

    getUnDeployedNodes() {
      const nodeData = [];
      var _this = this;
      this.$api.node
        .getDeviceProfileAndDevice({
          limit: 100
        })
        .then(res => {
          if (res.status === 200) {
            let infoDataTemp = res.data.result;
            for (let i = 0; i < infoDataTemp.length; i++) {
              if (_this.isDeviceDeployed(infoDataTemp[i].device.devEUI))
                continue;

              const data = {
                key: infoDataTemp[i].device_profile_id,
                title: infoDataTemp[i].device_profile_name,
                chosen: false
              };
              nodeData.push(data);
            }
          } else {
            console.log("获取节点信息失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.undeployedNodes = nodeData;
    },

    isDeviceDeployed(devEUI) {
      if (this.common.isEmpty(devEUI) || devEUI === "0000000000000000")
        return false;
      else return true;
    },

    getMaxNodeDevProfileId() {
      this.$api.appManage
        .getNodeInApp({
          applicationID: this.query.appID,
          limit: 1000
        })
        .then(res => {
          let devices = res.data.result;
          let maxEndOfSix = 0;

          devices.forEach(item => {
            let num = parseInt(item.devEUI.substr(10, 6));
            if (maxEndOfSix < num) {
              maxEndOfSix = num;
            }
          });
          this.maxEndOfSix = maxEndOfSix;
          //console.log((Array(6).join("0") + maxEndOfSix).slice(-6));
        })
        .catch(err => {
          console.log(err);
        });
    },
    uploadHandleModalCancel() {
      this.uploadModalVisible = false;
    },
    uploadHandleChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} 文件上传成功`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} 文件上传失败`);
      }
    },
    customRequest({
      action,
      data,
      file,
      filename,
      headers,
      onError,
      onProgress,
      onSuccess,
      withCredentials
    }) {
      // EXAMPLE: post form-data with 'axios'
      debugger;
      let formData = new FormData();
      if (data) {
        Object.keys(data).forEach(key => {
          formData.append(key, data[key]);
        });
      }
      debugger;
      formData.append("file", file);
      console.log(formData.get("file"));
      this.$api.appManage
        .uploadNode(
          formData
          //         {
          //   onUploadProgress: ({ total, loaded }) => {
          //     onProgress(
          //       { percent: Math.round((loaded / total) * 100).toFixed(2) },file);
          //   }
          // }
        )
        .then(res => {
          if (res.data.status === 200) {
            onSuccess(res, file);
          } else {
            onError();
          }
        })
        .catch(err => {
          console.log(err);
        });
      return {
        abort() {
          console.log("upload progress is aborted.");
        }
      };
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
