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
        <span style="float: left">{{ $route.params.id }}</span>
      </a-form-item>
      <a-form-item
        label="端口："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          v-decorator="['port']"
          size="small"
          style="width: 60%;float: left;text-align: left"
        />
      </a-form-item>
      <a-form-item
        label="网关："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          v-decorator="['gateway']"
          size="small"
          style="width: 60%;float: left;text-align: left"
        />
      </a-form-item>
      <a-form-item
        label="消息："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          v-decorator="['message']"
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
            <a-button type="primary" @click="handleSubmit">确定</a-button>
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
      gatewayOn: false
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
  methods: {
    handleSubmit() {},
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
