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
          :label="joinNotificationURLLabel"
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
          :label="statusNotificationURL"
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
          :label="locationNotificationURL"
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
          :label="ackNotificationURL"
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
          :label="errorNotificationURL"
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
      //label need align
      joinNotificationURLLabel: "\xa0\xa0\xa0" + "加入通知URL：",
      statusNotificationURL: "\xa0\xa0\xa0" + "设备状态通知URL：",
      locationNotificationURL: "\xa0\xa0\xa0" + "位置通知URL：",
      ackNotificationURL: "\xa0\xa0\xa0" + "ACK通知URL：",
      errorNotificationURL: "\xa0\xa0\xa0" + "错误通知URL：",

      //params
      query: {
        appID: ""
      },

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
    this.query.appID = sessionStorage.getItem("appID");
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
          extra: this.query.appID
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

          var sentData = {};
          sentData = values;

          if (this.ifCreated) {
            this.$api.appManage
              .updateAppDataTranspond({
                extra: this.query.appID,
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
                extra: this.query.appID,
                integration: sentData
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
