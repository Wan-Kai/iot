<template>
  <div class="iot_view_app_edit_form_content">
    <a-form
      :form="form"
      @submit="handleSubmit"
      layout="vertical"
      class="iot_view_app_edit_form"
    >
      <a-form-item
        label="应用编号："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_app_edit_formItem"
      >
        <a-input
          size="small"
          v-decorator="[
            'id',
            {
              rules: [{ required: true, message: '请输入应用编号!' }],
              initialValue: this.infoData.id
            }
          ]"
          style="float: left;text-align: left;width: 90%"
        />
        <a-tooltip placement="rightTop">
          <template slot="title">
            prompt text
          </template>
          <a-icon
            type="exclamation-circle"
            style="height: 24px;line-height: 24px;width: 24px;
          vertical-align: text-top"
          />
        </a-tooltip>
      </a-form-item>
      <a-form-item
        label="应用名称："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_app_edit_formItem"
      >
        <a-input
          size="small"
          v-decorator="[
            'name',
            {
              rules: [{ required: true, message: '请输入应用名称!' }],
              initialValue: this.infoData.name
            }
          ]"
          style="float: left;text-align: left;width: 90%"
        />
      </a-form-item>
      <a-form-item
        label="设备分配容量："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_app_edit_formItem"
      >
        <a-input
          size="small"
          v-decorator="[
            'capacity',
            {
              rules: [{ required: true, message: '请输入设备分配容量!' }],
              initialValue: this.infoData.capacity
            }
          ]"
          style="float: left;text-align: left;width: 90%"
        />
        <a-tooltip placement="rightTop">
          <template slot="title">
            prompt text
          </template>
          <a-icon
            type="exclamation-circle"
            style="height: 24px;line-height: 24px;width: 24px;
          vertical-align: text-top"
          />
        </a-tooltip>
      </a-form-item>
      <a-form-item
        class="iot_view_app_edit_formItem"
        label="应用描述："
        :required="false"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
      >
        <a-textarea
          v-decorator="[
            'description',
            {
              initialValue: this.infoData.description
            }
          ]"
          :rows="4"
          style="float: left;text-align: left;width: 90%"
        />
      </a-form-item>
      <a-row>
        <a-col :span="7" :offset="3">
          <div class="iot_view_edit_add_form_left">
            <a-button type="primary" html-type="submit">确定</a-button>
            <a-button style="margin-left: 20px" @click="back">取消</a-button>
            <a-button
              style="margin-left: 20px"
              icon="delete"
              type="danger"
              @click="showModal"
              >删除设备</a-button
            >
            <a-modal
              title="Title"
              :visible="visible"
              @ok="handleOk"
              :confirmLoading="confirmLoading"
              @cancel="handleCancel"
            >
              <p>{{ ModalText }}</p>
            </a-modal>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoData: {
        id: "",
        name: "",
        capacity: "",
        description: ""
      },
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "dynamic_form_item" });
    this.form.getFieldDecorator("keys", { initialValue: [], preserve: true });

    this.$api.appManage
      .getAppDetail({
        id: this.$route.query.number
      })
      .then(res => {
        this.infoData = res.data.result;
        console.log(this.infoData);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$api.appManage
            .updateAppData({
              id: values.id
            })
            .catch(err => {
              console.log(err);
            });
          this.$message.success("成功修改应用:" + values.id);
          setTimeout(() => {
            this.$router.push({
              name: "appManageInit"
            });
          }, 500);
        }
      });
    },
    back() {
      this.$router.push({
        name: "appManageInit"
      });
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    }
  }
};
</script>

<style>
.iot_view_app_edit_form_content {
  margin-top: 20px;
}
.iot_view_app_edit_form {
}
.iot_view_app_edit_formItem {
  margin-bottom: 8px;
}
.iot_view_app_edit_form_left {
  float: left;
}
</style>
