<template>
  <a-layout style="background: #fff;padding: 0 14px 0">
    <a-form
      :form="internetServer_edit_form"
      layout="vertical"
      class="iot_view_internetServer_edit_form"
    >
      <a-form-item
        label="主机名："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_internetServer_edit_formItem"
      >
        <span style="float: left">{{ this.server }}</span>
      </a-form-item>
      <a-form-item
        label="端口："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_internetServer_edit_formItem"
      >
        <a-input
          v-decorator="[
            'port',
            {
              initialValue: this.port
            }
          ]"
          size="small"
          style="width: 90%;float: left;text-align: left"
        />
      </a-form-item>
      <a-form-item
        label="名称："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_internetServer_edit_formItem"
      >
        <a-input
          v-decorator="[
            'name',
            {
              initialValue: this.name
            }
          ]"
          size="small"
          style="width: 90%;float: left;text-align: left"
        />
      </a-form-item>

      <a-form-item
        label="是否启用网关发现："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
      >
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          v-model="this.gatewayOn"
          @change="stateChange"
          style="margin-left: 10px;float: left"
        />
      </a-form-item>

      <a-form-item
        v-if="this.gatewayOn"
        label="间隔（每天）："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_internetServer_edit_formItem"
      >
        <a-input
          size="small"
          v-decorator="[
            'gatewayDiscoveryInterval',
            {
              initialValue: this.gatewayDiscoveryInterval,
              rules: [{ required: true, message: '请输入间隔（每天）!' }]
            }
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
        class="iot_view_internetServer_edit_formItem"
      >
        <a-input
          size="small"
          v-decorator="[
            'gatewayDiscoveryTXFrequency',
            {
              initialValue: this.gatewayDiscoveryTXFrequency,
              rules: [{ required: true, message: '请输入发射频率（Hz）!' }]
            }
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
        class="iot_view_internetServer_edit_formItem"
      >
        <a-input
          size="small"
          v-decorator="[
            'gatewayDiscoveryDR',
            {
              initialValue: this.gatewayDiscoveryDR,
              rules: [{ required: true, message: '请输入发送数据率!' }]
            }
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
        <a-col :span="12" :offset="3">
          <div class="iot_view_internetServer_edit_form_left">
            <a-button
              type="primary"
              @click="handleSubmit"
              :loading="submitLoading"
              >确定</a-button
            >
            <a-button
              type="danger"
              icon="delete"
              style="margin-left: 16px"
              @click="showModal"
              >删除设备</a-button
            >
            <a-modal title="删除提示" :visible="visible">
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
    </a-form>
  </a-layout>
</template>

<script>
import { setNetServer } from "@/utils/util";
export default {
  data() {
    return {
      gatewayOn: false,
      returnedData: {},
      id: "",
      server: "",
      port: "",
      name: "",
      gatewayDiscoveryInterval: "",
      gatewayDiscoveryTXFrequency: "",
      gatewayDiscoveryDR: "",
      ModalText: "确认删除",
      visible: false,
      submitLoading: false,
      confirmLoading: false
    };
  },
  beforeCreate() {
    this.internetServer_edit_form = this.$form.createForm(this, {
      name: "internetServer_edit_form"
    });
    this.internetServer_edit_form.getFieldDecorator("keys", {
      initialValue: [],
      preserve: true
    });
  },
  beforeMount() {
    this.server = this.$route.query.server;
    this.id = this.$route.query.nid;
    this.port = this.$route.query.port;
    this.$api.networkServer
      .getServerDetail({
        limit: 1,
        extra: this.id
      })
      .then(res => {
        console.log(res);
        this.gatewayOn = res.data.networkServer.gatewayDiscoveryEnabled;
        this.name = res.data.networkServer.name;
        this.gatewayDiscoveryInterval =
          res.data.networkServer.gatewayDiscoveryInterval;
        this.gatewayDiscoveryTXFrequency =
          res.data.networkServer.gatewayDiscoveryTXFrequency;
        this.gatewayDiscoveryDR = res.data.networkServer.gatewayDiscoveryDR;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.internetServer_edit_form.validateFields((err, values) => {
        if (!err) {
          this.submitLoading = true;
          values.server = this.server + ":" + values.port;
          console.log("Received values of form: ", values);
          values.gatewayDiscoveryEnabled = this.gatewayOn;
          this.$api.networkServer
            .updateServer({
              extra: this.id,
              networkServer: values
            })
            .then(res => {
              if (res.status === 200) {
                this.$message.success("成功修改网络服务器信息");

                this.$api.networkServer
                  .getServerData({
                    limit: 100
                  })
                  .then(res => {
                    let getData = res.data.result;

                    let netServerData = [];
                    let temp = {
                      server: "",
                      id: "",
                      name: ""
                    };

                    for (let i = 0; i < getData.length; i++) {
                      temp.server = getData[i].server;
                      temp.id = getData[i].id;
                      temp.name = getData[i].name;
                      netServerData.push(temp);
                    }
                    setNetServer(netServerData);
                  })
                  .catch(err => {
                    console.log(err);
                  });
                setTimeout(() => {
                  this.$router.push({
                    name: "networkServerInit"
                  });
                }, 100);
              } else {
                this.$message.error(res.data.code);
                this.$message.error(res.data.error);
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error(err.data.error);
            })
            .finally(() => {
              this.submitLoading = false;
            });
        } else {
          this.$message.error("请保证表单完整");
        }
      });
    },
    showModal() {
      this.visible = true;
      this.ModalText = "确认删除" + ":" + "@" + this.server;
    },
    handleOk(e) {
      this.confirmLoading = true;

      this.$api.networkServer
        .deleteServer({
          extra: this.id
        })
        .then(res => {
          if (res.status === 200) {
            this.confirmLoading = false;
            this.visible = false;
            this.$message.success("成功删除网络服务器");

            this.$api.networkServer
              .getServerData({
                limit: 100
              })
              .then(res => {
                let getData = res.data.result;

                let netServerData = [];
                let temp = {
                  server: "",
                  id: "",
                  name: ""
                };

                for (let i = 0; i < getData.length; i++) {
                  temp.server = getData[i].server;
                  temp.id = getData[i].id;
                  temp.name = getData[i].name;
                  netServerData.push(temp);
                }
                setNetServer(netServerData);
              });
          } else {
            this.$message.error(res.data.code);
            this.$message.error(res.data.error);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("删除网络服务器失败");
        })
        .finally(() => {
          this.confirmLoading = false;
        });
    },
    handleCancel(e) {
      this.visible = false;
    },
    stateChange(state) {
      this.gatewayOn = !this.gatewayOn;
    }
  }
};
</script>

<style>
.iot_view_internetServer_edit_form {
  padding: 20px 5px;
}
.iot_view_internetServer_edit_formItem {
  margin-bottom: 8px;
}
.iot_view_internetServer_edit_form_left {
  float: left;
}
.ant-form-item {
  margin-bottom: 10px;
}
</style>
