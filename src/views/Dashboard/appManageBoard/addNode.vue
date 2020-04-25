<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div class="iot_view_appManage_add_form_content">
      <a-row
        style="background: #fff"
        type="flex"
        justify="space-between"
        align="top"
        :gutter="16"
      >
        <a-col :span="10">
          <a-row class="iot_view_App_node_add_form_content">
            <a-form
              :form="nodeAddForm"
              layout="vertical"
              class="iot_view_App_node_add_form"
            >
              <a-form-item
                class="iot_view_App_node_add_formitem"
                label="节点名称："
                :required="true"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-input
                  v-decorator="['nodeName']"
                  size="small"
                  style="width: 90%;float: left;text-align: left"
                >
                </a-input>
              </a-form-item>

              <a-form-item
                class="iot_view_App_node_add_formitem"
                label="节点编号(DevEUI)："
                :required="true"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-cascader
                  v-decorator="[
                    'AppEUI',
                    {
                      rules: [{ required: true, message: '请选择应用编号' }]
                    }
                  ]"
                  style="width: 90%;float: left;text-align: left"
                  size="small"
                  :options="DevEUI_options"
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
                class="iot_view_App_node_add_formitem"
                label="应用编号(AppEUI)："
                :required="true"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-input
                  v-decorator="[
                    'AppEUI',
                    {
                      value: this.id
                    }
                  ]"
                  size="small"
                  style="width: 90%;float: left;text-align: left"
                />
              </a-form-item>

              <a-form-item
                class="iot_view_App_node_add_formitem"
                label="AppKey："
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

              <a-form-item
                class="iot_view_App_node_add_formitem"
                label="设备配置文件："
                :required="true"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-cascader
                  v-decorator="[
                    'devProfile',
                    {
                      rules: [{ required: true, message: '请选择设备配置文件' }]
                    }
                  ]"
                  style="width: 90%;float: left;text-align: left"
                  size="small"
                  :options="devProfile_options"
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
                class="iot_view_App_node_add_formitem"
                label="节点描述："
                :required="false"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-textarea
                  placeholder="请填写节点描述，最多100个汉字"
                  v-decorator="['description']"
                  :rows="4"
                  style="width: 90%;float: left;"
                />
              </a-form-item>
            </a-form>
            <a-row>
              <a-col :span="16" :offset="8">
                <div style="display: flex">
                  <a-button type="primary" @click="handleSubmit">保存</a-button>
                  <a-button style="margin: 0 16px" @click="backToNodeList"
                    >取消</a-button
                  >
                </div>
              </a-col>
            </a-row>
          </a-row>
        </a-col>
        <a-col :span="14">
          <div>
            <a-form
              :form="nodeDeployFormMap"
              layout="vertical"
              class="iot_view_App_node_add_form"
            >
              <a-form-item
                class="iot_view_App_node_add_formitem"
                label="地理位置："
                :required="true"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 18 }"
              >
                <a-switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  @change="areaStateChange"
                  style="float: left"
                />
              </a-form-item>
              <a-form-item
                v-if="areaShow"
                class="iot_view_App_node_add_formitem"
                label="所在区域："
                :required="true"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 18 }"
              >
                <a-cascader
                  v-decorator="['area']"
                  style="width: 90%;float: left;text-align: left"
                  size="small"
                  :options="area_options"
                  placeholder=""
                />
              </a-form-item>
              <a-form-item
                v-if="areaShow"
                class="iot_view_App_node_add_formitem"
                label="详细位置："
                :required="true"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 18 }"
              >
                <a-input
                  v-decorator="['address']"
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
          </div>
          <div class="iot_amap_App_nodeAdd_container">
            <el-amap vid="App_note_add_map"> </el-amap>
          </div>
        </a-col>
      </a-row>
    </div>
  </a-layout>
</template>

<script>
import wifi_map from "@/assets/wifi.png";
export default {
  name: "addNode",
  data() {
    return {
      //params
      id: "",

      //options
      DevEUI_options: [],
      area_options: [],
      devProfile_options: [],

      //data
      AppEUI: "暂定",
      ModalText: "",
      areaShow: false,
      location: {
        Lng: "",
        Lat: ""
      },

      mapObj: {},
      mapData: [],

      //loading
      submitLoading: false,
      confirmLoading: false
    };
  },
  beforeCreate() {
    this.nodeAddForm = this.$form.createForm(this, { name: "nodeAdd_form" });
    this.nodeDeployFormMap = this.$form.createForm(this, {
      name: "nodeAdd_form_map"
    });
  },
  beforeMount() {
    this.id = this.$route.query.id;
    console.log(this.id);
    this.$api.index
      .mapMarkers({})
      .then(res => {
        this.mapData = res.data.result;
        this.mapObj = new AMap.Map("App_note_add_map", {
          // eslint-disable-line no-unused-vars
          resizeEnable: true, //自适应大小
          zoom: this.mapData.zoom,
          center: this.mapData.center
        });
        let startIcon = new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(25, 25),
          // 图标的取图地址
          image: wifi_map, // 您自己的图标
          // 图标所用图片大小
          imageSize: new AMap.Size(25, 25)
        });
        if (this.mapData.center) {
          const marker = new AMap.Marker({
            // eslint-disable-line no-unused-vars
            map: this.mapObj,
            icon: startIcon,
            position: this.mapObj.center, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: "网关"
          });
        }
        let _self = this;
        let address = "";
        this.mapObj.on("click", function(e) {
          if (_self.areaShow) {
            _self.location.Lng = e.lnglat.getLng();
            _self.location.Lat = e.lnglat.getLat();
            _self.mapObj.clearMap();
            const marker = new AMap.Marker({
              // eslint-disable-line no-unused-vars
              map: _self.mapObj,
              icon: startIcon,
              position: [e.lnglat.getLng(), e.lnglat.getLat()], // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              title: "网关"
            });
            address =
              _self.location.Lng.toString() +
              "," +
              _self.location.Lat.toString();
            _self.nodeDeployFormMap.setFieldsValue({
              address: address
            });
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    handleSubmit() {},
    backToNodeList() {
      this.$router.push({
        name: "checkApp",
        query: { id: this.id, tab: "1" }
      });
    },
    areaStateChange() {
      this.areaShow = !this.areaShow;
      if (!this.areaShow) {
        this.mapObj.clearMap();
      }
    }
  }
};
</script>

<style>
.iot_view_appManage_add_form_content {
  margin-top: 20px;
}
.iot_view_App_node_add_form_content {
  padding-bottom: 32px;
}
.iot_view_App_node_add_form {
  margin-bottom: 12px;
}
.iot_view_App_node_add_formitem {
  margin-bottom: 8px;
  padding-bottom: 0px;
}
.iot_amap_App_nodeAdd_container {
  height: 380px;
  width: 100%;
  margin-bottom: 10px;
}
</style>
