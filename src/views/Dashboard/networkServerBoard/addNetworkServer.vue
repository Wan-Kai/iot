<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <a-form
      :form="form"
      @submit="handleSubmit"
      layout="vertical"
      class="iot_view_internetServer_add_form"
    >
      <a-form-item
        label="名称："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_internetServer_add_formItem"
      >
        <a-input
          size="small"
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '请输入名称!' }] }
          ]"
          style="float: left;text-align: left;width: 90%"
        />
      </a-form-item>
      <a-form-item
        label="服务器："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_internetServer_add_formItem"
      >
        <a-input
          size="small"
          v-decorator="[
            'server',
            { rules: [{ required: true, message: '请输入服务器域名和端口!' }] }
          ]"
          style="float: left;text-align: left;width: 90%"
        />
        <a-tooltip placement="rightTop">
          <template slot="title">
            127.0.0.1:8000
          </template>
          <a-icon
            type="exclamation-circle"
            style="height: 24px;line-height: 24px;width: 24px;
          text-align: left;vertical-align: text-top"
          />
        </a-tooltip>
      </a-form-item>
      <a-form-item
        label="是否启用网关发现："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_internetServer_add_formItem"
      >
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="stateChange"
          style="margin-left: 10px;float: left"
        />
        <a-tooltip placement="rightTop" style="float: left;margin-left: 10px">
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
        v-if="this.gatewayOn"
        label="间隔（每天）："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_internetServer_add_formItem"
      >
        <a-input
          size="small"
          v-decorator="[
            'interval',
            { rules: [{ required: true, message: '请输入间隔（每天）!' }] }
          ]"
          style="float: left;text-align: left;width: 90%"
        />
        <a-tooltip placement="rightTop" style="float: left;margin-left: 10px">
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
        v-if="this.gatewayOn"
        label="发射频率（Hz）："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_internetServer_add_formItem"
      >
        <a-input
          size="small"
          v-decorator="[
            'frequency',
            { rules: [{ required: true, message: '请输入发射频率（Hz）!' }] }
          ]"
          style="float: left;text-align: left;width: 90%"
        />
        <a-tooltip placement="rightTop" style="float: left;margin-left: 10px">
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
        v-if="this.gatewayOn"
        label="发送数据率："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_internetServer_add_formItem"
      >
        <a-input
          size="small"
          v-decorator="[
            'rate',
            { rules: [{ required: true, message: '请输入发送数据率!' }] }
          ]"
          style="float: left;text-align: left;width: 90%"
        />
        <a-tooltip placement="rightTop" style="float: left;margin-left: 10px">
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

      <a-row>
        <a-col :span="7" :offset="3">
          <div class="iot_view_internetServer_add_form_left">
            <a-button type="primary" html-type="submit" :loading="commitLoading"
              >确定</a-button
            >
            <a-button style="margin-left: 30px" @click="back">取消</a-button>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </a-layout>
</template>

<script>
import { initNetworkServer } from "@/utils/util";

export default {
  data() {
    return {
      gatewayOn: false,
      commitLoading: false
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "dynamic_form_item" });
    this.form.getFieldDecorator("keys", { initialValue: [], preserve: true });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.commitLoading = true;
          console.log("Received values of form: ", values);
          // if (this.gatewayOn) {
          //   console.log(values);
          // } else {
          //   console.log(values);
          // }
          values.gatewayDiscoveryDR = 1;
          values.gatewayDiscoveryEnabled = true;
          values.gatewayDiscoveryInterval = 1;
          values.gatewayDiscoveryTXFrequency = 1;

          this.$api.networkServer
            .createServer({
              networkServer: values
            })
            .then(res => {
              if (res.status === 200) {
                this.commitLoading = false;
                this.$message.success("成功创建新服务器");

                initNetworkServer();

                setTimeout(() => {
                  this.$router.push("/admin/dashboard/networkServer");
                }, 100);
              } else {
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

    back() {
      this.$router.push("/admin/dashboard/networkServer");
    },

    // getLabel(index) {
    //   if (index == 0) {
    //     return "间隔（每天）：";
    //   } else if (index == 1) {
    //     return "发射频率（Hz）：";
    //   } else {
    //     return "发送数据率：";
    //   }
    // },
    stateChange(state) {
      this.gatewayOn = !this.gatewayOn;
      if (state) {
        // this.add();
        console.log(state);
      } else {
        console.log(state);
      }
    }
  }
};
</script>

<style scoped>
.iot_view_internetServer_add_form {
  padding: 20px 5px;
}
.iot_view_internetServer_add_formItem {
  margin-bottom: 8px;
}
.iot_view_internetServer_add_form_left {
  float: left;
}
.ant-form-item {
  margin-bottom: 10px;
}
</style>
