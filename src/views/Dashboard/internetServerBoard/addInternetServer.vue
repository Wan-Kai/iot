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
        v-for="(k, index) in form.getFieldValue('keys')"
        :key="k"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        :label="getLabel(index)"
        :required="true"
        class="iot_view_internetServer_add_formItem"
      >
        <a-input
          size="small"
          v-decorator="[
            getName(index),
            {
              rules: [
                { required: true, message: '请输入' + getHint(index) + '!' }
              ],
              validateTrigger: ['change', 'blur']
            }
          ]"
          style="float: left;text-align: left;width: 90%"
        />
        <a-tooltip placement="rightTop">
          <template slot="title">
            {{ getHint(index) }}
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
let id = 0;
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
      this.commitLoading = true;
      this.form.validateFields((err, values) => {
        if (!err) {
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

          this.$api.interServer
            .creatServer({
              networkServer: values
            })
            .then(res => {
              if (res) {
                this.commitLoading = false;
                this.$message.success("成功创建新服务器");

                // setTimeout(() => {
                //   this.$router.push("/admin/dashboard/internetServer");
                // }, 100);

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
                this.commitLoading = false;
                this.$message.error("创建服务器失败");
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },

    back() {
      this.$router.push("/admin/dashboard/internetServer");
    },
    remove(k) {
      const { form } = this;
      // can use data-binding to get
      const keys = form.getFieldValue("keys");

      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter(key => key.toString() !== k.toString())
      });
    },
    add() {
      const { form } = this;
      // can use data-binding to get
      const keys = form.getFieldValue("keys");
      const nextKeys = keys.concat(id++);
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
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
    getHint(index) {
      if (index == 0) {
        return "间隔";
      } else if (index == 1) {
        return "发射频率";
      } else {
        return "发送数据率";
      }
    },
    getName(index) {
      if (index == 0) {
        return "interval";
      } else if (index == 1) {
        return "frequency";
      } else {
        return "probability";
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
        for (item in this.form.getFieldValue("keys")) {
          this.remove(item);
        }
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
