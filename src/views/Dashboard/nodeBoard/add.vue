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
        <a-row class="iot_view_node_add_form_content">
          <a-row>
            <a-form
              :form="nodeDeployForm"
              @submit="handleSubmit"
              layout="vertical"
              class="iot_view_node_add_form"
            >
              <a-form-item
                class="iot_view_node_add_formitem"
                label="入网方式："
                :required="true"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-radio-group
                  @change="radioOnChange"
                  v-model="value"
                  style="text-align: left;float: left"
                >
                  <a-radio :value="1">OTAA</a-radio>
                  <a-radio :value="2">ABP</a-radio>
                </a-radio-group>
              </a-form-item>

              <a-form-item
                class="iot_view_node_add_formitem"
                label="协议版本："
                :required="true"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-cascader
                  v-decorator="['agreementVision']"
                  style="width: 90%;float: left;text-align: left"
                  size="small"
                  :options="agreementVision_option"
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
                class="iot_view_node_add_formitem"
                label="节点名称："
                :required="true"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-input
                  v-decorator="['nodeName']"
                  size="small"
                  style="width: 90%;float: left;text-align: left"
                >
                </a-input>
              </a-form-item>

              <a-form-item
                class="iot_view_node_add_formitem"
                label="频段："
                :required="true"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
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
                class="iot_view_node_add_formitem"
                label="Class："
                :required="true"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-cascader
                  v-decorator="['class']"
                  style="width: 90%;float: left;text-align: left"
                  size="small"
                  :options="class_options"
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
                class="iot_view_node_add_formitem"
                label="节点编号(DevEUI)："
                :required="true"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-input
                  v-decorator="['DevEUI']"
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
                class="iot_view_node_add_formitem"
                label="应用编号(AppEUI)："
                :required="true"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-input
                  v-decorator="['AppEUI']"
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
                class="iot_view_node_add_formitem"
                label="AppKey："
                :required="true"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-input
                  v-decorator="['AppKey']"
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
                v-for="(k, index) in nodeDeployForm.getFieldValue('keys')"
                :key="k"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                :label="getLabel(index)"
                :required="true"
                class="iot_view_node_add_formitem"
              >
                <a-input
                  v-decorator="[
                    `names[${k}]`,
                    {
                      validateTrigger: ['change', 'blur']
                    }
                  ]"
                  size="small"
                  style="width: 90%;float: left;text-align: left"
                />
                <a-tooltip placement="rightTop">
                  <template slot="title">
                    {{ getLabel(index) }}
                  </template>
                  <a-icon
                    type="exclamation-circle"
                    style="height: 24px;line-height: 24px;width: 24px;
          vertical-align: text-top"
                  />
                </a-tooltip>
              </a-form-item>

              <a-form-item
                class="iot_view_node_add_formitem"
                label="超时周期(分钟)："
                :required="true"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-input
                  v-decorator="['AppKey']"
                  size="small"
                  style="width: 90%;float: left;text-align: left"
                >
                </a-input>
              </a-form-item>
              <a-form-item
                class="iot_view_node_add_formitem"
                label="使用状态："
                :required="true"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-cascader
                  v-decorator="['state']"
                  style="width: 90%;float: left;text-align: left"
                  size="small"
                  :options="state_options"
                  placeholder=""
                />
              </a-form-item>
              <a-form-item
                class="iot_view_node_add_formitem"
                label="节点描述："
                :required="false"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-textarea
                  placeholder="请填写节点描述，最多100个汉字"
                  v-decorator="['band']"
                  :rows="4"
                  style="width: 90%;float: left;text-align: left"
                />
              </a-form-item>
            </a-form>
            <a-col :span="16" :offset="8">
              <div style="display: flex">
                <a-button type="primary">保存</a-button>
                <a-button style="margin: 0 16px">取消</a-button>
              </div>
            </a-col>
          </a-row>
        </a-row>
      </a-col>
      <a-col :span="14">
        <div>
          <a-form
            :form="nodeDeployFormSecond"
            @submit="handleSubmitSecond"
            layout="vertical"
            class="iot_view_node_add_form"
          >
            <a-form-item
              class="iot_view_node_add_formitem"
              label="地理位置："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
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
              class="iot_view_node_add_formitem"
              label="所在区域："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
            >
              <a-cascader
                v-decorator="['area']"
                style="width: 90%;float: left;text-align: left"
                size="small"
                :options="area_option"
                placeholder=""
              />
            </a-form-item>
            <a-form-item
              v-if="areaShow"
              class="iot_view_node_add_formitem"
              label="详细位置："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
            >
              <a-input
                v-decorator="['areaDetail']"
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
        </div>
        <div class="iot_amap-noteAdd-container">
          <el-amap
            vid="note_add_map"
            :center="center"
            :map-manager="amapManager"
            :zoom="zoom"
            :events="events"
            class="iot_amap_noteAdd_demo"
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
let id = 0;
const state_options = [
  {
    value: "test",
    label: "测试"
  },
  {
    value: "environment",
    label: "环境"
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
const class_options = [
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
const agreementVision_option = [
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
const area_option = [
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
      state_options,
      class_options,
      band_options,
      agreementVision_option,
      area_option,

      areaShow: false,
      value: 1,

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
    this.nodeDeployForm = this.$form.createForm(this, {
      name: "nodeDeployForm"
    });
    this.nodeDeployForm.getFieldDecorator("keys", {
      initialValue: [],
      preserve: true
    });
    this.nodeDeployFormSecond = this.$form.createForm(this, {
      name: "nodeDeployForm"
    });
    this.nodeDeployFormSecond.getFieldDecorator("keys", {
      initialValue: [],
      preserve: true
    });
  },
  methods: {
    handleSubmit() {},
    handleSubmitSecond() {},
    radioOnChange(e) {
      if (e.target.value === 1) {
        let item;
        for (item in this.nodeDeployForm.getFieldValue("keys")) {
          this.remove(item);
        }
      } else if (e.target.value === 2) {
        id = 0;
        this.add();
        this.add();
        this.add();
      }
    },
    remove(k) {
      const { nodeDeployForm } = this;
      // can use data-binding to get
      const keys = nodeDeployForm.getFieldValue("keys");

      // can use data-binding to set
      nodeDeployForm.setFieldsValue({
        keys: keys.filter(key => key.toString() !== k.toString())
      });
    },
    add() {
      const { nodeDeployForm } = this;
      // can use data-binding to get
      const keys = nodeDeployForm.getFieldValue("keys");
      const nextKeys = keys.concat(id++);
      // can use data-binding to set
      // important! notify form to detect changes
      nodeDeployForm.setFieldsValue({
        keys: nextKeys
      });
    },
    getLabel(index) {
      if (index == 0) {
        return "NwksKey：";
      } else if (index == 1) {
        return "FCntUp：";
      } else {
        return "FCntDn：";
      }
    },
    stateChange() {
      this.areaShow = !this.areaShow;
    }
  }
};
</script>

<style>
.iot_view_node_add_form_content {
  padding-bottom: 32px;
}
.iot_view_node_add_form {
  margin-bottom: 12px;
}
.iot_view_node_add_formitem {
  margin-bottom: 8px;
  padding-bottom: 0px;
}
.iot_amap-noteAdd-container {
  height: 410px;
  width: 100%;
}
.iot_amap_noteAdd_demo {
}
</style>
