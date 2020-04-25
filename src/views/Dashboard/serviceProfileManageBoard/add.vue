<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div class="iot_view_add_form_content">
      <a-row
        style="background: #fff"
        type="flex"
        justify="space-between"
        align="top"
        :gutter="16"
      >
        <a-col :span="10">
          <a-form
            :form="form"
            @submit="handleSubmit"
            layout="vertical"
            class="iot_view_add_form"
          >
            <a-form-item
              class="iot_view_add_formItem"
              label="选择企业："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-cascader
                v-decorator="[
                  'company',
                  {
                    rules: [{ required: true, message: '请选择企业' }]
                  }
                ]"
                style="width: 90%;float: left;text-align: left"
                size="small"
                :options="company_options"
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
              label="服务名称："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
              class="iot_view_add_formItem"
            >
              <a-input
                size="small"
                v-decorator="[
                  'name',
                  { rules: [{ required: true, message: '请输入服务名称!' }] }
                ]"
                style="float: left;text-align: left;width: 90%"
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
              class="iot_view_add_formItem"
              label="选择网络服务器："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-cascader
                v-decorator="[
                  'server',
                  {
                    rules: [{ required: true, message: '请选择网络服务器' }]
                  }
                ]"
                style="width: 90%;float: left;text-align: left"
                size="small"
                :options="netserver_options"
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
              label="添加网关元数据："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
              class="iot_view_add_formItem"
            >
              <a-switch
                checkedChildren="开"
                unCheckedChildren="关"
                @change="stateChange"
                style="margin-left: 10px;float: left"
              />
              <a-tooltip
                placement="rightTop"
                style="float: left;margin-left: 10px"
              >
                <template slot="title">
                  prompt text
                </template>
                <a-icon
                  type="exclamation-circle"
                  style="height: 24px;line-height: 24px;width: 24px;
          text-align: left;vertical-align: text-top"
                />
              </a-tooltip>
            </a-form-item>

            <a-form-item
              label="启用地理位置："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
              class="iot_view_add_formItem"
            >
              <a-switch
                checkedChildren="开"
                unCheckedChildren="关"
                @change="areaChange"
                style="margin-left: 10px;float: left"
              />
              <a-tooltip
                placement="rightTop"
                style="float: left;margin-left: 10px"
              >
                <template slot="title">
                  prompt text
                </template>
                <a-icon
                  type="exclamation-circle"
                  style="height: 24px;line-height: 24px;width: 24px;
          text-align: left;vertical-align: text-top"
                />
              </a-tooltip>
            </a-form-item>

            <a-form-item
              label="设备状态请求频率："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
              class="iot_view_add_formItem"
            >
              <a-input
                size="small"
                v-decorator="[
                  'frequency',
                  {
                    rules: [
                      { required: true, message: '请输入设备状态请求频率!' }
                    ]
                  }
                ]"
                style="float: left;text-align: left;width: 90%"
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
              label="最低允许数据速率："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
              class="iot_view_add_formItem"
            >
              <a-input
                size="small"
                v-decorator="[
                  'minDataRate',
                  {
                    rules: [
                      { required: true, message: '请输入最低允许数据速率!' }
                    ]
                  }
                ]"
                style="float: left;text-align: left;width: 90%"
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
              label="最高允许数据速率："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
              class="iot_view_add_formItem"
            >
              <a-input
                size="small"
                v-decorator="[
                  'maxDataRate',
                  {
                    rules: [
                      { required: true, message: '请输入最高允许数据速率!' }
                    ]
                  }
                ]"
                style="float: left;text-align: left;width: 90%"
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

            <a-row>
              <a-col :span="16" :offset="8">
                <div class="iot_view_add_form_left">
                  <a-button
                    type="primary"
                    html-type="submit"
                    :loading="commitLoading"
                    >确定</a-button
                  >
                  <a-button style="margin-left: 30px" @click="handleBack"
                    >取消</a-button
                  >
                </div>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-col :span="14"> </a-col>
      </a-row>
    </div>
  </a-layout>
</template>

<script>
import {
  getOrganizationOptions,
  getNetworkServerOptions,
  getNetworkServerIdByServer,
  initServiceOptions
} from "@/utils/util";
export default {
  name: "add",
  data() {
    return {
      id: "",
      addGWMetaData: false,
      commitLoading: false,
      hrAllowed: false,
      company_options: [],
      netserver_options: []
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "dynamic_form_item" });
  },
  beforeMount() {
    this.company_options = getOrganizationOptions();
    this.netserver_options = getNetworkServerOptions();
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.commitLoading = true;
          console.log(values);

          let sentData = {};
          sentData.name = values.name;
          sentData.networkServerID = getNetworkServerIdByServer(
            values.server[0]
          );
          sentData.organizationID = values.company[0];
          sentData.addGWMetaData = this.addGWMetaData;
          sentData.hrAllowed = this.hrAllowed;
          sentData.devStatusReqFreq = values.frequency;
          sentData.drMax = values.maxDataRate;
          sentData.drMin = values.minDataRate;
          console.log(sentData);
          this.$api.serviceProfile
            .createService({
              serviceProfile: sentData
            })
            .then(res => {
              if (res.status === 200) {
                this.$message.success("成功创建服务:" + values.name);

                initServiceOptions();
                var _this = this;
                setTimeout(() => {
                  _this.handleBack();
                }, 100);
              } else {
                console.log("res失败");
                this.$message.error(res.data.code);
                this.$message.error(res.data.error);
              }
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => {
              this.commitLoading = false;
            });
        }
      });
    },
    stateChange() {
      this.addGWMetaData = !this.addGWMetaData;
    },
    areaChange() {
      this.hrAllowed = !this.hrAllowed;
    },

    handleBack() {
      this.$router.push({
        name: "serviceProfileManageInit"
      });
    }
  }
};
</script>

<style>
.iot_view_add_form_content {
  margin-top: 20px;
}
.iot_view_add_form {
}
.iot_view_add_formItem {
  margin-bottom: 8px;
}
.iot_view_add_form_left {
  float: left;
}
.iot_amap_serverManage_container {
  height: 400px;
  width: 100%;
}
</style>
