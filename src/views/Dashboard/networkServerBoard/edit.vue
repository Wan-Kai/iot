<template>
  <a-layout style="background: #fff;padding: 0 14px 0">
    <a-form :form="edit_form" layout="vertical" class="iot_view_edit_form">
      <a-form-item
        label="名称："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_edit_formItem"
      >
        <a-input
          v-decorator="[
            'name',
            {
              initialValue: returnedData.name,
              rules: [{ required: true, message: '请输入名称' }]
            }
          ]"
          size="small"
          style="width: 80%;float: left;text-align: left"
        />
      </a-form-item>

      <a-form-item
        label="主机地址："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_edit_formItem"
      >
        <a-input
          v-decorator="[
            'ip',
            {
              initialValue: this.getIp,
              rules: [{ required: true, message: '请输入ip' }]
            }
          ]"
          size="small"
          style="width: 80%;float: left;text-align: left"
        />
      </a-form-item>
      <a-form-item
        label="端口："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_edit_formItem"
      >
        <a-input
          v-decorator="[
            'port',
            {
              initialValue: this.getPort,
              rules: [{ required: true, message: '请输入端口' }]
            }
          ]"
          size="small"
          style="width: 80%;float: left;text-align: left"
        />
      </a-form-item>

      <a-form-item
        label="是否启用网关发现："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
      >
        <a-switch
          :checked="returnedData.gatewayDiscoveryEnabled"
          :defaultChecked="returnedData.gatewayDiscoveryEnabled"
          checkedChildren="开"
          unCheckedChildren="关"
          @change="stateChange"
          style="float: left"
          v-decorator="[
            'gatewayDiscoveryEnabled',
            {
              initialValue: returnedData.gatewayDiscoveryEnabled,
              rules: [{ required: true, message: '是否启用网关发现' }]
            }
          ]"
        />
      </a-form-item>

      <a-form-item
        v-if="returnedData.gatewayDiscoveryEnabled"
        label="间隔（每天）："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_edit_formItem"
      >
        <a-input
          size="small"
          v-decorator="[
            'gatewayDiscoveryInterval',
            {
              initialValue: returnedData.gatewayDiscoveryInterval,
              rules: [{ required: true, message: '请输入间隔（每天）!' }]
            }
          ]"
          style="float: left;text-align: left;width: 80%"
        />
      </a-form-item>

      <a-form-item
        v-if="returnedData.gatewayDiscoveryEnabled"
        label="发射频率（Hz）："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_edit_formItem"
      >
        <a-input
          size="small"
          v-decorator="[
            'gatewayDiscoveryTXFrequency',
            {
              initialValue: returnedData.gatewayDiscoveryTXFrequency,
              rules: [{ required: true, message: '请输入发射频率（Hz）!' }]
            }
          ]"
          style="float: left;text-align: left;width: 80%"
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
        v-if="returnedData.gatewayDiscoveryEnabled"
        label="发送数据率："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_edit_formItem"
      >
        <a-input
          size="small"
          v-decorator="[
            'gatewayDiscoveryDR',
            {
              initialValue: returnedData.gatewayDiscoveryDR,
              rules: [{ required: true, message: '请输入发送数据率!' }]
            }
          ]"
          style="float: left;text-align: left;width: 80%"
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
          <div class="iot_view_edit_form_left">
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
              @click="handleDelete"
              >删除</a-button
            >
            <a-button
              icon="delete"
              style="margin-left: 16px"
              @click="handleBack"
              >返回</a-button
            >
            <a-modal title="删除提示" :visible="isShowModal">
              <template slot="footer">
                <a-button key="back" @click="handleDeleteCancel">取消</a-button>
                <a-button
                  type="danger"
                  icon="delete"
                  style="margin-left: 16px"
                  @click="handleDeleteOk"
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
import { initNetworkServers } from "@/utils/util";
import { setNetServer } from "@/utils/util";

export default {
  data() {
    return {
      returnedData: {
        id: "",
        name: "",
        server: "",
        gatewayDiscoveryEnabled: false,
        gatewayDiscoveryInterval: "",
        gatewayDiscoveryTXFrequency: "",
        gatewayDiscoveryDR: ""
      },

      ModalText: "确认删除",
      isShowModal: false,
      submitLoading: false,
      confirmLoading: false
    };
  },

  computed: {
    getIp() {
      if (this.common.isEmpty(this.returnedData.server)) return "";
      if (this.returnedData.server.split(":")) {
        let server = this.returnedData.server.split(":");
        return server[0];
      } else {
        return this.returnedData.server;
      }
    },
    getPort() {
      if (this.common.isEmpty(this.returnedData.server)) return "";
      if (this.returnedData.server.split(":")) {
        let server = this.returnedData.server.split(":");
        return server[1];
      } else {
        return "";
      }
    }
  },

  beforeCreate() {
    this.edit_form = this.$form.createForm(this, {
      name: "edit_form"
    });
    this.edit_form.getFieldDecorator("keys", {
      initialValue: [],
      preserve: true
    });
  },
  beforeMount() {
    this.returnedData.id = this.$route.query.id;
  },

  mounted() {
    this.getDetail();
  },

  methods: {
    getDetail() {
      this.$api.networkServer
        .getServerDetail({
          limit: 1,
          extra: this.returnedData.id
        })
        .then(res => {
          //console.log(res);
          if (res.status === 200) {
            this.returnedData.name = res.data.networkServer.name;
            this.returnedData.server = res.data.networkServer.server;
            this.returnedData.gatewayDiscoveryEnabled =
              res.data.networkServer.gatewayDiscoveryEnabled;
            this.returnedData.gatewayDiscoveryInterval =
              res.data.networkServer.gatewayDiscoveryInterval;
            this.returnedData.gatewayDiscoveryTXFrequency =
              res.data.networkServer.gatewayDiscoveryTXFrequency;
            this.returnedData.gatewayDiscoveryDR =
              res.data.networkServer.gatewayDiscoveryDR;
          } else {
            console.log("获取网络服务器初始信息失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleSubmit(e) {
      e.preventDefault();
      this.edit_form.validateFields((err, values) => {
        if (!err) {
          this.submitLoading = true;

          var data = {
            name: values.name,
            server: values.ip + ":" + values.port,
            gatewayDiscoveryEnabled: values.gatewayDiscoveryEnabled,
            gatewayDiscoveryInterval: values.gatewayDiscoveryInterval,
            gatewayDiscoveryTXFrequency: values.gatewayDiscoveryTXFrequency,
            gatewayDiscoveryDR: values.gatewayDiscoveryDR
          };

          this.$api.networkServer
            .updateServer({
              extra: this.returnedData.id,
              networkServer: data
            })
            .then(res => {
              if (res.status === 200) {
                this.$message.success("成功修改网络服务器信息");

                initNetworkServers();
                var _this = this;
                setTimeout(() => {
                  _this.handleBack();
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
    handleDelete() {
      this.visible = true;
      this.ModalText = "确认删除" + ":" + "@" + this.returnedData.server;
    },
    handleDeleteOk(e) {
      this.confirmLoading = true;

      this.$api.networkServer
        .deleteServer({
          extra: this.id
        })
        .then(res => {
          if (res.status === 200) {
            this.confirmLoading = false;
            this.isShowModal = false;
            this.$message.success("成功删除网络服务器");

            initNetworkServers();
            var _this = this;
            setTimeout(() => {
              _this.handleBack();
            }, 100);
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
    handleDeleteCancel(e) {
      this.visible = false;
    },

    handleBack() {
      this.$router.push({
        name: "networkServerInit"
      });
    },

    stateChange(state) {
      this.returnedData.gatewayDiscoveryEnabled = !this.returnedData
        .gatewayDiscoveryEnabled;
    }
  }
};
</script>

<style>
.iot_view_edit_form {
  padding: 20px 5px;
}
.iot_view_edit_formItem {
  margin-bottom: 8px;
}
.iot_view_edit_form_left {
  float: left;
}
.ant-form-item {
  margin-bottom: 10px;
}
</style>
