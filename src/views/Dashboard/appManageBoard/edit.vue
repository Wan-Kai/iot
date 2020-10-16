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
          :form="AppEditform"
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
              :disabled="true"
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
          <!--
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
          -->
          <a-form-item
            class="iot_view_app_edit_formItem"
            :label="appDescription"
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
                  @click="handleSubmit"
                  :loading="submitLoading"
                  >确定</a-button
                >
                <a-button style="margin-left: 20px" @click="backToAppList"
                  >取消</a-button
                >
                <a-button
                  style="margin-left: 20px"
                  icon="delete"
                  type="danger"
                  @click="showDeleteAppModal"
                  >删除</a-button
                >
                <a-modal title="删除提示" :visible="deleteModalVisible">
                  <template slot="footer">
                    <a-button key="back" @click="handleDeleteModalCancel"
                      >取消</a-button
                    >
                    <a-button
                      type="danger"
                      icon="delete"
                      style="margin-left: 16px"
                      @click="handleDeleteModal"
                      :loading="deleteLoading"
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
      //label need align
      appDescription: "\xa0\xa0\xa0" + "应用描述：",

      //params
      query: {
        appID: ""
      },

      //options
      serviceProfile_options: [],
      //default Value
      defaultServiceProfile: [],

      //data
      id: "",
      name: "",
      capacity: "",
      description: "",

      //modal
      ModalText: "确认删除：",
      deleteModalVisible: false,

      //loading
      deleteLoading: false,
      submitLoading: false
    };
  },
  beforeCreate() {
    this.AppEditform = this.$form.createForm(this, { name: "AppEdit_form" });
  },
  beforeMount() {
    this.query.appID = sessionStorage.getItem("appID");
    this.serviceProfile_options = getServiceOptions();
    this.$api.appManage
      .getAppDetail({
        extra: this.query.appID
      })
      .then(res => {
        if (res.status === 200) {
          let infoDataTemp = res.data.application;
          this.id = infoDataTemp.id;
          this.name = infoDataTemp.name;
          this.description = infoDataTemp.description;
          this.defaultServiceProfile.push(infoDataTemp.serviceProfileID);
        } else {
          console.log("获取初始信息失败");
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.AppEditform.validateFields((err, values) => {
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
              extra: this.query.appID,
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
    backToAppList() {
      sessionStorage.setItem("tab", "1");
      this.$router.push({
        name: "appManageInit"
      });
    },
    showDeleteAppModal() {
      this.deleteModalVisible = true;
      this.ModalText = "确认删除：" + this.id;
    },
    handleDeleteModal(e) {
      this.deleteLoading = true;
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
          } else {
            this.$message.error(res.data.error);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.deleteLoading = false;
        });
    },
    handleDeleteModalCancel(e) {
      console.log("Clicked cancel button");
      this.deleteModalVisible = false;
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
