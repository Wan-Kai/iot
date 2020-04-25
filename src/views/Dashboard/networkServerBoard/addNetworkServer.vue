<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <a-form
      :form="form"
      @submit="handleSubmit"
      layout="vertical"
      class="iot_view_add_form"
    >
      <a-form-item
        label="名称："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_add_formItem"
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
        label="服务器地址："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_add_formItem"
      >
        <a-input
          size="small"
          v-decorator="[
            'server',
            {
              rules: [{ required: true, message: '请输入服务器域名/ip和端口!' }]
            }
          ]"
          style="float: left;text-align: left;width: 90%"
        />
        <a-tooltip placement="rightTop">
          <template slot="title">
            格式如127.0.0.1:8000
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
        class="iot_view_add_formItem"
      >
        <a-switch
          :checked="currentRecord.gatewayDiscoveryEnabled"
          checkedChildren="开"
          unCheckedChildren="关"
          @change="stateChange"
          style="margin-left: 10px;float: left"
          v-decorator="[
            'gatewayDiscoveryEnabled',
            { rules: [{ required: true, message: '是否启用网关发现' }] }
          ]"
        />
      </a-form-item>

      <a-form-item
        v-if="currentRecord.gatewayDiscoveryEnabled"
        label="间隔（每天）："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_add_formItem"
      >
        <a-input
          size="small"
          v-decorator="[
            'gatewayDiscoveryInterval',
            { rules: [{ required: true, message: '请输入间隔（每天）!' }] }
          ]"
          style="float: left;text-align: left;width: 90%"
        />
      </a-form-item>

      <a-form-item
        v-if="currentRecord.gatewayDiscoveryEnabled"
        label="发射频率（Hz）："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_add_formItem"
      >
        <a-input
          size="small"
          v-decorator="[
            'gatewayDiscoveryTXFrequency',
            { rules: [{ required: true, message: '请输入发射频率（Hz）!' }] }
          ]"
          style="float: left;text-align: left;width: 90%"
        />
      </a-form-item>

      <a-form-item
        v-if="currentRecord.gatewayDiscoveryEnabled"
        label="发送数据率："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_add_formItem"
      >
        <a-input
          size="small"
          v-decorator="[
            'gatewayDiscoveryDR',
            { rules: [{ required: true, message: '请输入发送数据率!' }] }
          ]"
          style="float: left;text-align: left;width: 90%"
        />
      </a-form-item>

      <a-row>
        <a-col :span="7" :offset="3">
          <div class="iot_view_add_form_left">
            <a-button type="primary" html-type="submit" :loading="commitLoading"
              >确定</a-button
            >
            <a-button style="margin-left: 30px" @click="handleBack"
              >取消</a-button
            >
          </div>
        </a-col>
      </a-row>
    </a-form>
  </a-layout>
</template>

<script>
import { initNetworkServers } from "@/utils/util";

export default {
  data() {
    return {
      currentRecord: {
        gatewayDiscoveryEnabled: false
      },
      commitLoading: false
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "add_form" });
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

          var data = {
            name: values.name,
            server: values.server,
            gatewayDiscoveryEnabled: values.gatewayDiscoveryEnabled,
            gatewayDiscoveryInterval: values.gatewayDiscoveryInterval,
            gatewayDiscoveryTXFrequency: values.gatewayDiscoveryTXFrequency,
            gatewayDiscoveryDR: values.gatewayDiscoveryDR
          };

          this.$api.networkServer
            .createServer({
              networkServer: data
            })
            .then(res => {
              if (res.status === 200) {
                this.commitLoading = false;
                this.$message.success("成功创建新服务器");

                initNetworkServers();

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

    handleBack() {
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
      this.currentRecord.gatewayDiscoveryEnabled = !this.currentRecord
        .gatewayDiscoveryEnabled;
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
.iot_view_add_form {
  padding: 20px 5px;
}
.iot_view_add_formItem {
  margin-bottom: 8px;
}
.iot_view_add_form_left {
  float: left;
}
.ant-form-item {
  margin-bottom: 10px;
}
</style>
