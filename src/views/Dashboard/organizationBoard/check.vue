<template>
  <a-layout style="background: #fff;padding: 0 14px 0">
    <a-row>
      <a-col :span="10">
        <a-form
          :form="edit_form"
          layout="vertical"
          class="iot_view_edit_form"
          labelAlign="right"
        >
          <a-form-item
            label="ID"
            :required="true"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 8 }"
            class="iot_view_edit_formItem_temp"
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
            <span style="float: left">{{ returnedData.name }}</span>
          </a-form-item>
          <a-form-item
            label="网关发现："
            :required="true"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 8 }"
            class="iot_view_edit_formItem"
          >
            <a-switch
              :disabled="true"
              :checked="returnedData.canHaveGateways"
              :defaultChecked="returnedData.canHaveGateways"
              checkedChildren="能"
              unCheckedChildren="否"
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
            <span style="float: left">{{ returnedData.profession }}</span>
          </a-form-item>

          <a-form-item
            class="iot_view_edit_formItem"
            :label="areaLabel"
            :required="false"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 8 }"
          >
            <span style="float: left">{{ getLocation }}</span>
          </a-form-item>
          <a-form-item
            class="iot_view_edit_formItem"
            :label="addresLabel"
            :required="false"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 8 }"
          >
            <span style="float: left">{{ returnedData.address }}</span>
          </a-form-item>

          <a-row>
            <a-col :span="10" :offset="0">
              <div class="iot_view_edit_form_left">
                <a-button icon="delete" style="" @click="handleBack"
                  >返回</a-button
                >
              </div>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
      <a-col :span="14">
        <div class="iot_amap_container">
          <el-amap vid="orgainzation_check_map"> </el-amap>
        </div>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
import build_map from "../../../assets/building.png";

export default {
  data() {
    return {
      //label need align
      areaLabel: "\xa0\xa0\xa0" + "所在区域：",
      addresLabel: "\xa0\xa0\xa0" + "详细位置：",

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
      }
    };
  },

  computed: {
    getLocation() {
      return (
        this.returnedData.province +
        this.returnedData.city +
        this.returnedData.district
      );
    }
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
  },

  mounted() {
    //debugger;
    this.$api.organization
      .getOrganization({
        limit: 1,
        extra: this.returnedData.id
      })
      .then(res => {
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
          let address = this.returnedData.address.split(",");
          if (address.length == 2) {
            this.getMap(address[0], address[1]);
          }
        } else {
          console.log("获取组织详细信息失败");
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    handleBack() {
      this.$router.push({
        name: "organizationInit"
      });
    },
    getMap(lng, lat) {
      let mapObj = new AMap.Map("orgainzation_check_map", {
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
      const marker = new AMap.Marker({
        // eslint-disable-line no-unused-vars
        map: mapObj,
        icon: startIcon,
        position: mapObj.center, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: ""
      });
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
.iot_view_edit_formItem_temp {
  margin-bottom: 8px;
}
.iot_amap_container {
  height: 400px;
  width: 100%;
}
</style>
