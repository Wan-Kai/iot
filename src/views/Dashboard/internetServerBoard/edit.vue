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
        :wrapper-col="{ span: 12 }"
      >
        <span style="float: left">{{ this.server }}</span>
      </a-form-item>
      <a-form-item
        label="端口："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          v-decorator="[
            'port',
            {
              initialValue: this.getData.port
            }
          ]"
          size="small"
          style="width: 60%;float: left;text-align: left"
        />
      </a-form-item>
      <a-form-item
        label="名称："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          v-decorator="[
            'name',
            {
              initialValue: this.getData.name
            }
          ]"
          size="small"
          style="width: 60%;float: left;text-align: left"
        />
      </a-form-item>

      <a-form-item
        label="是否启用网关发现："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="stateChange"
          style="margin-left: 10px;float: left"
        />
      </a-form-item>

      <a-form-item
        v-for="(k, index) in internetServer_edit_form.getFieldValue('keys')"
        :key="k"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 12 }"
        :label="getLabel(index)"
        :required="true"
        class="iot_view_internetServer_add_formItem"
      >
        <a-input
          v-decorator="[
            `names[${k}]`,
            {
              validateTrigger: ['change', 'blur']
            }
          ]"
          size="small"
          style="width: 60%;float: left;text-align: left"
        />
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
let id = 0;
export default {
  data() {
    return {
      gatewayOn: false,
      getData: {},
      id: "",
      server: "",
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
    this.$api.interServer
      .getServerDetail({
        limit: 1,
        id: this.id
      })
      .then(res => {
        this.getData = res.data.result[0];

        this.getData.port = this.getData.server.split(":")[1];
        console.log(this.getData);
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

          this.$api.interServer
            .updateServer({
              extra: this.id,
              networkServer: values
            })
            .then(res => {
              if (res.status === 200) {
                this.$message.success("成功修改网络服务器信息");

                this.$api.interServer
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
                    this.$store.commit("util/setNetServer", netServerData);
                  })
                  .catch(err => {
                    console.log(err);
                  });
                setTimeout(() => {
                  this.$router.push("/admin/dashboard/internetServer");
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

      this.$api.interServer
        .deleteServer({
          extra: this.id
        })
        .then(res => {
          if (res.status === 200) {
            this.confirmLoading = false;
            this.visible = false;
            this.$message.success("成功删除网络服务器");

            this.$api.interServer
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
                this.$store.commit("util/setNetServer", netServerData);
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
    remove(k) {
      const { internetServer_edit_form } = this;
      // can use data-binding to get
      const keys = internetServer_edit_form.getFieldValue("keys");

      // can use data-binding to set
      internetServer_edit_form.setFieldsValue({
        keys: keys.filter(key => key.toString() !== k.toString())
      });
    },
    add() {
      const { internetServer_edit_form } = this;
      // can use data-binding to get
      const keys = internetServer_edit_form.getFieldValue("keys");
      const nextKeys = keys.concat(id++);
      // can use data-binding to set
      // important! notify form to detect changes
      internetServer_edit_form.setFieldsValue({
        keys: nextKeys
      });
    },
    getLabel(index) {
      if (index == 0) {
        return "间隔（每天）：";
      } else if (index == 1) {
        return "发射频率（Hz）：";
      } else {
        return "发送数据率：";
      }
    },
    stateChange(state) {
      this.gatewayOn = !this.gatewayOn;
      console.log(this.gatewayOn);
      if (state) {
        id = 0;
        this.add();
        this.add();
        this.add();
      } else {
        let item;
        for (item in this.internetServer_edit_form.getFieldValue("keys")) {
          this.remove(item);
        }
      }
    }
  }
};
</script>

<style>
.iot_view_internetServer_edit_form {
  padding: 20px 5px;
}
.iot_view_internetServer_edit_form_left {
  float: left;
}
.ant-form-item {
  margin-bottom: 10px;
}
</style>
