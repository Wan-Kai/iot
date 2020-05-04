<template>
  <a-layout>
    <a-row
      style="background: #fff"
      type="flex"
      justify="space-between"
      align="top"
      :gutter="16"
    >
      <a-col :span="10">
        <a-row class="iot_view_App_node_deployEdit_form_content">
          <a-form
            :form="nodeEditForm"
            layout="vertical"
            class="iot_view_App_node_deployEdit_form"
          >
            <a-form-item
              class="iot_view_App_node_deployEdit_formitem"
              label="节点名称："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input
                v-decorator="[
                  'name',
                  {
                    initialValue: this.returnedData.name
                  }
                ]"
                size="small"
                style="width: 90%;float: left;text-align: left"
              >
              </a-input>
            </a-form-item>

            <a-form-item
              class="iot_view_App_node_deployEdit_formitem"
              label="节点编号(DevEUI)："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input
                v-decorator="[
                  'devEUI',
                  {
                    initialValue: this.id
                  }
                ]"
                :disabled="appEditable"
                size="small"
                style="width: 90%;float: left;text-align: left"
              />
              <a-tooltip placement="rightTop">
                <template slot="title">
                  prompt text
                </template>
                <a-icon
                  type="exclamation-circle"
                  style="height: 24px;line-height: 24px;width: 24px;
          vertical-align: text-top"
                />
              </a-tooltip>
            </a-form-item>

            <a-form-item
              class="iot_view_App_node_deployEdit_formitem"
              label="应用编号(AppEUI)："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input
                v-decorator="[
                  'appEUI',
                  {
                    initialValue: this.appId
                  }
                ]"
                size="small"
                :disabled="appEditable"
                style="width: 90%;float: left;text-align: left"
              />
            </a-form-item>

            <a-form-item
              class="iot_view_App_node_deployEdit_formitem"
              label="AppKey："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input
                v-decorator="[
                  'appKey',
                  {
                    initialValue: returnedKey.nwkKey,
                    rules: [
                      {
                        required: true,
                        message: '长度为32位，不允许有中文',
                        pattern: /^[^\u4e00-\u9fa5]{32}$/
                      }
                    ]
                  }
                ]"
                size="small"
                style="width: 90%;float: left;text-align: left"
              >
              </a-input>
              <a-tooltip placement="rightTop">
                <template slot="title">
                  prompt text
                </template>
                <a-icon
                  type="exclamation-circle"
                  style="height: 24px;line-height: 24px;width: 24px;
          vertical-align: text-top"
                />
              </a-tooltip>
            </a-form-item>

            <a-form-item
              class="iot_view_App_node_deployEdit_formitem"
              label="节点编号："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input
                v-decorator="[
                  'devProfile',
                  {
                    initialValue: this.returnedData.deviceProfileID
                  }
                ]"
                :disabled="appEditable"
                size="small"
                style="width: 90%;float: left;text-align: left"
              >
              </a-input>
            </a-form-item>

            <a-form-item
              class="iot_view_App_node_deployEdit_formitem"
              label="节点描述："
              :required="false"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-textarea
                placeholder="请填写节点描述，最多100个汉字"
                v-decorator="[
                  'description',
                  {
                    initialValue: returnedData.description
                  }
                ]"
                :rows="4"
                style="width: 90%;float: left;"
              />
            </a-form-item>
          </a-form>
          <a-row>
            <a-col :span="16" :offset="8">
              <div style="display: flex">
                <a-button
                  type="primary"
                  @click="handleSubmit"
                  :loading="submitLoading"
                  >保存</a-button
                >
                <a-button style="margin: 0 16px" @click="backToNodeList"
                  >取消</a-button
                >
                <a-button type="danger" icon="delete" @click="showModal"
                  >删除设备</a-button
                >
              </div>
            </a-col>
          </a-row>
        </a-row>
      </a-col>
      <a-col :span="14">
        <div>
          <a-form
            :form="nodeDeployFormMap"
            layout="vertical"
            class="iot_view_App_node_deployEdit_form"
          >
            <a-form-item
              class="iot_view_App_node_deployEdit_formitem"
              label="地理位置："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-switch
                checkedChildren="开"
                unCheckedChildren="关"
                @change="stateChange"
                style="float: left"
              />
            </a-form-item>
            <a-form-item
              v-if="areaShow"
              class="iot_view_App_node_deployEdit_formitem"
              label="所在区域："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-cascader
                v-decorator="[
                  'area',
                  {
                    initialValue: this.defaultArea
                  }
                ]"
                style="width: 90%;float: left;text-align: left"
                size="small"
                :options="area_options"
                placeholder=""
              />
            </a-form-item>
            <a-form-item
              v-if="areaShow"
              class="iot_view_App_node_deployEdit_formitem"
              label="详细位置："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                v-decorator="['address']"
                size="small"
                style="width: 90%;float: left;text-align: left"
              >
              </a-input>
              <a-tooltip placement="rightTop">
                <template slot="title">
                  prompt text
                </template>
                <a-icon
                  type="exclamation-circle"
                  style="height: 24px;line-height: 24px;width: 24px;
          vertical-align: text-top"
                />
              </a-tooltip>
            </a-form-item>
          </a-form>
          <a-modal
            title="删除提示"
            :visible="deleteModalVisible"
            @cancel="handleModalCancel"
          >
            <template slot="footer">
              <a-button key="back" @click="handleModalCancel">取消</a-button>
              <a-button
                type="danger"
                icon="delete"
                style="margin-left: 16px"
                @click="handleModalDelete"
                :loading="deleteLoading"
                >确认删除</a-button
              >
            </template>
            <p>{{ ModalText }}</p>
          </a-modal>
        </div>
        <div class="iot_amap_App_nodeEdit_container">
          <el-amap vid="App_note_edit_map"> </el-amap>
        </div>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
import wifi_map from "../../../assets/wifi.png";
import { getDeviceProfileService_options, getArea } from "@/utils/util";
export default {
  name: "nodeEdit",
  data() {
    return {
      //params
      id: "",
      appId: "",

      //options
      devProfile_options: [],
      area_options: [],

      //default Values
      defaultArea: [],

      //data
      returnedData: {
        deviceProfileID: "",
        applicationID: "",
        name: "",
        description: ""
      },

      returnedKey: {
        hasKey: false,
        appKey: "",
        genAppKey: "",
        nwkKey: ""
      },

      areaShow: false,

      submitLoading: false,

      //modal
      ModalText: "",
      deleteLoading: false,
      deleteModalVisible: false,

      location: {
        Lng: "",
        Lat: ""
      },

      //control
      appEditable: true,
      //mapData
      mapObj: {},
      mapData: []
    };
  },
  beforeCreate() {
    this.nodeEditForm = this.$form.createForm(this, {
      name: "nodeDeployForm"
    });
    this.nodeDeployFormMap = this.$form.createForm(this, {
      name: "nodeDeployForm"
    });
  },

  beforeMount() {
    this.id = sessionStorage.getItem("devEUI");
    this.appId = sessionStorage.getItem("appId");

    this.devProfile_options = getDeviceProfileService_options();
    this.area_options = getArea();

    this.getAppNodeDetail();
    this.getAppNodeKey();

    this.getMap();
  },

  methods: {
    getAppNodeDetail() {
      this.$api.appManage
        .getAppNodeDetail({
          extra: this.id
        })
        .then(res => {
          let infoDataTemp = res.data;

          this.returnedData.deviceProfileID =
            infoDataTemp.device.deviceProfileID;
          this.returnedData.applicationID = infoDataTemp.device.applicationID;
          this.returnedData.name = infoDataTemp.device.name;
          this.returnedData.description = infoDataTemp.device.description;

          if (infoDataTemp.location) {
            this.areaShow = true;
            this.defaultArea.push(infoDataTemp.device.province);
            this.defaultArea.push(infoDataTemp.device.city);
            this.defaultArea.push(infoDataTemp.device.district);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    getAppNodeKey() {
      this.$api.appManage
        .getNodeKey({
          extra: this.id
        })
        .then(res => {
          let infoDataTemp = res.data;

          this.returnedKey.hasKey = true;
          this.returnedKey.appKey = infoDataTemp.deviceKeys.appKey;
          this.returnedKey.genAppKey = infoDataTemp.deviceKeys.genAppKey;
          this.returnedKey.nwkKey = infoDataTemp.deviceKeys.nwkKey;
        })
        .catch(err => {
          console.log(err);
          this.returnedKey.hasKey = false;
        });
    },

    async createAppNodeKey(devEUI, nwkKey) {
      var data = {
        extra: devEUI,
        deviceKeys: {
          devEUI: devEUI,
          appKey: "00000000000000000000000000000000",
          genAppKey: "00000000000000000000000000000000",
          nwkKey: nwkKey
        }
      };

      this.$api.appManage
        .createModeKey(data)
        .then(res => {
          if (res.status === 200) {
            this.$message.success("设置appKey成功");
          } else {
            this.$message.error(res.data.error);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    async updateAppNodeKey(devEUI, nwkKey) {
      if (nwkKey === this.returnedKey.nwkKey) return;

      var data = {
        extra: devEUI,
        deviceKeys: {
          devEUI: devEUI,
          appKey: "00000000000000000000000000000000",
          genAppKey: "00000000000000000000000000000000",
          nwkKey: nwkKey
        }
      };

      this.$api.appManage
        .updateModeKey(data)
        .then(res => {
          if (res.status === 200) {
            this.$message.success("更新appKey成功");
          } else {
            this.$message.error(res.data.error);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    getMap() {
      this.$api.index
        .mapMarkers({})
        .then(res => {
          this.mapData = res.data.result;
          this.mapObj = new AMap.Map("App_note_edit_map", {
            // eslint-disable-line no-unused-vars
            resizeEnable: true, //自适应大小
            zoom: this.mapData.zoom,
            center: this.mapData.center
          });
          let startIcon = new AMap.Icon({
            // 图标尺寸
            size: new AMap.Size(25, 25),
            // 图标的取图地址
            image: wifi_map, // 您自己的图标
            // 图标所用图片大小
            imageSize: new AMap.Size(25, 25)
          });
          if (this.mapData.center) {
            const marker = new AMap.Marker({
              // eslint-disable-line no-unused-vars
              map: this.mapObj,
              icon: startIcon,
              position: this.mapObj.center, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              title: "网关"
            });
          }
          let _self = this;
          let address = "";
          this.mapObj.on("click", function(e) {
            if (_self.areaShow) {
              _self.location.Lng = e.lnglat.getLng();
              _self.location.Lat = e.lnglat.getLat();
              _self.mapObj.clearMap();
              const marker = new AMap.Marker({
                // eslint-disable-line no-unused-vars
                map: _self.mapObj,
                icon: startIcon,
                position: [e.lnglat.getLng(), e.lnglat.getLat()], // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: "网关"
              });
              address =
                _self.location.Lng.toString() +
                "," +
                _self.location.Lat.toString();
              _self.nodeDeployFormMap.setFieldsValue({
                address: address
              });
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleSubmit(e) {
      e.preventDefault();
      this.nodeEditForm.validateFields((err, values) => {
        if (!err) {
          this.submitLoading = true;
          let sentData = {};
          sentData.name = values.name;
          sentData.description = values.description;
          sentData.devEUI = values.devEUI;
          sentData.deviceProfileID = values.devProfile;
          sentData.applicationID = values.appEUI;
          //sentData.appKey = values.appKey;
          console.log(sentData);
          debugger;
          this.$api.appManage
            .updateAppNode({
              extra: this.id,
              device: sentData
            })
            .then(res => {
              if (res.status === 200) {
                this.$message.success("成功修改节点:" + this.id);

                if (this.returnedKey.hasKey) {
                  this.updateAppNodeKey(values.devEUI, values.appKey);
                } else {
                  this.createAppNodeKey(values.devEUI, values.appKey);
                }

                sessionStorage.setItem("tab", "1");
                setTimeout(() => {
                  this.$router.push({
                    name: "checkApp"
                  });
                }, 100);
              } else {
                this.$message.error(res.data.error);
              }
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => {
              this.submitLoading = false;
            });
        }
      });
    },
    showModal() {
      this.deleteModalVisible = true;
      this.ModalText = "确认删除" + ":" + this.id;
    },
    stateChange() {
      this.areaShow = !this.areaShow;
      if (!this.areaShow) {
        this.mapObj.clearMap();
      }
    },
    handleModalDelete(e) {
      this.deleteLoading = true;
      this.$api.appManage
        .deleteAppNode({
          extra: this.id
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.$message.success("成功删除：" + this.id);
            sessionStorage.setItem("tab", "1");
            setTimeout(() => {
              this.$router.push({
                name: "checkApp"
              });
            }, 100);
          } else {
            this.$message.error(res.data.error);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.deleteLoading = false;
        });
    },
    handleModalCancel(e) {
      this.deleteModalVisible = false;
    },
    backToNodeList() {
      sessionStorage.setItem("tab", "1");
      this.$router.push({
        name: "checkApp"
      });
    }
  }
};
</script>

<style>
.iot_view_App_node_deployEdit_form_content {
  padding-bottom: 32px;
}
.iot_view_App_node_deployEdit_form {
  margin-bottom: 12px;
}
.iot_view_App_node_deployEdit_formitem {
  margin-bottom: 8px;
  padding-bottom: 0px;
}
.iot_amap_App_nodeEdit_container {
  height: 380px;
  width: 100%;
  margin-bottom: 10px;
}
</style>
