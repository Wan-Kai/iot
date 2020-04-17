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
        <a-row class="iot_view_node_deployEdit_form_content">
          <a-form
            :form="nodeDeployForm"
            @submit="handleSubmit"
            layout="vertical"
            class="iot_view_node_deployEdit_form"
          >
            <a-form-item
              class="iot_view_node_deployEdit_formitem"
              label="入网方式："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-radio-group
                @change="radioOnChange"
                v-model="value"
                style="float: left"
              >
                <a-radio :value="1">OTAA</a-radio>
                <a-radio :value="2">ABP</a-radio>
              </a-radio-group>
            </a-form-item>

            <a-form-item
              class="iot_view_node_deployEdit_formitem"
              label="协议版本："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input
                v-decorator="['macVersion']"
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
              class="iot_view_node_deployEdit_formitem"
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
              v-for="(k, index) in nodeDeployForm.getFieldValue('keys')"
              :key="k"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
              :label="getLabel(index)"
              :required="true"
              class="iot_view_node_deployEdit_formitem"
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
              class="iot_view_node_deployEdit_formitem"
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
          <a-row>
            <a-col :span="16" :offset="8">
              <div style="display: flex">
                <a-button type="primary">保存</a-button>
                <a-button style="margin: 0 16px">取消</a-button>
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
        </div>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
let id = 0;
export default {
  components: { ACol, ARow },
  data() {
    return {
      ModalText: "",
      areaShow: false,
      submitLoading: false,
      confirmLoading: false,
      visible: false,
      value: 1,
      Lng: "",
      Lat: "",

      mapObj: {},
      mapData: []
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
  },

  beforeMount() {},

  methods: {
    handleSubmit() {},
    handleSubmitSecond() {},
    showModal() {
      this.visible = true;
      this.ModalText = "确认删除" + ":" + this.id;
    },
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
      if (!this.areaShow) {
        this.mapObj.clearMap();
      }
    },
    handleOk(e) {},
    handleCancel(e) {
      this.visible = false;
    }
  }
};
</script>

<style>
.iot_view_node_deployEdit_form_content {
  padding-bottom: 32px;
}
.iot_view_node_deployEdit_form {
  margin-bottom: 12px;
}
.iot_view_node_deployEdit_formitem {
  margin-bottom: 8px;
  padding-bottom: 0px;
}
</style>
