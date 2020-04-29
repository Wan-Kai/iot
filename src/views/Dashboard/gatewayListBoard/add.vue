<template>
  <a-layout
    style="background: #fff;padding: 22px 14px 0;min-height: fit-content"
  >
    <a-row
      style="background: #fff"
      type="flex"
      justify="space-between"
      align="top"
      :gutter="16"
    >
      <a-col :span="10">
        <a-row class="iot_view_add_form_content">
          <a-form :form="addForm" layout="vertical" class="iot_view_add_form">
            <a-form-item
              class="iot_view_add_formitem"
              label="网关ID："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                v-decorator="[
                  'id',
                  {
                    rules: [
                      {
                        required: true,
                        message: '长度为8-16位，不允许有中文',
                        pattern: /^[^\u4e00-\u9fa5]{8,16}$/
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
                  长度为8-16位，不允许有中文
                </template>
                <a-icon
                  type="exclamation-circle"
                  style="height: 24px;line-height: 24px;width: 24px;
          vertical-align: text-top"
                />
              </a-tooltip>
            </a-form-item>

            <a-form-item
              class="iot_view_add_formitem"
              label="网关名称："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                v-decorator="[
                  'name',
                  {
                    rules: [{ required: true, message: '请填写网关名称' }]
                  }
                ]"
                size="small"
                style="width: 90%;float: left;text-align: left"
              />
            </a-form-item>

            <a-form-item
              class="iot_view_add_formitem"
              label="网络服务器："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-cascader
                v-decorator="[
                  'networkServer',
                  {
                    rules: [{ required: true, message: '请选择网络服务器' }]
                  }
                ]"
                style="width: 90%;float: left;text-align: left"
                size="small"
                :options="networkServer_options"
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
              class="iot_view_add_formitem"
              label="通信模式："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-cascader
                v-decorator="[
                  'modulation',
                  {
                    rules: [{ required: true, message: '请选择通信模式' }]
                  }
                ]"
                style="width: 90%;float: left;text-align: left"
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
              class="iot_view_add_formitem"
              label="频段："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-cascader
                v-decorator="['channels']"
                style="width: 90%;float: left;text-align: left"
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
              class="iot_view_add_formitem"
              label="网关描述："
              :required="false"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-textarea
                placeholder="请填写网关描述，最多100个汉字"
                v-decorator="['description']"
                :rows="4"
                style="width: 90%;float: left;text-align: left"
              />
            </a-form-item>
            <a-form-item
              class="iot_view_add_formitem"
              label="位置信息："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <p style="margin-bottom: 2px;text-align: left">所在区域</p>
              <a-cascader
                v-decorator="[
                  'area',
                  {
                    rules: [{ required: true, message: '请选择所在区域' }]
                  }
                ]"
                style="width: 90%;float: left;text-align: left"
                size="small"
                :options="area_options"
                placeholder=""
              />
            </a-form-item>
            <a-form-item class="iot_view_add_formitem" :required="true">
              <a-col :offset="6">
                <p style="margin-bottom: 2px;text-align: left">详细位置</p>
                <a-input
                  v-decorator="['address']"
                  size="small"
                  style="width: 90%;float: left;text-align: left;margin-bottom: 12px"
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
          <a-row>
            <a-col :span="18" :offset="6" style="text-align: left">
              <a-button
                type="primary"
                @click="handleSubmit"
                :loading="commitLoading"
                >保存</a-button
              >
              <a-button style="margin: 0 16px" @click="handleBack"
                >取消</a-button
              >
            </a-col>
          </a-row>
        </a-row>
      </a-col>
      <a-col :span="14">
        <div class="iot_amap-gatewayAdd-container">
          <el-amap vid="gateway_add_map"> </el-amap>
        </div>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
import wifi_map from "../../../assets/wifi.png";
import {
  getNetworkServerOptions,
  getArea,
  getCommunicationMode_options,
  getBand_options,
  getCurrentOrganizationID
} from "@/utils/util";

export default {
  components: { ACol, ARow },
  data() {
    return {
      //options
      networkServer_options: [],
      communicationMode_options: [],
      band_options: [],
      area_options: [],

      currentRecord: {
        id: "",
        name: "",
        description: "",
        organizationID: "",
        networkServerID: false,
        modulation: "",
        channels: "",

        province: "",
        city: "",
        district: "",
        area: "",
        location: {
          Lng: "",
          Lat: ""
        }
      },

      //mapData
      mapData: [],

      //loading
      commitLoading: false
    };
  },

  beforeCreate() {
    this.addForm = this.$form.createForm(this, {
      name: "addForm"
    });
  },

  beforeMount() {
    this.networkServer_options = getNetworkServerOptions();
    this.area_options = getArea();
    this.communicationMode_options = getCommunicationMode_options();
    this.band_options = getBand_options();

    this.getMap();
  },

  methods: {
    getMap() {
      this.$api.index
        .mapMarkers({})
        .then(res => {
          this.mapData = res.data.result;
          let mapObj = new AMap.Map("gateway_add_map", {
            // eslint-disable-line no-unused-vars
            resizeEnable: true, //自适应大小
            zoom: this.mapData.zoom,
            center: this.mapData.center
          });
          this.currentRecord.location.Lng = this.mapData.center[0];
          this.currentRecord.location.Lat = this.mapData.center[1];
          let startIcon = new AMap.Icon({
            // 图标尺寸
            size: new AMap.Size(25, 25),
            // 图标的取图地址
            image: wifi_map, // 您自己的图标
            // 图标所用图片大小
            imageSize: new AMap.Size(25, 25)
          });

          let address = "";
          let _self = this;
          mapObj.on("click", function(e) {
            _self.currentRecord.location.Lng = e.lnglat.getLng();
            _self.currentRecord.location.Lat = e.lnglat.getLat();
            mapObj.clearMap();
            const marker = new AMap.Marker({
              // eslint-disable-line no-unused-vars
              map: mapObj,
              icon: startIcon,
              position: [
                _self.currentRecord.location.Lng,
                _self.currentRecord.location.Lat
              ], // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              title: "网关"
            });
            address =
              _self.currentRecord.location.Lng.toString() +
              "," +
              _self.currentRecord.location.Lat.toString();
            _self.addForm.setFieldsValue({
              address: address
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleSubmit(e) {
      e.preventDefault();
      this.addForm.validateFields((err, values) => {
        if (!err) {
          this.commitLoading = true;

          var data = {
            id: values.id,
            name: values.name,
            description: values.description,
            organizationID: getCurrentOrganizationID(),
            networkServerID: values.networkServer[0],

            province: values.area[0],
            city: values.area[1],
            district: values.area[2],

            location: {
              latitude: this.currentRecord.location.latitude,
              longitude: this.currentRecord.location.longitude,
              altitude: 0.24,
              source: "UNKNOWN",
              accuracy: 0
            },

            discoveryEnabled: true,
            modulation: values.communicationMode[0],
            channels: values.band[0],
            gatewayProfileID: ""
          };

          console.log(data);

          this.$api.gateway
            .createGateway({
              gateway: data
            })
            .then(res => {
              console.log(res);
              if (res.status === 200) {
                this.$message.success("创建网关成功:" + values.id);
                var _this = this;
                setTimeout(() => {
                  _this.handleBack();
                }, 500);
              } else if (res.status === 400) {
                console.log(res);
                this.$message.error("错误的网关ID");
              } else {
                console.log("res失败");
                this.$message.error(res.data.code);
                this.$message.error(res.data.error);
              }
            })
            .catch(err => {
              console.log("接口失败");
              console.log(err);
              this.$message.error(err.data.error);
            })
            .finally(() => {
              this.commitLoading = false;
            });
        }
      });
    },
    handleBack() {
      this.$router.push("/admin/dashboard/gatewayManage");
    }
  }
};
</script>

<style scoped>
.iot_view_add_form_content {
  padding-bottom: 32px;
}
.iot_view_add_form {
  margin-bottom: 12px;
}
.iot_view_add_formitem {
  margin-bottom: 8px;
  padding-bottom: 0px;
}
.iot_amap-gatewayAdd-container {
  height: 400px;
  width: 100%;
}
.iot_amap_gateawyAdd_demo {
  height: 400px;
}
</style>
