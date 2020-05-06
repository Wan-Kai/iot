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
                  v-model="currentRecord.supportsJoinType"
                  style="text-align: left;float: left"
                >
                  <a-radio value="OTAA">OTAA</a-radio>
                  <a-radio value="ABP">ABP</a-radio>
                </a-radio-group>
              </a-form-item>

              <a-form-item
                class="iot_view_node_add_formitem"
                label="网络服务器："
                :required="true"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
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
                class="iot_view_node_add_formitem"
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
                class="iot_view_node_add_formitem"
                label="节点名称："
                :required="true"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-input
                  v-decorator="['name']"
                  size="small"
                  style="width: 90%;float: left;text-align: left"
                >
                </a-input>
              </a-form-item>

              <a-form-item
                v-if="!this.currentRecord.supportsJoin"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                label="FCntUp："
                :required="true"
                class="iot_view_node_add_formitem"
              >
                <a-input
                  v-decorator="['FCntUp']"
                  size="small"
                  style="width: 90%;float: left;text-align: left"
                >
                </a-input>
                <a-tooltip placement="rightTop">
                  <template slot="title">
                    temp
                  </template>
                  <a-icon
                    type="exclamation-circle"
                    style="height: 24px;line-height: 24px;width: 24px;
          vertical-align: text-top"
                  />
                </a-tooltip>
              </a-form-item>

              <a-form-item
                v-if="!this.currentRecord.supportsJoin"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                label="FCntDn："
                :required="true"
                class="iot_view_node_add_formitem"
              >
                <a-input
                  v-decorator="['FCntDn']"
                  size="small"
                  style="width: 90%;float: left;text-align: left"
                >
                </a-input>
                <a-tooltip placement="rightTop">
                  <template slot="title">
                    temp
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
                  v-decorator="['maxDutyCycle']"
                  size="small"
                  style="width: 90%;float: left;text-align: left"
                >
                </a-input>
              </a-form-item>
            </a-form>
            <a-col :span="16" :offset="8">
              <div style="display: flex">
                <a-button type="primary" @click="handleSubmit">保存</a-button>
                <a-button style="margin: 0 16px" @click="handleCancel"
                  >取消</a-button
                >
              </div>
            </a-col>
          </a-row>
        </a-row>
      </a-col>
      <a-col :span="14">
        <div></div>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
import {
  getNetworkServerOptions,
  getNetworkServerIdByServer,
  initDevProfileServices
} from "@/utils/util.js";
export default {
  components: { ACol, ARow },
  data() {
    return {
      //options
      networkServer_options: [],

      currentRecord: {
        supportsJoin: true,
        supportsJoinType: "OTAA"
      }
    };
  },

  computed: {},

  beforeCreate() {
    this.nodeDeployForm = this.$form.createForm(this, {
      name: "nodeDeployForm"
    });
  },

  beforeMount() {
    this.networkServer_options = getNetworkServerOptions();
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.nodeDeployForm.validateFields((err, values) => {
        if (!err) {
          let deviceProfile = values;
          deviceProfile.supportsJoin = this.currentRecord.supportsJoin;
          deviceProfile.organizationID = this.common.getCurrentOrganizationID();
          deviceProfile.networkServerID = values.networkServer[0];

          //deviceProfile.networkServerID = getNetworkServerIdByServer(
          //  values.networkServer[0]
          //);
          console.log(deviceProfile);
          this.$api.node
            .createNode({
              deviceProfile: deviceProfile
            })
            .then(res => {
              if (res.status === 200) {
                this.$message.success("创建节点成功");
                this.$router.push({
                  name: "nodeManageInit"
                });
              } else {
                this.$message.error(res.data.error);
              }
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => {
              initDevProfileServices();
            });
        } else {
          console.log(err);
        }
      });
    },
    radioOnChange(e) {
      debugger;
      if (e.target.value === "OTTA") {
        this.currentRecord.supportsJoin = true;
        this.currentRecord.supportsJoinType = "1";
      } else if (e.target.value === "ABP") {
        this.currentRecord.supportsJoin = false;
        this.currentRecord.supportsJoinType = "2";
      }
    },
    handleCancel() {
      this.$router.push({
        name: "nodeManageInit"
      });
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
  height: 380px;
  width: 100%;
  margin-bottom: 10px;
}
.iot_amap_noteAdd_demo {
}
</style>
