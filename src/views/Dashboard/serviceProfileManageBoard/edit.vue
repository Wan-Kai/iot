<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div class="iot_view_edit_form_content">
      <a-form
        :form="form"
        @submit="handleSubmit"
        layout="vertical"
        class="iot_view_edit_form"
      >
        <a-form-item
          class="iot_view_edit_formItem"
          label="选择企业："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
        >
          <a-cascader
            v-decorator="[
              'company',
              {
                initialValue: [this.returnedData.organizationID],
                rules: [{ required: true, message: '请选择企业' }]
              }
            ]"
            style="width: 90%;float: left;text-align: left"
            size="small"
            :options="company_options"
            :fieldNames="{
              label: 'organizationName',
              value: 'organizationID',
              children: []
            }"
            placeholder=""
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
          label="服务名称："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
          class="iot_view_edit_formItem"
        >
          <a-input
            size="small"
            v-decorator="[
              'name',
              {
                initialValue: this.returnedData.name,
                rules: [{ required: true, message: '请输入服务名称!' }]
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
          class="iot_view_edit_formItem"
          label="选择网络服务器："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
        >
          <a-cascader
            v-decorator="[
              'server',
              {
                initialValue: [this.returnedData.networkServerID],
                rules: [{ required: true, message: '请选择网络服务器' }]
              }
            ]"
            style="width: 90%;float: left;text-align: left"
            size="small"
            :options="networkServer_options"
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
          label="添加网关元数据："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
          class="iot_view_edit_formItem"
        >
          <a-switch
            checkedChildren="开"
            unCheckedChildren="关"
            :checked="returnedData.addGWMetaData"
            @change="stateChange"
            style="margin-left: 10px;float: left"
            v-decorator="[
              'addGWMetaData',
              {
                initialValue: returnedData.addGWMetaData,
                rules: [{ required: true, message: '是否添加网关元数据' }]
              }
            ]"
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
          label="启用地理位置："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
          class="iot_view_edit_formItem"
        >
          <a-switch
            checkedChildren="开"
            unCheckedChildren="关"
            :checked="returnedData.hrAllowed"
            @change="areaChange"
            style="margin-left: 10px;float: left"
            v-decorator="[
              'hrAllowed',
              {
                initialValue: returnedData.hrAllowed,
                rules: [{ required: true, message: '是否启用地理位置' }]
              }
            ]"
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
          label="设备状态请求频率："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
          class="iot_view_edit_formItem"
        >
          <a-input
            size="small"
            v-decorator="[
              'frequency',
              {
                initialValue: this.returnedData.devStatusReqFreq,
                rules: [{ required: true, message: '请输入设备状态请求频率!' }]
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
          label="最低允许数据速率："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
          class="iot_view_edit_formItem"
        >
          <a-input
            size="small"
            v-decorator="[
              'minDataRate',
              {
                initialValue: this.returnedData.drMin,
                rules: [{ required: true, message: '请输入最低允许数据速率!' }]
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
          label="最高允许数据速率："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
          class="iot_view_edit_formItem"
        >
          <a-input
            size="small"
            v-decorator="[
              'maxDataRate',
              {
                initialValue: this.returnedData.drMax,
                rules: [{ required: true, message: '请输入最高允许数据速率!' }]
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

        <a-row>
          <a-col :span="7" :offset="3">
            <div class="iot_view_edit_form_left">
              <a-button
                type="primary"
                html-type="submit"
                :loading="confirmLoading"
                >确定</a-button
              >
              <a-button style="margin: 0 30px" @click="handleBack"
                >取消</a-button
              >
              <a-button type="danger" icon="delete" @click="handleDelete"
                >删除</a-button
              >
            </div>
          </a-col>
          <a-modal
            title="删除提示"
            :visible="isShowModal"
            @cancel="handleDeleteCancel"
          >
            <template slot="footer">
              <a-button key="back" @click="handleDeleteCancel">取消</a-button>
              <a-button
                type="danger"
                icon="delete"
                style="margin-left: 16px"
                @click="handleDeleteOk"
                :loading="confirmLoading"
                >确认删除</a-button
              >
            </template>
            <p>{{ ModalText }}</p>
          </a-modal>
        </a-row>
      </a-form>
    </div>
  </a-layout>
</template>

<script>
import {
  getOrganizationOptions,
  getNetworkServerOptions,
  getNetworkServerById,
  getNetworkServerIdByServer,
  initServiceOptions
} from "@/utils/util";
export default {
  name: "edit",
  data() {
    return {
      company_options: [],
      networkServer_options: [],

      defaultCompany: [],
      defaultNetworkServer: [],

      returnedData: {
        id: "",
        name: "",
        networkServerID: "",
        organizationID: "",
        addGWMetaData: false,
        hrAllowed: false,
        devStatusReqFreq: 0,
        drMax: 0,
        drMin: 0
      },

      isShowModal: false,
      ModalText: "确认删除",
      submitLoading: false,
      confirmLoading: false
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "dynamic_form_item" });
    this.form.getFieldDecorator("keys", { initialValue: [], preserve: true });
  },
  beforeMount() {
    this.returnedData.id = this.$route.query.id;
    //this.company_options = getOrganizationOptions();
    this.company_options = this.common.getCurrentOrganizationList();
    this.networkServer_options = getNetworkServerOptions();
  },

  mounted() {
    this.getDetail();
  },

  methods: {
    getDetail() {
      this.$api.serviceProfile
        .getService({
          extra: this.returnedData.id
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.returnedData = res.data.serviceProfile;
            /*
            this.defaultNetworkServer.push(
              getNetworkServerById(this.returnedData.networkServerID)
            );
            this.defaultCompany.push(this.returnedData.organizationID);
            */
          } else {
            console.log("获取服务配置详细信息失败");
          }
        });
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading = true;
          console.log(values);
          let sentData = {};
          sentData.name = values.name;

          /*
          sentData.networkServerID = getNetworkServerIdByServer(
            values.server[0]
          );
          */
          sentData.networkServerID = values.server[0];
          sentData.organizationID = values.company[0];
          sentData.addGWMetaData = values.addGWMetaData;
          sentData.hrAllowed = values.hrAllowed;
          sentData.devStatusReqFreq = values.frequency;
          sentData.drMax = values.maxDataRate;
          sentData.drMin = values.minDataRate;
          //console.log(sentData);
          debugger;
          this.$api.serviceProfile
            .updateService({
              extra: this.returnedData.id,
              serviceProfile: sentData
            })
            .then(res => {
              if (res.status === 200) {
                this.$message.success("修改服务信息成功");
                initServiceOptions();
                var _this = this;
                setTimeout(() => {
                  _this.handleBack();
                }, 100);
              } else {
                this.$message.error("修改服务信息失败");
                this.$message.error(res.data.error);
              }
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => {
              this.confirmLoading = false;
            });
        }
      });
    },
    stateChange() {
      this.returnedData.addGWMetaData = !this.returnedData.addGWMetaData;
    },
    areaChange() {
      this.returnedData.hrAllowed = !this.returnedData.hrAllowed;
    },

    handleBack() {
      this.$router.push({
        name: "serviceProfileManageInit"
      });
    },
    handleDelete() {
      this.isShowModal = true;
      this.ModalText = "确认删除" + ":" + this.returnedData.name;
    },
    handleDeleteCancel() {
      this.isShowModal = false;
    },
    handleDeleteOk() {
      this.confirmLoading = true;
      this.$api.serviceProfile
        .deleteService({
          extra: this.returnedData.id
        })
        .then(res => {
          if (res.status === 200) {
            this.$message.success("删除服务信息成功");
            initServiceOptions();
            var _this = this;
            setTimeout(() => {
              _this.handleBack();
            }, 100);
          } else {
            this.$message.error("删除服务管理信息失败");
            this.$message.error(res.data.error);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.confirmLoading = false;
        });
    }
  }
};
</script>

<style>
.iot_view_serverManage_edit_form_content {
  margin-top: 20px;
}
.iot_view_serverManage_edit_form {
}
.iot_view_serverManage_edit_formItem {
  margin-bottom: 8px;
}
.iot_view_serverManage_edit_form_left {
  float: left;
}
</style>
