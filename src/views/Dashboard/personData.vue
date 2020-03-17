<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div style="padding: 20px 12px">
      <a-row>
        <a-col :span="10">
          <span style="font-weight: bold;font-size: 12px;float: left"
            >基本信息</span
          >
        </a-col>
      </a-row>
      <a-row style="margin-top: 14px">
        <a-col :span="10">
          <a-form
            :form="personalForm"
            @submit="handleSubmit"
            layout="vertical"
            class="iot_view_person_add_form"
          >
            <a-form-item
              class="iot_view_person_add_formitem"
              label="手机："
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 14 }"
            >
              <p style="text-align: left;margin-bottom: 0">{{ phoneNumber }}</p>
            </a-form-item>
            <a-form-item
              class="iot_view_person_add_formitem"
              label="姓名："
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 14 }"
            >
              <a-input
                v-decorator="['name']"
                size="small"
                style="width: 100%;float: left;text-align: left"
              />
            </a-form-item>
            <a-form-item
              class="iot_view_person_add_formitem"
              label="邮箱："
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 14 }"
            >
              <a-input
                v-decorator="['email']"
                size="small"
                style="width: 100%;float: left;text-align: left"
              />
            </a-form-item>
            <a-form-item
              class="iot_view_person_add_formitem"
              label="单位："
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 14 }"
            >
              <a-input
                v-decorator="['unit']"
                size="small"
                style="width: 100%;float: left;text-align: left"
              />
            </a-form-item>
            <a-form-item
              class="iot_view_person_add_formitem"
              label="备注："
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 14 }"
            >
              <a-textarea
                placeholder="请填写备注内容"
                v-decorator="['description']"
                :rows="4"
                style="width: 100%;float: left;text-align: left"
              />
            </a-form-item>
            <a-form-item
              class="iot_view_person_add_formitem"
              label="角色："
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 14 }"
            >
              <p style="text-align: left">{{ role }}</p>
            </a-form-item>
            <a-row>
              <a-col :span="14" :offset="3">
                <div class="iot_view_person_add_button_content">
                  <a-button>保存</a-button>
                  <a-button style="margin: 0 20px" @click="changePassword"
                    >修改密码</a-button
                  >
                </div>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
      </a-row>
      <a-modal v-model="visible" title="密码修改" onOk="handleOk">
        <template slot="footer">
          <a-button key="confirm" style="margin-right: 20px">确认</a-button>
          <a-button key="back" @click="handleCancel">关闭</a-button>
        </template>
        <a-form
          :form="personalForm"
          @submit="handleSubmitPsw"
          layout="vertical"
          class="iot_view_person_add_form_pop"
        >
          <a-form-item class="iot_view_person_add_formitem_pop">
            <a-input
              v-decorator="['oldPsw']"
              style="width: 100%;text-align: left"
              placeholder="请输入原密码"
            >
              <a-icon slot="prefix" type="key" />
            </a-input>
          </a-form-item>
          <a-form-item class="iot_view_person_add_formitem_pop">
            <a-input
              v-decorator="['newPsw']"
              style="width: 100%;text-align: left"
              placeholder="请输入新密码"
            >
              <a-icon slot="prefix" type="key" />
            </a-input>
          </a-form-item>
          <a-form-item class="iot_view_person_add_formitem_pop">
            <a-input
              icon="password"
              v-decorator="['confirmPsw']"
              style="width: 100%;text-align: left"
              placeholder="请确认新密码"
            >
              <a-icon slot="prefix" type="key" />
            </a-input>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
export default {
  components: { ACol, ARow },
  data() {
    return {
      phoneNumber: 110,
      role: "管理员",
      visible: false,

      name: "",
      email: "",
      unit: "",
      description: ""
    };
  },
  beforeCreate() {
    this.personalForm = this.$form.createForm(this, {
      name: "personalForm"
    });
    this.personalForm.getFieldDecorator("keys", {
      initialValue: [],
      preserve: true
    });
  },
  methods: {
    handleSubmit() {},
    handleCancel() {
      this.visible = !this.visible;
    },
    changePassword() {
      this.visible = !this.visible;
    },
    handleSubmitPsw() {}
  }
};
</script>

<style>
.iot_view_person_add_form {
  margin-bottom: 12px;
}
.iot_view_person_add_formitem {
  margin-bottom: 8px;
  padding-bottom: 0px;
}
.iot_view_person_add_button_content {
  float: left;
}
.iot_view_person_add_form_pop {
  padding: 10px 20%;
}
.iot_view_person_add_formitem_pop {
  margin-bottom: 10px;
}
</style>
