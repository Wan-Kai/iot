<template>
  <a-layout style="background: #fff;padding: 0 14px 0">
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
        :wrapper-col="{ span: 12 }"
        class="iot_view_internetServer_add_formItem"
      >
        <a-input
          v-decorator="['name']"
          style="width: 60%;float: left;height: 28px"
        />
      </a-form-item>
      <a-form-item
        label="主机名："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 12 }"
        class="iot_view_internetServer_add_formItem"
      >
        <a-input
          v-decorator="['pc_name']"
          style="width: 60%;float: left;height: 28px"
        />
      </a-form-item>
      <a-form-item
        label="是否启用网关发现："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 12 }"
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
          style="width: 60%;float: left;height: 28px"
        />
      </a-form-item>
      <a-row>
        <a-col :span="3"> </a-col>
        <a-col :span="12">
          <div class="iot_view_internetServer_add_form_left">
            <a-button type="primary" @click="handleSubmit">确定</a-button>
            <a-button style="margin-left: 30px">取消</a-button>
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
    return {};
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
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`
      });
    },
    remove(k) {
      const { form } = this;
      // can use data-binding to get
      const keys = form.getFieldValue("keys");

      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter(key => key.toString() !== k.toString())
      });
      console.log(k);
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
      console.log(keys);
      const ks = form.getFieldValue("keys");
      console.log(ks);
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
      if (state) {
        id = 0;
        this.add();
        this.add();
        this.add();
      } else {
        let item;
        for (item in this.form.getFieldValue("keys")) {
          this.remove(item);
          console.log(item);
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
  margin-bottom: 14px;
}
.iot_view_internetServer_add_form_left {
  float: left;
}
</style>
