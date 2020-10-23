<template>
  <a-layout style="background: #fff;padding: 0 14px 0">
    <a-row>
      <a-col :span="10">
        <a-form :form="edit_form" layout="vertical" class="iot_view_edit_form">
          <a-form-item
            label="ID"
            :required="true"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 8 }"
            class="iot_view_edit_formItem"
          >
            <span style="float: left">{{ returnedData.id }}</span>
          </a-form-item>
          <a-form-item
            label="名称："
            :required="true"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 8 }"
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
              style="width: 80%;float: left;text-align: left"
            />
          </a-form-item>
          <a-form-item
            label="是否拥有网关："
            :required="true"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 8 }"
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
              style="float: left"
            >
            </a-switch>
          </a-form-item>

          <a-form-item
            class="iot_view_edit_formItem"
            label="选择行业："
            :required="true"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 8 }"
          >
            <a-cascader
              v-decorator="[
                'profession',
                {
                  initialValue: [returnedData.profession],
                  rules: [{ required: false, message: '请选择行业' }]
                }
              ]"
              style="float: left;text-align: left;width: 80%"
              size="small"
              :options="profession_options"
              placeholder=""
            />
          </a-form-item>

          <a-form-item
            class="iot_view_edit_formItem"
            :label="areaLabel"
            :required="false"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 15 }"
          >
            <a-input
              v-model="returnedData.province"
              size="small"
              style="width: 30%;float: left;text-align: left;margin-bottom: 12px"
            />
            <a-input
              v-model="returnedData.city"
              size="small"
              style="width: 30%;float: left;text-align: left;margin-bottom: 12px"
            />
            <a-input
              v-model="returnedData.district"
              size="small"
              style="width: 30%;float: left;text-align: left;margin-bottom: 12px"
            />
            <a-tooltip placement="rightTop">
              <template slot="title">
                省市区信息
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
            :label="addresLabel"
            :required="false"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 10 }"
          >
            <a-input
              v-model="returnedData.longitude"
              size="small"
              style="width: 40%;float: left;margin-bottom: 0px"
            />
            <a-input
              v-model="returnedData.latitude"
              size="small"
              style="width: 40%;float: left;margin-bottom: 0px"
            />
            <a-tooltip placement="rightTop">
              <template slot="title">
                经纬度信息
              </template>
              <a-icon
                type="exclamation-circle"
                style="height: 24px;line-height: 24px;width: 24px;
                     vertical-align: text-top"
              />
            </a-tooltip>
          </a-form-item>

          <a-row>
            <a-col :span="15" :offset="0">
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
                  icon="delete"
                  style="margin-left: 16px"
                  @click="handleBack"
                  >返回</a-button
                >
                <a-modal title="删除提示" :visible="isShowModal">
                  <template slot="footer">
                    <a-button key="back" @click="handleDeleteCancel"
                      >取消</a-button
                    >
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
      </a-col>
      <a-col :span="14">
        <div class="iot_amap_container">
          <el-amap vid="orgainzation_edit_map"> </el-amap>
        </div>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
import { initProfile, getProfessionOptions } from "@/utils/util";
import { setNetServer } from "@/utils/util";
import build_map from "../../../assets/building.png";
export default {
  data() {
    return {
      //label need align
      areaLabel: "\xa0\xa0\xa0" + "所在区域：",
      addresLabel: "\xa0\xa0\xa0" + "详细位置：",

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
        latitude: "",
        longitude: "",
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
            let address = res.data.organization.address.split(",");
            if (address.length == 2) {
              this.returnedData.longitude = address[0];
              this.returnedData.latitude = address[1];
            }
            this.returnedData.createdAt = res.data.createdAt;
            this.returnedData.updatedAt = res.data.updatedAt;
            let lng = this.returnedData.longitude || "114.362272";
            let lat = this.returnedData.latitude || "30.532565";
            this.getMap(lng, lat);
          } else {
            console.log("获取组织初始信息失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMap(lng, lat) {
      let mapObj = new AMap.Map("orgainzation_edit_map", {
        // eslint-disable-line no-unused-vars
        resizeEnable: true, //自适应大小
        zoom: 14,
        center: [lng, lat]
      });
      let startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(25, 40),
        // 图标的取图地址
        image: build_map, // 您自己的图标
        // 图标所用图片大小
        imageSize: new AMap.Size(25, 40)
      });
      let geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: "all"
      });
      let _self = this;
      const marker = new AMap.Marker({
        // eslint-disable-line no-unused-vars
        map: mapObj,
        icon: startIcon,
        position: mapObj.center, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: ""
      });
      mapObj.on("click", function(e) {
        _self.returnedData.longitude = e.lnglat.getLng();
        _self.returnedData.latitude = e.lnglat.getLat();
        geocoder.getAddress([e.lnglat.getLng(), e.lnglat.getLat()], function(
          status,
          result
        ) {
          if (status === "complete" && result.info === "OK") {
            if (result && result.regeocode) {
              // 具体地址
              _self.returnedData.province =
                result.regeocode.addressComponent.province;
              _self.returnedData.city = result.regeocode.addressComponent.city;
              _self.returnedData.district =
                result.regeocode.addressComponent.district;
            }
          } else {
            //alert('地址获取失败')
          }
        });
        mapObj.clearMap();
        const marker = new AMap.Marker({
          // eslint-disable-line no-unused-vars
          map: mapObj,
          icon: startIcon,
          position: [_self.returnedData.longitude, _self.returnedData.latitude], // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: ""
        });
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
          var data = {
            id: this.returnedData.id,
            name: values.name,
            displayName: values.name,
            canHaveGateways: values.canHaveGateways,
            profession: profession,
            province: this.returnedData.province,
            city: this.returnedData.city,
            district: this.returnedData.district,
            address:
              this.returnedData.longitude + "," + this.returnedData.latitude
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
.iot_amap_container {
  height: 400px;
  width: 100%;
}
</style>
