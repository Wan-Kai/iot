<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div class="iot_view_serverManage_add_form_content">
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
            class="iot_view_serverManage_add_form"
          >
            <a-form-item
              class="iot_view_serverManage_add_formItem"
              label="选择企业："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-cascader
                v-decorator="[
                  'company',
                  {
                    rules: [{ required: true, message: '请选择服务名' }]
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
              class="iot_view_serverManage_add_formItem"
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
              class="iot_view_serverManage_add_formItem"
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
              class="iot_view_serverManage_add_formItem"
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
              class="iot_view_serverManage_add_formItem"
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
              class="iot_view_serverManage_add_formItem"
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
              class="iot_view_serverManage_add_formItem"
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
              class="iot_view_serverManage_add_formItem"
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
                <div class="iot_view_serverManage_add_form_left">
                  <a-button
                    type="primary"
                    html-type="submit"
                    :loading="commitLoading"
                    >确定</a-button
                  >
                  <a-button style="margin-left: 30px" @click="back"
                    >取消</a-button
                  >
                </div>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-col :span="14" v-if="areaShow">
          <a-form
            :form="SecondForm"
            layout="vertical"
            class="iot_view_serverManage_add_form"
          >
            <a-form-item
              class="iot_view_serverManage_add_formItem"
              label="位置信息："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <p style="text-align: left;margin-bottom: 2px;">所在区域</p>
              <a-cascader
                v-decorator="['area', { initialValue: this.defaultDataArea }]"
                style="width: 90%;float: left"
                size="small"
                :options="area_options"
                placeholder=""
              />
            </a-form-item>
            <a-form-item
              class="iot_view_serverManage_add_formItem"
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
          <div class="iot_amap_serverManage_container">
            <el-amap vid="gateway_edit_map"> </el-amap>
          </div>
        </a-col>
      </a-row>
    </div>
  </a-layout>
</template>

<script>
export default {
  name: "add",
  data() {
    return {
      commitLoading: false,
      areaShow: false,
      company_options: [],
      netserver_options: [],
      defaultDataArea: []
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "dynamic_form_item" });
    this.SecondForm = this.$form.createForm(this, {
      name: "dynamic_form_item"
    });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
        }
      });
    },
    stateChange() {},
    areaChange() {
      this.areaShow = !this.areaShow;
    },
    back() {
      this.$router.push({
        name: "serverManageInit"
      });
    }
  }
};
</script>

<style>
.iot_view_serverManage_add_form_content {
  margin-top: 20px;
}
.iot_view_serverManage_add_form {
}
.iot_view_serverManage_add_formItem {
  margin-bottom: 8px;
}
.iot_view_serverManage_add_form_left {
  float: left;
}
.iot_amap_serverManage_container {
  height: 400px;
  width: 100%;
}
</style>
