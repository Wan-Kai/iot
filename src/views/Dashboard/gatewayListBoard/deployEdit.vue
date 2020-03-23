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
            @submit="handleSubmit"
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
                v-decorator="['gatewayName']"
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
                v-decorator="['gatewayID']"
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
                v-decorator="['internetServer']"
                style="width: 90%;float: left"
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
              class="iot_view_gatewayList_deployEdit_formitem"
              label="通信模式："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-cascader
                v-decorator="['communicationMode']"
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
                v-decorator="['description']"
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
                v-decorator="['area']"
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
          <a-row>
            <a-col :span="18" :offset="6">
              <a-button type="primary">保存</a-button>
              <a-button style="margin: 0 16px">取消</a-button>
              <a-button type="danger" icon="delete">删除设备</a-button>
            </a-col>
          </a-row>
        </a-row>
      </a-col>
      <a-col :span="14">
        <div class="iot_amap-gatewayEdit-container">
          <el-amap
            vid="gateway_edit_map"
            :center="center"
            :map-manager="amapManager"
            :zoom="zoom"
            :events="events"
            class="iot_amap_gateawyEdit_demo"
          >
          </el-amap>
        </div>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
const internetServer_options = [
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
let amapManager = new VueAMap.AMapManager();
export default {
  components: { ACol, ARow },
  data() {
    return {
      internetServer_options,
      communicationMode_options,
      band_options,
      area_options,

      zoom: 14,
      center: [114.362272, 30.532565],
      amapManager,
      events: {
        init(map) {
          //map.setMapStyle("amap://styles/whitesmoke");
          AMapUI.loadUI(["overlay/SimpleMarker"], function(SimpleMarker) {
            const marker = new SimpleMarker({
              iconLabel: "A",
              iconStyle: "blue",
              map: map,
              position: map.getCenter()
            });
            map.add(marker);
          });
        }
      }
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

  methods: {
    handleSubmit() {}
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
