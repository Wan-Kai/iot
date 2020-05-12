<template>
  <a-layout style="background: #fff">
    <div class="iot_view_app_transpondData_form_content">
      <a-form
        :form="transpondDataForm"
        layout="vertical"
        class="iot_view_app_transpondData_form"
      >
        <a-form-item
          label="上行数据URL："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
          class="iot_view_app_transpondData_formItem"
        >
          <a-input
            size="small"
            v-decorator="[
              'uplinkDataURL',
              {
                rules: [{ required: true, message: '请输入上行数据URL!' }],
                initialValue: this.returnedData.uplinkDataURL
              }
            ]"
            style="float: left;text-align: left;width: 90%"
          />
        </a-form-item>
        <a-form-item
          label="加入通知URL："
          :required="false"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
          class="iot_view_app_transpondData_formItem"
        >
          <a-input
            size="small"
            v-decorator="[
              'joinNotificationURL',
              {
                initialValue: this.returnedData.joinNotificationURL
              }
            ]"
            style="float: left;text-align: left;width: 90%"
          />
        </a-form-item>
        <a-form-item
          label="设备状态通知URL："
          :required="false"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
          class="iot_view_app_transpondData_formItem"
        >
          <a-input
            size="small"
            v-decorator="[
              'statusNotificationURL',
              {
                initialValue: this.returnedData.statusNotificationURL
              }
            ]"
            style="float: left;text-align: left;width: 90%"
          />
        </a-form-item>
        <a-form-item
          label="位置通知URL："
          :required="false"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
          class="iot_view_app_transpondData_formItem"
        >
          <a-input
            size="small"
            v-decorator="[
              'locationNotificationURL',
              {
                initialValue: this.returnedData.locationNotificationURL
              }
            ]"
            style="float: left;text-align: left;width: 90%"
          />
        </a-form-item>
        <a-form-item
          label="ACK通知URL："
          :required="false"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
          class="iot_view_app_transpondData_formItem"
        >
          <a-input
            size="small"
            v-decorator="[
              'ackNotificationURL',
              {
                initialValue: this.returnedData.ackNotificationURL
              }
            ]"
            style="float: left;text-align: left;width: 90%"
          />
        </a-form-item>
        <a-form-item
          label="错误通知URL："
          :required="false"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
          class="iot_view_app_transpondData_formItem"
        >
          <a-input
            size="small"
            v-decorator="[
              'errorNotificationURL',
              {
                initialValue: this.returnedData.errorNotificationURL
              }
            ]"
            style="float: left;text-align: left;width: 90%"
          />
        </a-form-item>
        <a-row>
          <a-col :span="7" :offset="3">
            <div class="iot_view_app_transpondData_form_left">
              <a-button
                type="primary"
                @click="handleSubmit"
                :loading="commitLoading"
                >确定</a-button
              >
              <a-button style="margin-left: 30px" @click="backToAppList"
                >取消</a-button
              >
            </div>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </a-layout>
</template>

<script>
export default {
  name: "transpondData",
  data() {
    return {
      //params
      id: "",

      //data
      ifCreated: false,
      returnedData: {
        ackNotificationURL: "",
        errorNotificationURL: "",
        headers: [],
        joinNotificationURL: "",
        locationNotificationURL: "",
        statusNotificationURL: "",
        uplinkDataURL: ""
      },

      //loading
      commitLoading: false
    };
  },
  beforeCreate() {
    this.transpondDataForm = this.$form.createForm(this, {
      name: "transpondData_form"
    });
  },
  beforeMount() {
    this.id = sessionStorage.getItem("appId");
    this.getDataTranspond();
  },
  methods: {
    backToAppList() {
      this.$router.push({
        name: "appManageInit"
      });
    },
    getDataTranspond() {
      this.$api.appManage
        .getAppDataTranspond({
          extra: this.id
        })
        .then(res => {
          if (res.status === 200) {
            this.ifCreated = true;
            var infoDataTemp = res.data;

            this.returnedData = infoDataTemp.integration;
          } else {
            this.ifCreated = false;
          }
        });
    },
    handleSubmit(e) {
      let self = this;
      e.preventDefault();
      this.transpondDataForm.validateFields((err, values) => {
        console.log(values);
        if (!err) {
          self.commitLoading = true;

          if (this.ifCreated) {
            var sentData = {};

            sentData = values;

            this.$api.appManage
              .updateAppDataTranspond({
                extra: this.id,
                integration: sentData
              })
              .then(res => {
                if (res.status === 200) {
                  this.$message.success("修改成功！");
                } else {
                  this.$message.error(res.data.error);
                }
              })
              .finally(() => {
                self.commitLoading = false;
              });
          } else {
            this.$api.appManage
              .creatAppDataTranspond({
                extra: this.id
              })
              .then(res => {
                if (res.status === 200) {
                  this.$message.success("创建成功！");
                } else {
                  this.$message.error(res.data.error);
                }
              })
              .catch(err => {
                console.log(err);
              })
              .finally(() => {
                self.commitLoading = false;
              });
          }
        }
      });
    }
  }
};
</script>

<style>
.iot_view_app_transpondData_form_content {
  margin-top: 10px;
  margin-left: 10px;
}
.iot_view_app_transpondData_form {
}
.iot_view_app_transpondData_formItem {
  margin-bottom: 8px;
}
.iot_view_app_transpondData_form_left {
  float: left;
}
</style>
