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
        <a-row class="iot_view_edit_form_content">
          <a-form
            :form="gatewayDeployForm"
            layout="vertical"
            class="iot_view_edit_form"
          >
            <a-form-item
              class="iot_view_edit_formitem"
              label="网关MAC："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input
                v-decorator="[
                  'id',
                  {
                    initialValue: this.returnedData.id
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
              class="iot_view_edit_formitem"
              label="网关名称："
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
                style="width: 90%;float: left"
              />
            </a-form-item>

            <a-form-item
              class="iot_view_edit_formitem"
              label="网络服务器："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-cascader
                v-decorator="[
                  'networkServer',
                  { initialValue: [this.returnedData.networkServerID] }
                ]"
                style="width: 90%;float: left"
                size="small"
                :options="networkServer_options"
                placeholder=""
                @change="networkServerChange"
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
              class="iot_view_edit_formitem"
              label="通信模式："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-cascader
                v-decorator="[
                  'communicationMode',
                  { initialValue: [this.returnedData.modulation] }
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
              class="iot_view_edit_formitem"
              label="频段："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-cascader
                v-decorator="[
                  'band',
                  { initialValue: [this.returnedData.channels] }
                ]"
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
              class="iot_view_edit_formitem"
              :label="gatewayDecription"
              :required="false"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-textarea
                placeholder="请填写网关描述，最多100个汉字"
                v-decorator="[
                  'description',
                  {
                    initialValue: this.returnedData.description
                  }
                ]"
                :rows="4"
                style="width: 90%;float: left;"
              />
            </a-form-item>
            <a-form-item
              class="iot_view_edit_formitem"
              label="位置信息："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <p style="text-align: left;margin-bottom: 2px;">所在区域</p>
              <a-cascader
                v-decorator="[
                  'area',
                  {
                    initialValue: [
                      this.returnedData.province,
                      this.returnedData.city,
                      this.returnedData.district
                    ]
                  }
                ]"
                style="width: 90%;float: left"
                size="small"
                :options="area_options"
                placeholder=""
              />
            </a-form-item>
            <a-form-item class="iot_view_edit_formitem" :required="true">
              <a-col :offset="8">
                <p style="margin-bottom: 2px;text-align: left">详细位置</p>
                <a-input
                  v-decorator="['location', { initialValue: this.getLocation }]"
                  size="small"
                  style="width: 90%;float: left;margin-bottom: 0px"
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
          <a-col :span="16" :offset="8">
            <a-button
              type="primary"
              @click="handleSubmit"
              :loading="submitLoading"
              >保存</a-button
            >
            <a-button style="margin: 0 16px" @click="handleBack">取消</a-button>
            <a-button type="danger" icon="delete" @click="handleDelete"
              >删除</a-button
            >
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="14">
        <div class="iot_amap-gatewayEdit_container">
          <el-amap vid="gateway_edit_map"> </el-amap>
        </div>
      </a-col>
    </a-row>
    <a-modal title="删除提示" :visible="isShowModal">
      <template slot="footer">
        <a-button key="back" @click="handleDeleteCancel">取消</a-button>
        <a-button
          type="danger"
          icon="delete"
          style="margin-left: 16px"
          @click="handleDeleteOk"
          :loading="confirmLoading"
          >确认删除</a-button
        >
      </template>
      <p>{{ ModalText }}</p>
    </a-modal>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
import wifi_map from "@/assets/wifi.png";
import {
  getNetworkServerById,
  getNetworkServerIdByServer,
  getCommunicationMode_options,
  getArea,
  getBand_options,
  getNetworkServerOptions
} from "@/utils/util";

export default {
  components: { ACol, ARow },
  data() {
    return {
      //label need align
      gatewayDecription: "\xa0\xa0\xa0" + "网关描述：",

      //options
      networkServer_options: [],
      communicationMode_options: [],
      band_options: [],
      area_options: [],

      //defaultValues
      //defaultNetworkServerName: [],
      //defaultModulation: [],
      //defaultArea: [],

      returnedData: {
        id: "",
        name: "",
        description: "",

        networkServerID: "",
        organizationID: "",

        province: "",
        city: "",
        district: "",

        location: {
          latitude: 0.25,
          longitude: 0.26,
          altitude: 0.24,
          source: "UNKNOWN",
          accuracy: 0
        },

        modulation: "",
        channels: "",

        createdAt: "",
        updatedAt: "",

        firstSeenAt: "",
        lastSeenAt: "",

        gatewayProfileID: ""
      },

      //modal
      ModalText: "Content of the modal",
      isShowModal: false,
      //loading
      submitLoading: false,
      confirmLoading: false
    };
  },

  computed: {
    getLocation() {
      if (
        !this.common.isEmpty(this.returnedData.location.longitude) &&
        !this.common.isEmpty(this.returnedData.location.latitude)
      )
        return (
          this.returnedData.location.longitude.toString() +
          "," +
          this.returnedData.location.latitude.toString()
        );
      return "";
    }
  },

  beforeCreate() {
    this.gatewayDeployForm = this.$form.createForm(this, {
      name: "gatewayDeployForm"
    });
  },

  beforeMount() {
    this.returnedData.id = this.$route.query.id;

    this.networkServer_options = getNetworkServerOptions();
    this.communicationMode_options = getCommunicationMode_options();
    this.band_options = getBand_options();
    this.area_options = getArea();

    this.getDetail(this.returnedData.id);
  },

  mounted() {},
  methods: {
    getDetail(id) {
      this.$api.gateway
        .gatewayDetail({
          extra: id
        })
        .then(res => {
          if (res.status === 200) {
            let infoData = res.data;
            let address = "";

            /*
            this.defaultModulation.push(infoDataTemp.gateway.modulation);
            this.defaultArea.push(infoDataTemp.gateway.province);
            this.defaultArea.push(infoDataTemp.gateway.city);
            this.defaultArea.push(infoDataTemp.gateway.district);
            */
            this.returnedData.id = infoData.gateway.id;
            this.returnedData.name = infoData.gateway.name;
            this.returnedData.description = infoData.gateway.description;
            this.returnedData.gatewayProfileID =
              infoData.gateway.gatewayProfileID;
            this.returnedData.networkServerID =
              infoData.gateway.networkServerID;

            this.returnedData.modulation = infoData.gateway.modulation;
            this.returnedData.channels = infoData.gateway.channels;

            this.returnedData.province = infoData.gateway.province;
            this.returnedData.city = infoData.gateway.city;
            this.returnedData.district = infoData.gateway.district;
            this.returnedData.location = infoData.gateway.location;

            this.returnedData.lastSeenAt = infoData.lastSeenAt;
            this.returnedData.createdAt = infoData.createdAt;

            /*
            address =
              infoDataTemp.gateway.location.longitude.toString() +
              "," +
              infoDataTemp.gateway.location.latitude.toString();
            this.gatewayDeployForm.setFieldsValue({
              address: address
            });
            */
            let mapObj = new AMap.Map("gateway_edit_map", {
              // eslint-disable-line no-unused-vars
              resizeEnable: true, //自适应大小
              zoom: 14,
              center: [
                infoData.gateway.location.longitude,
                infoData.gateway.location.latitude
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
              position: [
                _self.returnedData.location.longitude,
                _self.returnedData.location.latitude
              ], // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              title: "网关"
            });

            mapObj.on("click", function(e) {
              _self.returnedData.location.longitude = e.lnglat.getLng();
              _self.returnedData.location.latitude = e.lnglat.getLat();
              mapObj.clearMap();
              const marker = new AMap.Marker({
                // eslint-disable-line no-unused-vars
                map: mapObj,
                icon: startIcon,
                position: [
                  _self.returnedData.location.longitude,
                  _self.returnedData.location.latitude
                ], // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: "网关"
              });
              address =
                _self.returnedData.location.longitude.toString() +
                "," +
                _self.returnedData.location.latitude.toString();
              _self.gatewayDeployForm.setFieldsValue({
                location: address
              });
            });
          } else {
            console.log("获取网关节点初始信息失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.gatewayDeployForm.validateFields((err, values) => {
        if (!err) {
          this.submitLoading = true;

          var data = {
            id: this.returnedData.id,
            name: values.name,
            description: values.description,
            organizationID: this.common.getCurrentOrganizationID(),
            networkServerID: values.networkServer[0],

            province: values.area[0],
            city: values.area[1],
            district: values.area[2],

            location: {
              latitude: this.returnedData.location.latitude,
              longitude: this.returnedData.location.longitude,
              altitude: 0.24,
              source: "UNKNOWN",
              accuracy: 0
            },

            discoveryEnabled: true,
            modulation: values.communicationMode[0],
            channels: values.band[0],
            gatewayProfileID: ""
          };

          this.$api.gateway
            .updateGateway({
              extra: this.returnedData.id,
              gateway: data
            })
            .then(res => {
              if (res.status === 200) {
                console.log(res);
                this.$message.success("修改网关信息成功");
                var _this = this;
                setTimeout(() => {
                  _this.handleBack();
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
    networkServerChange(e) {
      /*
      let ifFindMatch = false;
      for (let i = 0; i < this.networkServer_options.length; i++) {
        if (this.networkServer_options[i].value === e.toString()) {
          this.gatewayDeployForm.setFieldsValue({
            gatewayID: this.networkServer_options[i].id
          });
          ifFindMatch = true;
        }
      }
      if (!ifFindMatch) {
        this.gatewayDeployForm.setFieldsValue({
          gatewayID: ""
        });
      }*/
    },
    handleDelete() {
      this.isShowModal = true;
      this.ModalText = "确认删除" + ":" + this.returnedData.name;
    },

    handleDeleteOk(e) {
      this.confirmLoading = true;
      this.$api.gateway
        .deleteGateway({
          extra: this.returnedData.id
        })
        .then(res => {
          if (res.status === 200) {
            this.isShowModal = false;
            this.$message.success("删除网关成功");
            var _this = this;
            setTimeout(() => {
              _this.handleBack();
            }, 100);
          } else {
            this.$message.error(res.data.code);
            this.$message.error(res.data.error);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("删除网关失败");
        })
        .finally(() => {
          this.confirmLoading = false;
        });
    },
    handleDeleteCancel(e) {
      this.isShowModal = false;
    },

    handleBack() {
      this.$router.push({
        name: "gatewayInit"
      });
    }
  }
};
</script>

<style>
.iot_view_edit_form_content {
  padding-bottom: 12px;
}
.iot_view_edit_form {
  margin-bottom: 12px;
}
.iot_view_edit_formitem {
  margin-bottom: 8px;
  padding-bottom: 0px;
}
.iot_amap-gatewayEdit_container {
  height: 400px;
  width: 100%;
}
.iot_amap_gateawyEdit_demo {
  height: 400px;
}
</style>
