<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <a-form
      :form="form"
      @submit="handleSubmit"
      layout="vertical"
      class="iot_view_add_form"
    >
      <a-form-item
        label="名称："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_add_formItem"
      >
        <a-input
          size="small"
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '请输入名称!' }] }
          ]"
          style="float: left;text-align: left;width: 100%"
        />
      </a-form-item>

      <a-form-item
        label="是否拥有网关："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
        class="iot_view_add_formItem"
      >
        <a-switch
          :checked="currentRecord.canHaveGateways"
          checkedChildren="能"
          unCheckedChildren="否"
          @change="stateChange"
          v-decorator="[
            'canHaveGateways',
            { rules: [{ required: true, message: '是否拥有网关' }] }
          ]"
          style="margin-left: 10px;float: left"
        >
        </a-switch>
        <a-tooltip placement="rightTop" style="float: left;margin-left: 10px">
          <template slot="title">
            请选择
          </template>
          <a-icon
            type="exclamation-circle"
            style="height: 24px;line-height: 24px;width: 24px;
          text-align: left;vertical-align: text-top"
          />
        </a-tooltip>
      </a-form-item>

      <a-form-item
        class="iot_view_add_formItem"
        label="选择行业："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
      >
        <a-cascader
          v-decorator="[
            'profession',
            {
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
        class="iot_view_add_formItem"
        label="所在区域："
        :required="false"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
      >
        <a-cascader
          v-decorator="[
            'area',
            {
              rules: [{ required: false, message: '请选择所在区域' }]
            }
          ]"
          style="margin-left: 0px;float: left"
          size="small"
          :options="area_options"
          placeholder=""
        />
      </a-form-item>
      <a-form-item
        class="iot_view_add_formItem"
        label="详细地址："
        :required="false"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 7 }"
      >
        <a-input
          v-decorator="['address']"
          size="small"
          style="float: left;text-align: left;width: 100%"
        />
      </a-form-item>

      <a-row>
        <a-col :span="7" :offset="3">
          <div class="iot_view_add_form_left">
            <a-button type="primary" html-type="submit" :loading="commitLoading"
              >确定</a-button
            >
            <a-button style="margin-left: 30px" @click="back">取消</a-button>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </a-layout>
</template>

<script>
import { initOrganizations } from "@/utils/util";

export default {
  data() {
    return {
      profession_options: [],
      area_options: [],
      currentRecord: {
        id: "",
        name: "",
        displayName: "",
        canHaveGateways: false,
        profession: "",
        province: "",
        city: "",
        district: "",
        address: ""
      },
      commitLoading: false
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "dynamic_form_item" });
    this.form.getFieldDecorator("keys", { initialValue: [], preserve: true });
  },
  beforeMount() {
    this.area_options = this.$store.getters.getArea;
    this.profession_options = this.$store.getters.getProfessionOptions;
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.commitLoading = true;
          console.log("Received values of form: ", values);

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
            .createOrganization({
              organization: data
            })
            .then(res => {
              if (res.status === 200) {
                this.commitLoading = false;
                this.$message.success("成功创建企业");

                initOrganizations();

                setTimeout(() => {
                  this.$router.push("/admin/dashboard/organization");
                }, 100);
              } else {
                this.$message.error(res.data.code);
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

    back() {
      this.$router.push("/admin/dashboard/organization");
    },

    stateChange(state) {
      this.currentRecord.canHaveGateways = !this.currentRecord.canHaveGateways;
      if (state) {
        // this.add();
        console.log(state);
      } else {
        console.log(state);
      }
    }
  }
};
</script>

<style scoped>
.iot_view_add_form {
  padding: 20px 5px;
}
iot_view_add_formItem {
  margin-bottom: 8px;
}
.iot_view_add_form_left {
  float: left;
}
.iot_view_internetServer_add_form_left {
  float: left;
}
.ant-form-item {
  margin-bottom: 10px;
}
</style>
