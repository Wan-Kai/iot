<template>
  <a-layout style="background: #fff;padding: 0 14px 0">
    <a-form :form="edit_form" layout="vertical" class="iot_view_edit_form">
      <a-form-item
        label="ID"
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_edit_formItem"
      >
        <span style="float: left">{{ returnedData.id }}</span>
      </a-form-item>
      <a-form-item
        label="名称："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_edit_formItem"
      >
        <a-input
          v-decorator="[
            'name',
            {
              initialValue: returnedData.name
            }
          ]"
          size="small"
          style="width: 90%;float: left;text-align: left"
        />
      </a-form-item>
      <a-form-item
        label="是否拥有网关："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_edit_formItem"
      >
        <a-switch
          :checked="returnedData.canHaveGateways"
          :defaultChecked="returnedData.canHaveGateways"
          checkedChildren="能"
          unCheckedChildren="否"
          @change="stateChange"
          v-decorator="[
            'canHaveGateways',
            {
              initialValue: returnedData.canHaveGateways,
              rules: [{ required: true, message: '是否拥有网关' }]
            }
          ]"
          style="margin-left: 10px;float: left"
        >
        </a-switch>
      </a-form-item>

      <a-form-item
        class="iot_view_edit_formItem"
        label="选择行业："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
      >
        <a-cascader
          v-decorator="[
            'profession',
            {
              initialValue: [returnedData.profession],
              rules: [{ required: false, message: '请选择行业' }]
            }
          ]"
          style="float: left;text-align: left"
          size="small"
          :options="profession_options"
          placeholder=""
        />
      </a-form-item>

      <a-form-item
        class="iot_view_edit_formItem"
        label="所在区域："
        :required="false"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
      >
        <a-cascader
          v-decorator="[
            'area',
            {
              initialValue: [
                returnedData.province,
                returnedData.city,
                returnedData.district
              ],
              rules: [{ required: false, message: '请选择所在区域' }]
            }
          ]"
          style="margin-left:0px;float:left;text-align:left"
          size="small"
          :options="area_options"
          placeholder=""
        />
      </a-form-item>
      <a-form-item
        class="iot_view_edit_formItem"
        label="详细地址："
        :required="false"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
      >
        <a-input
          v-decorator="[
            'address',
            {
              initialValue: returnedData.address
            }
          ]"
          size="small"
          style="float: left;text-align: left;width: 100%"
        />
      </a-form-item>

      <a-row>
        <a-col :span="12" :offset="3">
          <div class="iot_view_edit_form_left">
            <a-button
              type="primary"
              @click="handleSubmit"
              :loading="submitLoading"
              >确定</a-button
            >
            <a-button
              type="danger"
              icon="delete"
              style="margin-left: 16px"
              @click="handleDelete"
              >删除</a-button
            >
            <a-button
              type="danger"
              icon="delete"
              style="margin-left: 16px"
              @click="handleBack"
              >返回</a-button
            >
            <a-modal title="删除提示" :visible="isShowModal">
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
          </div>
        </a-col>
      </a-row>
    </a-form>
  </a-layout>
</template>

<script>
import {
  initProfile,
  initOrganizations,
  getArea,
  getProfessionOptions
} from "@/utils/util";
import { setNetServer } from "@/utils/util";

export default {
  data() {
    return {
      area_options: [],
      profession_options: [],
      /*
      edit_form: this.$form.createForm(this, {
        name: "edit_form"
      }),
      **/
      returnedData: {
        id: "",
        name: "",
        displayName: "",
        profession: "",
        province: "",
        city: "",
        district: "",
        address: "",
        canHaveGateways: false,
        createdAt: "",
        updatedAt: ""
      },

      ModalText: "确认删除",
      isShowModal: false,
      submitLoading: false,
      confirmLoading: false
    };
  },
  beforeCreate() {
    this.edit_form = this.$form.createForm(this, {
      name: "edit_form"
    });

    this.edit_form.getFieldDecorator("keys", {
      initialValue: [],
      preserve: true
    });
  },
  beforeMount() {
    this.returnedData.id = this.$route.query.id;

    this.area_options = getArea();
    this.profession_options = getProfessionOptions();
  },

  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      //debugger;
      this.$api.organization
        .getOrganization({
          limit: 1,
          extra: this.returnedData.id
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.returnedData.name = res.data.organization.name;
            this.returnedData.displayName = res.data.organization.displayName;
            this.returnedData.canHaveGateways =
              res.data.organization.canHaveGateways;
            this.returnedData.profession = res.data.organization.profession;
            this.returnedData.province = res.data.organization.province;
            this.returnedData.city = res.data.organization.city;
            this.returnedData.district = res.data.organization.district;
            this.returnedData.address = res.data.organization.address;
            this.returnedData.createdAt = res.data.createdAt;
            this.returnedData.updatedAt = res.data.updatedAt;
          } else {
            console.log("获取组织初始信息失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleSubmit(e) {
      e.preventDefault();
      this.edit_form.validateFields((err, values) => {
        if (!err) {
          this.submitLoading = true;

          var profession = "";
          if (!this.common.isEmpty(values.profession[0])) {
            profession = values.profession[0];
          }
          var province = "";
          if (!this.common.isEmpty(values.area[0])) {
            province = values.area[0];
          }
          var city = "";
          if (!this.common.isEmpty(values.area[1])) {
            city = values.area[1];
          }
          var district = "";
          if (!this.common.isEmpty(values.area[2])) {
            district = values.area[2];
          }

          var address = "";
          if (!this.common.isEmpty(values.address)) {
            address = values.address;
          }
          var data = {
            id: this.returnedData.id,
            name: values.name,
            displayName: values.name,
            canHaveGateways: values.canHaveGateways,
            profession: profession,
            province: province,
            city: city,
            district: district,
            address: address
          };

          this.$api.organization
            .updateOrganization({
              extra: this.returnedData.id,
              organization: data
            })
            .then(res => {
              if (res.status === 200) {
                this.$message.success("成功修改组织机构信息");

                initProfile();
                var _this = this;
                setTimeout(() => {
                  _this.handleBack();
                }, 100);
              } else {
                this.$message.error(res.data.code);
                this.$message.error(res.data.error);
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error(err.data.error);
            })
            .finally(() => {
              this.submitLoading = false;
            });
        } else {
          this.$message.error("请保证表单完整");
        }
      });
    },

    handleBack() {
      this.$router.push({
        name: "organizationInit"
      });
    },

    handleDelete() {
      this.isShowModal = true;
      this.ModalText = "确认删除" + ":" + this.returnedData.name;
    },

    handleDeleteOk(e) {
      this.confirmLoading = true;

      this.$api.organization
        .deleteOrganization({
          extra: this.returnedData.id
        })
        .then(res => {
          if (res.status === 200) {
            this.confirmLoading = false;
            this.isShowModal = false;
            this.$message.success("成功删除组织机构");

            //删除成功之后，重新更新profile
            initProfile();
            var _this = this;
            setTimeout(() => {
              _this.handleBack();
            }, 100);
          } else {
            this.$message.error(res.data.code);
            this.$message.error(res.data.error);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("删除组织机构失败");
        })
        .finally(() => {
          this.confirmLoading = false;
        });
    },
    handleDeleteCancel(e) {
      this.isShowModal = false;
    },
    stateChange(state) {
      this.returnedData.canHaveGateways = !this.returnedData.canHaveGateways;
    }
  }
};
</script>

<style>
.iot_view_edit_form {
  padding: 20px 5px;
}
.iot_view_edit_formItem {
  margin-bottom: 8px;
}
.iot_view_edit_form_left {
  float: left;
}
.ant-form-item {
  margin-bottom: 10px;
}
</style>
