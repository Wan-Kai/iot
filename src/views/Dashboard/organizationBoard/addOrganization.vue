<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <a-row>
      <a-col :span="10">
        <a-form
          :form="form"
          @submit="handleSubmit"
          layout="vertical"
          class="iot_view_add_form"
        >
          <a-form-item
            label="名称："
            :required="true"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 8 }"
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
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 8 }"
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
              style="float: left"
            >
            </a-switch>
          </a-form-item>

          <a-form-item
            class="iot_view_add_formItem"
            label="选择行业："
            :required="true"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 8 }"
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
            :label="areaLabel"
            :required="false"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 15 }"
          >
            <a-input
              v-model="currentRecord.province"
              size="small"
              style="width: 30%;float: left;text-align: left;margin-bottom: 12px"
            />
            <a-input
              v-model="currentRecord.city"
              size="small"
              style="width: 30%;float: left;text-align: left;margin-bottom: 12px"
            />
            <a-input
              v-model="currentRecord.district"
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
            class="iot_view_add_formItem"
            :label="addresLabel"
            :required="false"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 10 }"
          >
            <a-input
              v-model="currentRecord.longitude"
              size="small"
              style="width: 40%;float: left;margin-bottom: 0px"
            />
            <a-input
              v-model="currentRecord.latitude"
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
            <a-col :span="7" :offset="0">
              <div class="iot_view_add_form_left">
                <a-button
                  type="primary"
                  html-type="submit"
                  :loading="commitLoading"
                  >确定</a-button
                >
                <a-button style="margin-left: 30px" @click="handleBack"
                  >取消</a-button
                >
              </div>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
      <a-col :span="14">
        <div class="iot_amap_container">
          <el-amap vid="orgainzation_add_map"> </el-amap>
        </div>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
import {
  getProfessionOptions,
  initProfile,
  getCurrentUser
} from "@/utils/util";
import build_map from "../../../assets/building.png";
export default {
  data() {
    return {
      //label need align
      areaLabel: "\xa0\xa0\xa0" + "所在区域：",
      addresLabel: "\xa0\xa0\xa0" + "详细位置：",

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
        longitude: "",
        latitude: ""
      },
      commitLoading: false
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "add_form" });
    this.form.getFieldDecorator("keys", { initialValue: [], preserve: true });
  },
  beforeMount() {
    this.profession_options = getProfessionOptions();
    this.getMap();
  },
  methods: {
    getMap() {
      this.$api.index
        .mapMarkers({})
        .then(res => {
          if (res.status === 200) {
            this.mapData = res.data.result;
            let mapObj = new AMap.Map("orgainzation_add_map", {
              // eslint-disable-line no-unused-vars
              resizeEnable: true, //自适应大小
              zoom: this.mapData.zoom,
              center: this.mapData.center
            });
            this.currentRecord.longitude = this.mapData.center[0];
            this.currentRecord.latitude = this.mapData.center[1];
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
            mapObj.on("click", function(e) {
              _self.currentRecord.longitude = e.lnglat.getLng();
              _self.currentRecord.latitude = e.lnglat.getLat();
              geocoder.getAddress(
                [e.lnglat.getLng(), e.lnglat.getLat()],
                function(status, result) {
                  if (status === "complete" && result.info === "OK") {
                    if (result && result.regeocode) {
                      // 具体地址
                      _self.currentRecord.province =
                        result.regeocode.addressComponent.province;
                      _self.currentRecord.city =
                        result.regeocode.addressComponent.city;
                      _self.currentRecord.district =
                        result.regeocode.addressComponent.district;
                    }
                  } else {
                    //alert('地址获取失败')
                  }
                }
              );
              mapObj.clearMap();
              const marker = new AMap.Marker({
                // eslint-disable-line no-unused-vars
                map: mapObj,
                icon: startIcon,
                position: [
                  _self.currentRecord.longitude,
                  _self.currentRecord.latitude
                ], // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: ""
              });
            });
          } else {
            console.log("获取map信息失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.commitLoading = true;
          var profession = "";
          if (!this.common.isEmpty(values.profession[0])) {
            profession = values.profession[0];
          }
          var data = {
            name: values.name,
            displayName: values.name,
            canHaveGateways: values.canHaveGateways,
            profession: profession,
            province: this.currentRecord.province || "",
            city: this.currentRecord.city || "",
            district: this.currentRecord.district || "",
            address:
              this.currentRecord.longitude + "," + this.currentRecord.latitude
          };

          this.$api.organization
            .createOrganization({
              organization: data
            })
            .then(res => {
              if (res.status === 200) {
                this.commitLoading = false;
                this.$message.success("添加企业成功");

                //debugger;
                //需要将当前用户添加到组织机构中
                var newOrganizationID = res.data.id;
                var currentUser = this.common.getCurrentUser();
                var data = {
                  isAdmin: true,
                  isDeviceAdmin: true,
                  isGatewayAdmin: true,
                  organizationID: newOrganizationID,
                  userID: currentUser.id,
                  username: currentUser.username
                };
                this.$api.organization
                  .addUser({
                    extra: newOrganizationID,
                    organizationUser: data
                  })
                  .then(res => {
                    //添加成功之后，重新更新profile
                    initProfile();
                    var _this = this;
                    setTimeout(() => {
                      _this.handleBack();
                    }, 100);
                  })
                  .catch(err => {
                    console.log(err);
                  });
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

    handleBack() {
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
.iot_amap_container {
  height: 400px;
  width: 100%;
}
</style>
