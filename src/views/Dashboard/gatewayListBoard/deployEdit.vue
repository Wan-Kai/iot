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
        <a-row class="iot_view_gatewayList_deployEdit_form_content">
          <a-form
            :form="gatewayDeployForm"
            layout="vertical"
            class="iot_view_gatewayList_deployEdit_form"
          >
            <a-form-item
              class="iot_view_gatewayList_deployEdit_formitem"
              label="网关名称："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                v-decorator="[
                  'name',
                  {
                    initialValue: this.name
                  }
                ]"
                size="small"
                style="width: 90%;float: left"
              />
            </a-form-item>

            <a-form-item
              class="iot_view_gatewayList_deployEdit_formitem"
              label="网关ID："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                v-decorator="[
                  'id',
                  {
                    initialValue: this.id
                  }
                ]"
                size="small"
                style="width: 90%;float: left"
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
              class="iot_view_gatewayList_deployEdit_formitem"
              label="网络服务器："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-cascader
                v-decorator="[
                  'networkServerName',
                  { initialValue: this.defaultData }
                ]"
                style="width: 90%;float: left"
                size="small"
                :options="internetServer_options"
                placeholder=""
                :defaultValue="this.defaultData"
                @change="netServerChange"
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
              class="iot_view_gatewayList_deployEdit_formitem"
              label="通信模式："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-cascader
                v-decorator="[
                  'communicationMode',
                  { initialValue: this.defaultDataModulation }
                ]"
                style="width: 90%;float: left"
                size="small"
                :options="communicationMode_options"
                placeholder=""
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
              class="iot_view_gatewayList_deployEdit_formitem"
              label="频段："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-cascader
                v-decorator="['band']"
                style="width: 90%;float: left"
                size="small"
                :options="band_options"
                placeholder=""
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
              class="iot_view_gatewayList_deployEdit_formitem"
              label="网关描述："
              :required="false"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-textarea
                placeholder="请填写网关描述，最多100个汉字"
                v-decorator="[
                  'description',
                  {
                    initialValue: this.description
                  }
                ]"
                :rows="4"
                style="width: 90%;float: left;"
              />
            </a-form-item>
            <a-form-item
              class="iot_view_gatewayList_deployEdit_formitem"
              label="位置信息："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <p style="text-align: left;margin-bottom: 2px;">所在区域</p>
              <a-cascader
                v-decorator="['area', { initialValue: this.defaultDataArea }]"
                style="width: 90%;float: left"
                size="small"
                :options="area_options"
                placeholder=""
              />
            </a-form-item>
            <a-form-item
              class="iot_view_gatewayList_deployEdit_formitem"
              :required="true"
            >
              <a-col :offset="6">
                <p style="margin-bottom: 2px;text-align: left">详细位置</p>
                <a-input
                  v-decorator="['address']"
                  size="small"
                  style="width: 90%;float: left;margin-bottom: 12px"
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
              </a-col>
            </a-form-item>
          </a-form>
          <a-modal title="删除提示" :visible="visible" @cancel="handleCancel">
            <template slot="footer">
              <a-button key="back" @click="handleCancel">取消</a-button>
              <a-button
                type="danger"
                icon="delete"
                style="margin-left: 16px"
                @click="handleOk"
                :loading="confirmLoading"
                >确认删除</a-button
              >
            </template>
            <p>{{ ModalText }}</p>
          </a-modal>
          <a-row>
            <a-col :span="18" :offset="6">
              <a-button
                type="primary"
                @click="handleSubmit"
                :loading="submitLoading"
                >保存</a-button
              >
              <a-button style="margin: 0 16px" @click="back">取消</a-button>
              <a-button type="danger" icon="delete" @click="showModal"
                >删除设备</a-button
              >
            </a-col>
          </a-row>
        </a-row>
      </a-col>
      <a-col :span="14">
        <div class="iot_amap-gatewayEdit-container">
          <el-amap vid="gateway_edit_map"> </el-amap>
        </div>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
import wifi_map from "../../../assets/wifi.png";
import { getNetServerIdByServer } from "@/utils/util";

export default {
  components: { ACol, ARow },
  data() {
    return {
      defaultData: [],
      defaultDataModulation: [],
      defaultDataArea: [],
      id: "",
      name: "",
      description: "",
      networkServerID: "",
      internetServer_options: [],
      communicationMode_options: [],
      band_options: [],
      area_options: [],
      location: {
        latitude: 0.25,
        longitude: 0.26,
        altitude: 0.24,
        source: "UNKNOWN",
        accuracy: 0
      },
      mapData: [],
      ModalText: "Content of the modal",
      visible: false,
      submitLoading: false,
      confirmLoading: false
    };
  },

  beforeCreate() {
    this.gatewayDeployForm = this.$form.createForm(this, {
      name: "gatewayDeployForm"
    });
    this.gatewayDeployForm.getFieldDecorator("keys", {
      initialValue: [],
      preserve: true
    });
  },

  beforeMount() {
    this.id = this.$route.query.id;

    this.communicationMode_options = this.$store.getters.getCommunicationMode;
    this.area_options = this.$store.getters.getArea;
    this.band_options = this.$store.getters.getBand_options;
    this.$api.index
      .mapMarkers({})
      .then(res => {
        this.mapData = res.data.result;
      })
      .catch(err => {
        console.log(err);
      });

    this.$api.gateway
      .gatewayDetail({
        extra: this.id
      })
      .then(res => {
        let infoDataTemp = res.data;
        let address = "";
        this.internetServer_options = this.$store.getters.getNetServerOption;

        let defaultValue = this.$store.getters.getNetServerById(
          infoDataTemp.gateway.networkServerID
        );
        if (defaultValue) {
          this.defaultData.push(defaultValue);
        }

        this.defaultDataModulation.push(infoDataTemp.gateway.modulation);
        this.defaultDataArea.push(infoDataTemp.gateway.province);
        this.defaultDataArea.push(infoDataTemp.gateway.city);
        this.defaultDataArea.push(infoDataTemp.gateway.district);
        this.name = infoDataTemp.gateway.name;
        this.description = infoDataTemp.gateway.description;
        this.location = infoDataTemp.gateway.location;
        this.networkServerID = infoDataTemp.gateway.networkServerID;
        address =
          infoDataTemp.gateway.location.longitude.toString() +
          "," +
          infoDataTemp.gateway.location.latitude.toString();
        this.gatewayDeployForm.setFieldsValue({
          address: address
        });

        let mapObj = new AMap.Map("gateway_edit_map", {
          // eslint-disable-line no-unused-vars
          resizeEnable: true, //自适应大小
          zoom: 14,
          center: [
            infoDataTemp.gateway.location.longitude,
            infoDataTemp.gateway.location.latitude
          ]
        });
        let startIcon = new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(25, 25),
          // 图标的取图地址
          image: wifi_map, // 您自己的图标
          // 图标所用图片大小
          imageSize: new AMap.Size(25, 25)
        });

        let _self = this;
        const marker = new AMap.Marker({
          // eslint-disable-line no-unused-vars
          map: mapObj,
          icon: startIcon,
          position: [_self.location.longitude, _self.location.latitude], // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: "网关"
        });
        mapObj.on("click", function(e) {
          _self.location.longitude = e.lnglat.getLng();
          _self.location.latitude = e.lnglat.getLat();
          mapObj.clearMap();
          const marker = new AMap.Marker({
            // eslint-disable-line no-unused-vars
            map: mapObj,
            icon: startIcon,
            position: [_self.location.longitude, _self.location.latitude], // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: "网关"
          });
          address =
            _self.location.longitude.toString() +
            "," +
            _self.location.latitude.toString();
          _self.gatewayDeployForm.setFieldsValue({
            address: address
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  },

  mounted() {},
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.gatewayDeployForm.validateFields((err, values) => {
        if (!err) {
          this.submitLoading = true;
          let sentData = {};
          sentData.location = this.location;
          sentData.id = values.id;
          sentData.name = values.name;
          sentData.description = values.description;
          sentData.province = values.area[0];
          sentData.city = values.area[1];
          sentData.district = values.area[2];
          console.log(sentData);
          sentData.networkServerID = getNetServerIdByServer(
            values.networkServerName[0]
          );
          sentData.modulation = values.communicationMode[0];

          this.$api.gateway
            .updateGateway({
              extra: this.id,
              gateway: sentData
            })
            .then(res => {
              if (res.status === 200) {
                console.log(res);
                this.$message.success("修改网关信息成功");
                setTimeout(() => {
                  this.$router.push({
                    name: "gatewayInit"
                  });
                }, 100);
              } else {
                this.$message.error(res.data.code);
                this.$message.error(res.data.error);
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error(err.data.error);
            })
            .finally(() => {
              this.submitLoading = false;
            });
        }
      });
    },
    netServerChange(e) {
      let ifFindMatch = false;
      for (let i = 0; i < this.internetServer_options.length; i++) {
        if (this.internetServer_options[i].value === e.toString()) {
          this.gatewayDeployForm.setFieldsValue({
            gatewayID: this.internetServer_options[i].id
          });
          ifFindMatch = true;
        }
      }
      if (!ifFindMatch) {
        this.gatewayDeployForm.setFieldsValue({
          gatewayID: ""
        });
      }
    },
    showModal() {
      this.visible = true;
      this.ModalText = "确认删除" + ":" + this.id;
    },
    handleOk(e) {
      this.confirmLoading = true;
      this.$api.gateway
        .deleteGateway({
          extra: this.id
        })
        .then(res => {
          if (res.status === 200) {
            this.visible = false;
            this.$message.success("成功删除网络服务器");
            setTimeout(() => {
              this.$router.push({
                name: "gatewayInit"
              });
            }, 100);
          } else {
            this.$message.error(res.data.code);
            this.$message.error(res.data.error);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("删除网络服务器失败");
        })
        .finally(() => {
          this.confirmLoading = false;
        });
    },
    handleCancel(e) {
      this.visible = false;
    },
    back() {
      this.$router.push({
        name: "gatewayInit"
      });
    }
  }
};
</script>

<style>
.iot_view_gatewayList_deployEdit_form_content {
  padding-bottom: 32px;
}
.iot_view_gatewayList_deployEdit_form {
  margin-bottom: 12px;
}
.iot_view_gatewayList_deployEdit_formitem {
  margin-bottom: 8px;
  padding-bottom: 0px;
}
.iot_amap-gatewayEdit-container {
  height: 400px;
  width: 100%;
}
.iot_amap_gateawyEdit_demo {
  height: 400px;
}
</style>
