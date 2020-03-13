<template>
  <a-layout style="background: #fff;padding: 22px 14px 0">
    <a-row
      style="background: #fff"
      type="flex"
      justify="space-between"
      align="top"
    >
      <a-col :span="10">
        <a-row class="iot_view_gatewayList_add_form_content">
          <a-form
            :form="gatewayAddForm"
            @submit="handleSubmit"
            layout="vertical"
            class="iot_view_gatewayList_add_form"
          >
            <a-form-item
              class="iot_view_gatewayList_add_formitem"
              label="网关名称："
              :required="true"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-input
                v-decorator="['gatewayName']"
                size="small"
                style="width: 100%;float: left"
              />
            </a-form-item>

            <a-form-item
              class="iot_view_gatewayList_add_formitem"
              label="网关ID："
              :required="true"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-input
                v-decorator="['gatewayID']"
                size="small"
                style="width: 100%;float: left"
              >
              </a-input>
            </a-form-item>
            <a-form-item
              class="iot_view_gatewayList_add_formitem"
              label="网络服务器："
              :required="true"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-cascader
                v-decorator="['internetServer']"
                style="width: 100%;float: left"
                size="small"
                :options="internetServer_options"
                placeholder=""
              />
            </a-form-item>

            <a-form-item
              class="iot_view_gatewayList_add_formitem"
              label="通信模式："
              :required="true"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-cascader
                v-decorator="['communicationMode']"
                style="width: 100%;float: left"
                size="small"
                :options="communicationMode_options"
                placeholder=""
              />
            </a-form-item>
            <a-form-item
              class="iot_view_gatewayList_add_formitem"
              label="频段："
              :required="true"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-cascader
                v-decorator="['band']"
                style="width: 100%;float: left"
                size="small"
                :options="band_options"
                placeholder=""
              />
            </a-form-item>
            <a-form-item
              class="iot_view_gatewayList_add_formitem"
              label="网关描述："
              :required="false"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-textarea
                placeholder="请填写网关描述，最多100个汉字"
                v-decorator="['band']"
                :rows="4"
                style="width: 100%;float: left;"
              />
            </a-form-item>
            <a-form-item
              class="iot_view_gatewayList_add_formitem"
              label="位置信息："
              :required="true"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <div style="display: inherit">
                <p style="margin-bottom: 2px;text-align: left">所在区域</p>
                <a-cascader
                  v-decorator="['band']"
                  style="width: 100%;float: left;margin-bottom: 12px"
                  size="small"
                  :options="band_options"
                  placeholder=""
                />
                <p style="margin-bottom: 2px;text-align: left">详细位置</p>
                <a-input
                  v-decorator="['address']"
                  size="small"
                  style="width: 100%;float: left"
                />
              </div>
            </a-form-item>
          </a-form>
          <a-row>
            <a-col :span="20" :offset="4" style="text-align: left">
              <a-button type="primary">保存</a-button>
              <a-button style="margin: 0 16px">取消</a-button>
              <a-button type="danger" icon="delete">删除设备</a-button>
            </a-col>
          </a-row>
        </a-row>
      </a-col>
      <a-col :span="12">
        <img
          src="../../../assets/map.png"
          style="height: 384px;display: inherit"
        />
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
export default {
  components: { ACol, ARow },
  data() {
    return {
      internetServer_options,
      communicationMode_options,
      band_options
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

  methods: {
    handleSubmit() {}
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
</style>
