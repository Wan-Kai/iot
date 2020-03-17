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
          v-decorator="['name']"
          style="float: left;text-align: left"
        />
      </a-form-item>
      <a-form-item
        label="主机名："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_internetServer_add_formItem"
      >
        <a-input
          size="small"
          v-decorator="['pc_name']"
          style="float: left;text-align: left"
        />
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
            `names[${k}]`,
            {
              validateTrigger: ['change', 'blur']
            }
          ]"
          style="float: left;text-align: left"
        />
      </a-form-item>
      <a-row>
        <a-col :span="7" :offset="3">
          <div class="iot_view_internetServer_add_form_left">
            <a-button type="primary" html-type="submit">确定</a-button>
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
      gatewayOn: false
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
          console.log("Received values of form: ", values);
          if (this.gatewayOn) {
            console.log(this.gatewayOn);
          } else {
            console.log(this.gatewayOn);
          }
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
