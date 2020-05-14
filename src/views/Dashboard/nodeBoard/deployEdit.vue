<template>
  <a-layout>
    <a-row
      style="background: #fff"
      type="flex"
      justify="space-between"
      align="top"
      :gutter="20"
    >
      <a-col :span="12">
        <a-form
          :form="nodeDeployForm"
          layout="vertical"
          class="iot_view_node_deployEdit_form"
        >
          <a-form-item
            class="iot_view_node_deployEdit_formitem"
            label="入网方式："
            :required="true"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-radio-group
              @change="netInRadioOnChange"
              v-model="returnedData.netInValue"
              style="float: left"
            >
              <a-radio value="1">OTAA</a-radio>
              <a-radio value="2">ABP</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item
            class="iot_view_node_deployEdit_formitem"
            label="协议版本："
            :required="true"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-input
              v-decorator="[
                'macVersion',
                {
                  initialValue: this.returnedData.macVersion
                }
              ]"
              size="small"
              style="width: 90%;float: left;text-align: left"
            >
            </a-input>
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
            class="iot_view_node_deployEdit_formitem"
            label="节点规范名称："
            :required="true"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-input
              v-decorator="[
                'name',
                {
                  initialValue: this.returnedData.name
                }
              ]"
              size="small"
              style="width: 90%;float: left;text-align: left"
            >
            </a-input>
          </a-form-item>

          <a-form-item
            v-if="!this.returnedData.supportsJoin"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            label="NwksKey："
            :required="true"
            class="iot_view_node_deployEdit_formitem"
          >
            <a-input
              v-decorator="['NwksKey']"
              size="small"
              style="width: 90%;float: left;text-align: left"
            >
            </a-input>
            <a-tooltip placement="rightTop">
              <template slot="title">
                temp
              </template>
              <a-icon
                type="exclamation-circle"
                style="height: 24px;line-height: 24px;width: 24px;
          vertical-align: text-top"
              />
            </a-tooltip>
          </a-form-item>

          <a-form-item
            v-if="!this.returnedData.supportsJoin"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            label="FCntUp："
            :required="true"
            class="iot_view_node_deployEdit_formitem"
          >
            <a-input
              v-decorator="['FCntUp']"
              size="small"
              style="width: 90%;float: left;text-align: left"
            >
            </a-input>
            <a-tooltip placement="rightTop">
              <template slot="title">
                temp
              </template>
              <a-icon
                type="exclamation-circle"
                style="height: 24px;line-height: 24px;width: 24px;
          vertical-align: text-top"
              />
            </a-tooltip>
          </a-form-item>

          <a-form-item
            v-if="!this.returnedData.supportsJoin"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            label="FCntDn："
            :required="true"
            class="iot_view_node_deployEdit_formitem"
          >
            <a-input
              v-decorator="['FCntDn']"
              size="small"
              style="width: 90%;float: left;text-align: left"
            >
            </a-input>
            <a-tooltip placement="rightTop">
              <template slot="title">
                temp
              </template>
              <a-icon
                type="exclamation-circle"
                style="height: 24px;line-height: 24px;width: 24px;
          vertical-align: text-top"
              />
            </a-tooltip>
          </a-form-item>

          <a-form-item
            class="iot_view_node_deployEdit_formitem"
            label="最高EIRP："
            :required="true"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-input
              v-decorator="['maxEIRP']"
              size="small"
              style="width: 90%;float: left;text-align: left"
            >
            </a-input>
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
            class="iot_view_node_deployEdit_formitem"
            label="地理位置缓冲区ITL（秒）："
            :required="true"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-input
              v-decorator="['ITL']"
              size="small"
              style="width: 90%;float: left;text-align: left"
            >
            </a-input>
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
            class="iot_view_node_deployEdit_formitem"
            label="地理位置最小缓冲区大小："
            :required="true"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-input
              v-decorator="['minRelief']"
              size="small"
              style="width: 90%;float: left;text-align: left"
            >
            </a-input>
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
            class="iot_view_node_deployEdit_formitem"
            label="超时周期(分钟)："
            :required="true"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-input
              v-decorator="['AppKey']"
              size="small"
              style="width: 90%;float: left;text-align: left"
            >
            </a-input>
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
        </a-form>
        <a-row>
          <a-col :span="16" :offset="8">
            <div style="display: flex;margin-bottom: 20px">
              <a-button type="primary" @click="handleSubmit">保存</a-button>
              <a-button style="margin: 0 16px" @click="backToNodeList"
                >取消</a-button
              >
              <a-button type="danger" icon="delete" @click="showDeleteModal"
                >删除</a-button
              >
            </div>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <div>
      <a-modal
        title="删除提示"
        :visible="DeleteNodeVisible"
        @cancel="handleCancel"
      >
        <template slot="footer">
          <a-button key="back" @click="handleCancel">取消</a-button>
          <a-button
            type="danger"
            icon="delete"
            style="margin-left: 16px"
            @click="handleDelete"
            :loading="confirmLoading"
            >确认删除</a-button
          >
        </template>
        <p>{{ ModalText }}</p>
      </a-modal>
    </div>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
import { initDevProfileServices } from "../../../utils/util.js";
export default {
  components: { ACol, ARow },
  data() {
    return {
      //params

      //data
      returnedData: {
        id: "",
        name: "",
        macVersion: "",
        supportsJoin: true,
        netInValue: "1"
      },

      //modal
      ModalText: "",
      DeleteNodeVisible: false,

      //loading
      submitLoading: false,
      confirmLoading: false
    };
  },

  beforeCreate() {
    this.nodeDeployForm = this.$form.createForm(this, {
      name: "nodeDeployForm"
    });
  },

  beforeMount() {
    this.returnedData.id = this.$route.query.id;
    this.$api.node
      .getDeviceProfileById({
        extra: this.returnedData.id
      })
      .then(res => {
        let data = res.data;

        let infoDataTemp = data.deviceProfile;
        this.returnedData.macVersion = infoDataTemp.macVersion;
        this.returnedData.name = infoDataTemp.name;

        if (infoDataTemp.supportsJoin.toString() === "true") {
          this.returnedData.netInValue = "1";
        } else {
          this.returnedData.netInValue = "2";
          this.returnedData.supportsJoin = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.nodeDeployForm.validateFields((err, values) => {
        if (!err) {
          let deviceProfile = {};
          deviceProfile = values;
          if (this.returnedData.supportsJoin) {
            deviceProfile.supportsJoin = true;
          } else {
            deviceProfile.supportsJoin = false;
          }
          deviceProfile.organizationID = this.common.getCurrentOrganizationID();
          this.$api.node
            .updateNode({
              extra: this.returnedData.id,
              deviceProfile: deviceProfile
            })
            .then(res => {
              if (res.status === 200) {
                this.$message.success("修改节点信息成功");
                this.$router.push({
                  name: "nodeManageInit"
                });
              } else {
                this.$message.error(res.data.error);
              }
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => {
              initDevProfileServices();
            });
        }
      });
    },
    showDeleteModal() {
      this.DeleteNodeVisible = true;
      this.ModalText = "确认删除" + ":" + this.id;
    },
    netInRadioOnChange(e) {
      if (e.target.value === "1") {
        this.returnedData.supportsJoin = true;
      } else if (e.target.value === "2") {
        this.returnedData.supportsJoin = false;
      }
    },
    handleDelete(e) {
      this.confirmLoading = true;
      this.$api.node
        .deleteNode({
          extra: this.returnedData.id
        })
        .then(res => {
          if (res.status === 200) {
            this.$message.success("删除节点信息成功");
            this.$router.push({
              name: "nodeManageInit"
            });
          } else {
            this.$message.error(res.data.error);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.confirmLoading = false;
          this.DeleteNodeVisible = false;
          initDevProfileServices();
        });
    },
    handleCancel(e) {
      this.DeleteNodeVisible = false;
    },
    backToNodeList() {
      this.$router.push({
        name: "nodeManageInit"
      });
    }
  }
};
</script>

<style>
.iot_view_node_deployEdit_form {
  margin-bottom: 12px;
}
.iot_view_node_deployEdit_formitem {
  margin-bottom: 8px;
  padding-bottom: 0px;
}
</style>
