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
        <a-row class="iot_view_gatewayList_add_form_content">
          <a-form
            :form="gatewayAddForm"
            layout="vertical"
            class="iot_view_gatewayList_add_form"
          >
            <a-form-item
              class="iot_view_gatewayList_add_formitem"
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
              class="iot_view_gatewayList_add_formitem"
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
              class="iot_view_gatewayList_add_formitem"
              label="网络服务器："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-cascader
                v-decorator="[
                  'internetServer',
                  {
                    rules: [{ required: true, message: '请选择网络服务器' }]
                  }
                ]"
                style="width: 90%;float: left;text-align: left"
                size="small"
                :options="internetServer_options"
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
              class="iot_view_gatewayList_add_formitem"
              label="通信模式："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-cascader
                v-decorator="[
                  'communicationMode',
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
              class="iot_view_gatewayList_add_formitem"
              label="频段："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-cascader
                v-decorator="['band']"
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
              class="iot_view_gatewayList_add_formitem"
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
              class="iot_view_gatewayList_add_formitem"
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
            <a-form-item
              class="iot_view_gatewayList_add_formitem"
              :required="true"
            >
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

export default {
  components: { ACol, ARow },
  data() {
    return {
      commitLoading: false,
      self: this,
      internetServer_options: [],
      communicationMode_options: [],
      band_options: [],
      area_options: [],
      mapData: [],
      netServer: {},
      Lng: "",
      Lat: ""
    };
  },

  beforeCreate() {
    this.gatewayAddForm = this.$form.createForm(this, {
      name: "gatewayAddForm"
    });
    this.gatewayAddForm.getFieldDecorator("keys", {
      initialValue: [],
      preserve: true
    });
  },

  beforeMount() {
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
        this.Lng = this.mapData.center[0];
        this.Lat = this.mapData.center[1];
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
          _self.Lng = e.lnglat.getLng();
          _self.Lat = e.lnglat.getLat();
          mapObj.clearMap();
          const marker = new AMap.Marker({
            // eslint-disable-line no-unused-vars
            map: mapObj,
            icon: startIcon,
            position: [_self.Lng, _self.Lat], // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: "网关"
          });
          address = _self.Lng.toString() + "," + _self.Lat.toString();
          _self.gatewayAddForm.setFieldsValue({
            address: address
          });
        });
      })
      .catch(err => {
        console.log(err);
      });

    this.internetServer_options = this.$store.getters.getNetServerOption;
    console.log(this.internetServer_options);
    this.area_options = this.$store.getters.getArea;
    this.communicationMode_options = this.$store.getters.getCommunicationMode;
    this.band_options = this.$store.getters.getBand_options;
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.gatewayAddForm.validateFields((err, values) => {
        if (!err) {
          this.commitLoading = true;
          for (let i = 0; i < this.internetServer_options.length; i++) {
            if (
              values.internetServer[0] === this.internetServer_options[i].value
            ) {
              values.networkServerID = this.internetServer_options[i].id;
            }
          }
          values.organizationID = 1;
          values.modulation = values.communicationMode[0];
          values.province = values.area[0];
          values.city = values.area[1];
          values.district = values.area[2];
          values.channels = "";
          values.gatewayProfileID = "";
          values.location = {
            latitude: this.Lat,
            longitude: this.Lng,
            altitude: 0.24,
            source: "UNKNOWN",
            accuracy: 0
          };
          values.discoveryEnabled = true;
          console.log(values);
          this.$api.gateway
            .creatGateway({
              gateway: values
            })
            .then(res => {
              console.log("拿到返回");
              console.log(res);
              if (res.status === 200) {
                this.$message.success("成功创建网关:" + values.id);
                setTimeout(() => {
                  this.$router.push({
                    name: "gatewayInit"
                  });
                }, 500);
                setTimeout(() => {
                  this.$router.push({
                    name: "gatewayInit"
                  });
                }, 100);
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
.iot_view_gatewayList_add_form_content {
  padding-bottom: 32px;
}
.iot_view_gatewayList_add_form {
  margin-bottom: 12px;
}
.iot_view_gatewayList_add_formitem {
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
