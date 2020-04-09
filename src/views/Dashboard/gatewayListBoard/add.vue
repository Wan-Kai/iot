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
                  'gatewayName',
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
                  'gatewayID',
                  {
                    rules: [{ required: true, message: '请填写网关ID' }]
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
                v-decorator="[
                  'band',
                  {
                    rules: [{ required: true, message: '请选择频段' }]
                  }
                ]"
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
              <a-button type="primary" @click="handleSubmit">保存</a-button>
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
const communicationMode_options = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake"
          }
        ]
      }
    ]
  }
];
const band_options = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake"
          }
        ]
      }
    ]
  }
];
const area_options = [
  {
    value: "hubei",
    label: "湖北省",
    children: [
      {
        value: "wuhan",
        label: "武汉市",
        children: [
          {
            value: "hongshan",
            label: "洪山区"
          }
        ]
      }
    ]
  }
];
export default {
  components: { ACol, ARow },
  data() {
    return {
      internetServer_options: [],
      communicationMode_options,
      band_options,
      area_options,
      mapData: []
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
        let startIcon = new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(25, 25),
          // 图标的取图地址
          image: wifi_map, // 您自己的图标
          // 图标所用图片大小
          imageSize: new AMap.Size(25, 25)
        });
        const marker = new AMap.Marker({
          // eslint-disable-line no-unused-vars
          map: mapObj,
          icon: startIcon,
          position: mapObj.center, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: "网关"
        });
      })
      .catch(err => {
        console.log(err);
      });
    let netServer = this.$store.getters.getNetServer;
    let temp = {
      value: "",
      label: "",
      id: ""
    };
    for (let i = 0; i < netServer.length; i++) {
      temp.label = netServer[i].name + "@" + netServer[i].server;
      temp.value = netServer[i].server;
      temp.id = netServer[i].id;
      this.internetServer_options.push(temp);
    }
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.gatewayAddForm.validateFields((err, values) => {
        console.log(values);
        if (!err) {
          this.$api.appManage
            .appAdd({
              values
            })
            .catch(err => {
              console.log(err);
            });
          this.$message.success("成功创建网关:" + values.gatewayId);
          // setTimeout(() => {
          //   this.$router.push({
          //     name: "gatewayInit"
          //   });
          // }, 500);
        }
      });
    },
    handleBack() {
      this.$router.push("/admin/dashboard/gatewayManage");
    },
    netServerChange(e) {
      let ifFindMatch = false;
      for (let i = 0; i < this.internetServer_options.length; i++) {
        if (this.internetServer_options[i].value === e.toString()) {
          this.gatewayAddForm.setFieldsValue({
            gatewayID: this.internetServer_options[i].id
          });
          ifFindMatch = true;
        }
      }
      if (!ifFindMatch) {
        this.gatewayAddForm.setFieldsValue({
          gatewayID: ""
        });
      }
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
