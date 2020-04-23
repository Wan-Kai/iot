<template>
  <div class="iot_view_app_edit_form_content">
    <a-row
      style="background: #fff"
      type="flex"
      justify="space-between"
      align="top"
      :gutter="16"
    >
      <a-col :span="10">
        <a-form
          :form="form"
          @submit="handleSubmit"
          layout="vertical"
          class="iot_view_app_edit_form"
        >
          <a-form-item
            label="应用编号："
            :required="true"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            class="iot_view_app_edit_formItem"
          >
            <a-input
              size="small"
              v-decorator="[
                'id',
                {
                  rules: [{ required: true, message: '请输入应用编号!' }],
                  initialValue: this.id
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
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            class="iot_view_app_edit_formItem"
          >
            <a-input
              size="small"
              v-decorator="[
                'name',
                {
                  rules: [{ required: true, message: '请输入应用名称!' }],
                  initialValue: this.name
                }
              ]"
              style="float: left;text-align: left;width: 90%"
            />
          </a-form-item>

          <a-form-item
            class="iot_view_app_edit_formItem"
            label="服务名称："
            :required="true"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-cascader
              v-decorator="[
                'serviceProfile',
                {
                  initialValue: this.defaultServiceProfile,
                  rules: [{ required: true, message: '请选择服务名' }]
                }
              ]"
              style="width: 90%;float: left;text-align: left"
              size="small"
              :options="serviceProfile_options"
              placeholder=""
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
            label="设备分配容量："
            :required="true"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            class="iot_view_app_edit_formItem"
          >
            <a-input
              size="small"
              v-decorator="[
                'capacity',
                {
                  rules: [{ required: false, message: '请输入设备分配容量!' }],
                  initialValue: this.capacity
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
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-textarea
              v-decorator="[
                'description',
                {
                  initialValue: this.description
                }
              ]"
              :rows="4"
              style="float: left;text-align: left;width: 90%"
            />
          </a-form-item>
          <a-row>
            <a-col :span="16" :offset="8">
              <div class="iot_view_edit_add_form_left">
                <a-button
                  type="primary"
                  html-type="submit"
                  :loading="submitLoading"
                  >确定</a-button
                >
                <a-button style="margin-left: 20px" @click="back"
                  >取消</a-button
                >
                <a-button
                  style="margin-left: 20px"
                  icon="delete"
                  type="danger"
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
      </a-col>
      <a-col :span="14"> </a-col>
    </a-row>
  </div>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import { getServiceOptions } from "@/utils/util";
export default {
  components: { ARow },
  data() {
    return {
      serviceProfile_options: [],
      defaultServiceProfile: [],
      id: "",
      name: "",
      capacity: "",
      description: "",
      ModalText: "确认删除：",
      visible: false,
      confirmLoading: false,
      submitLoading: false
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "dynamic_form_item" });
    this.form.getFieldDecorator("keys", { initialValue: [], preserve: true });
  },
  beforeMount() {
    this.serviceProfile_options = getServiceOptions();
    this.$api.appManage
      .getAppDetail({
        extra: this.$route.query.number
      })
      .then(res => {
        let infoDataTemp = res.data.application;
        this.id = infoDataTemp.id;
        this.name = infoDataTemp.name;
        this.description = infoDataTemp.description;
        this.defaultServiceProfile.push(infoDataTemp.serviceProfileID);
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
          this.submitLoading = true;
          console.log(values);
          let sentData = {};
          sentData.id = values.id;
          sentData.name = values.name;
          sentData.description = values.description;
          sentData.serviceProfileID = values.serviceProfile[0];

          this.$api.appManage
            .updateApp({
              extra: values.id,
              application: sentData
            })
            .then(res => {
              console.log(res);
              if (res.status === 200) {
                this.$message.success("成功修改应用:" + values.id);
                setTimeout(() => {
                  this.$router.push({
                    name: "appManageInit"
                  });
                }, 100);
              } else {
                this.$message.error(res.data.error);
              }
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => {
              this.submitLoading = false;
            });
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
      this.ModalText = "确认删除：" + this.id;
    },
    handleOk(e) {
      this.confirmLoading = true;
      this.$api.appManage
        .deleteApp({
          extra: this.id
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.$message.success("成功删除：" + this.id);
            setTimeout(() => {
              this.$router.push({
                name: "appManageInit"
              });
            }, 200);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.confirmLoading = false;
        });
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    stateChange() {
      this.areaShow = !this.areaShow;
      if (!this.areaShow) {
        this.mapObj.clearMap();
      }
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
.iot_amap-nodeEdit-container {
  height: 380px;
  width: 100%;
  margin-bottom: 10px;
}
</style>
