<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div class="iot_view_serverManage_edit_form_content">
      <a-form
        :form="form"
        @submit="handleSubmit"
        layout="vertical"
        class="iot_view_serverManage_edit_form"
      >
        <a-form-item
          class="iot_view_serverManage_edit_formItem"
          label="选择企业："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
        >
          <a-cascader
            v-decorator="[
              'company',
              {
                initialValue: this.defaultCompany,
                rules: [{ required: true, message: '请选择服务名' }]
              }
            ]"
            style="width: 90%;float: left;text-align: left"
            size="small"
            :options="company_options"
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
          label="服务名称："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
          class="iot_view_serverManage_edit_formItem"
        >
          <a-input
            size="small"
            v-decorator="[
              'name',
              {
                initialValue: this.name,
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
          class="iot_view_serverManage_edit_formItem"
          label="选择网络服务器："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 7 }"
        >
          <a-cascader
            v-decorator="[
              'server',
              {
                initialValue: this.defaultNetserver,
                rules: [{ required: true, message: '请选择网络服务器' }]
              }
            ]"
            style="width: 90%;float: left;text-align: left"
            size="small"
            :options="netserver_options"
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
          class="iot_view_serverManage_edit_formItem"
        >
          <a-switch
            checkedChildren="开"
            unCheckedChildren="关"
            :checked="addGWMetaData"
            @change="stateChange"
            style="margin-left: 10px;float: left"
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
          class="iot_view_serverManage_edit_formItem"
        >
          <a-switch
            checkedChildren="开"
            unCheckedChildren="关"
            :checked="hrAllowed"
            @change="areaChange"
            style="margin-left: 10px;float: left"
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
          class="iot_view_serverManage_edit_formItem"
        >
          <a-input
            size="small"
            v-decorator="[
              'frequency',
              {
                initialValue: this.devStatusReqFreq,
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
          class="iot_view_serverManage_edit_formItem"
        >
          <a-input
            size="small"
            v-decorator="[
              'minDataRate',
              {
                initialValue: this.drMax,
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
          class="iot_view_serverManage_edit_formItem"
        >
          <a-input
            size="small"
            v-decorator="[
              'maxDataRate',
              {
                initialValue: this.drMin,
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
            <div class="iot_view_serverManage_edit_form_left">
              <a-button
                type="primary"
                html-type="submit"
                :loading="commitLoading"
                >确定</a-button
              >
              <a-button style="margin: 0 30px" @click="back">取消</a-button>
              <a-button type="danger" icon="delete" @click="showModal"
                >删除设备</a-button
              >
            </div>
          </a-col>
          <a-modal title="删除提示" :visible="visible" @cancel="handleCancel">
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
        </a-row>
      </a-form>
    </div>
  </a-layout>
</template>

<script>
import {
  getOrganization,
  getNetServerOption,
  getNetServerById,
  getNetServerIdByServer
} from "@/utils/util";
export default {
  name: "edit",
  data() {
    return {
      id: "",
      commitLoading: false,
      company_options: [],
      netserver_options: [],
      defaultCompany: [],
      defaultNetserver: [],

      addGWMetaData: false,
      hrAllowed: false,
      name: "",
      devStatusReqFreq: 0,
      drMax: 0,
      drMin: 0,

      visible: false,
      confirmLoading: false,
      ModalText: ""
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "dynamic_form_item" });
    this.form.getFieldDecorator("keys", { initialValue: [], preserve: true });
  },
  beforeMount() {
    this.id = this.$route.query.number;
    this.company_options = getOrganization();
    this.netserver_options = getNetServerOption();
    this.$api.serviceProfile
      .getService({
        extra: this.id
      })
      .then(res => {
        console.log(res);
        let infoDataTemp = res.data;
        // this.createdAt = infoDataTemp.createdAt;
        this.defaultNetserver.push(
          getNetServerById(infoDataTemp.serviceProfile.networkServerID)
        );
        this.defaultCompany.push(infoDataTemp.serviceProfile.organizationID);
        //
        this.addGWMetaData = infoDataTemp.serviceProfile.addGWMetaData;
        this.hrAllowed = infoDataTemp.serviceProfile.hrAllowed;
        this.name = infoDataTemp.serviceProfile.name;
        this.devStatusReqFreq = infoDataTemp.serviceProfile.devStatusReqFreq;
        this.drMax = infoDataTemp.serviceProfile.drMax;
        this.drMin = infoDataTemp.serviceProfile.drMin;
      });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.commitLoading = true;
          console.log(values);
          let sentData = {};
          sentData.name = values.name;
          sentData.networkServerID = getNetServerIdByServer(values.server[0]);
          sentData.organizationID = values.company[0];
          sentData.addGWMetaData = this.addGWMetaData;
          sentData.hrAllowed = this.hrAllowed;
          sentData.devStatusReqFreq = values.frequency;
          sentData.drMax = values.maxDataRate;
          sentData.drMin = values.minDataRate;
          console.log(sentData);

          this.$api.serviceProfile
            .updateServer({
              extra: this.id,
              serviceProfile: sentData
            })
            .then(res => {
              if (res.status === 200) {
                this.$message.success("成功修改服务管理信息");
                this.$router.push({
                  name: "serverManageInit"
                });
              } else {
                this.$message.error("修改服务管理信息失败");
                this.$message.error(res.data.error);
              }
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => {
              this.commitLoading = false;
            });
        }
      });
    },
    stateChange() {
      this.addGWMetaData = !this.addGWMetaData;
    },
    areaChange() {
      this.hrAllowed = !this.hrAllowed;
    },
    back() {
      this.$router.push({
        name: "serverManageInit"
      });
    },
    showModal() {
      this.visible = true;
      this.ModalText = "确认删除" + ":" + this.id;
    },
    handleCancel() {
      this.visible = false;
    },
    handleOk() {
      this.confirmLoading = true;
      this.$api.serviceProfile
        .deleteService({
          extra: this.id
        })
        .then(res => {
          if (res.status === 200) {
            this.$message.success("成功删除服务管理信息");
            this.$router.push({
              name: "serverManageInit"
            });
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
