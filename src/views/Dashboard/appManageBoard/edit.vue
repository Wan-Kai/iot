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
          :form="form"
          @submit="handleSubmit"
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
                  initialValue: this.infoData.id
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
                  initialValue: this.infoData.name
                }
              ]"
              style="float: left;text-align: left;width: 90%"
            />
          </a-form-item>
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
                  rules: [{ required: true, message: '请输入设备分配容量!' }],
                  initialValue: this.infoData.capacity
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
            class="iot_view_app_edit_formItem"
            label="地理位置："
            :required="true"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-switch
              checkedChildren="开"
              unCheckedChildren="关"
              @change="stateChange"
              style="float: left"
            />
          </a-form-item>
          <a-form-item
            v-if="areaShow"
            class="iot_view_app_edit_formItem"
            label="所在区域："
            :required="true"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
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
            class="iot_view_app_edit_formItem"
            label="详细位置："
            :required="true"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
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
          <a-form-item
            class="iot_view_app_edit_formItem"
            label="应用描述："
            :required="false"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-textarea
              v-decorator="[
                'description',
                {
                  initialValue: this.infoData.description
                }
              ]"
              :rows="4"
              style="float: left;text-align: left;width: 90%"
            />
          </a-form-item>
          <a-row>
            <a-col :span="16" :offset="8">
              <div class="iot_view_edit_add_form_left">
                <a-button type="primary" html-type="submit">确定</a-button>
                <a-button style="margin-left: 20px" @click="back"
                  >取消</a-button
                >
                <a-button
                  style="margin-left: 20px"
                  icon="delete"
                  type="danger"
                  @click="showModal"
                  >删除设备</a-button
                >
                <a-modal
                  title="Title"
                  :visible="visible"
                  @ok="handleOk"
                  :confirmLoading="confirmLoading"
                  @cancel="handleCancel"
                >
                  <p>{{ ModalText }}</p>
                </a-modal>
              </div>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
      <a-col :span="14">
        <div class="iot_amap-nodeEdit-container">
          <el-amap vid="note_edit_map"> </el-amap>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import wifi_map from "../../../assets/wifi.png";
export default {
  components: { ARow },
  data() {
    return {
      area_options: [],
      infoData: {
        id: "",
        name: "",
        capacity: "",
        description: ""
      },
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false,

      areaShow: false,
      submitLoading: false,
      Lng: "",
      Lat: "",

      mapObj: {},
      mapData: []
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "dynamic_form_item" });
    this.form.getFieldDecorator("keys", { initialValue: [], preserve: true });

    this.$api.appManage
      .getAppDetail({
        id: this.$route.query.number
      })
      .then(res => {
        this.infoData = res.data.result;
        console.log(this.infoData);
      })
      .catch(err => {
        console.log(err);
      });
  },
  beforeMount() {
    this.area_options = this.$store.getters.getArea;
    this.$api.index
      .mapMarkers({})
      .then(res => {
        this.mapData = res.data.result;
        this.mapObj = new AMap.Map("note_edit_map", {
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
            _self.Lng = e.lnglat.getLng();
            _self.Lat = e.lnglat.getLat();
            _self.mapObj.clearMap();
            const marker = new AMap.Marker({
              // eslint-disable-line no-unused-vars
              map: _self.mapObj,
              icon: startIcon,
              position: [e.lnglat.getLng(), e.lnglat.getLat()], // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              title: "网关"
            });
            address = _self.Lng.toString() + "," + _self.Lat.toString();
            _self.nodeDeployFormSecond.setFieldsValue({
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
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$api.appManage
            .updateApp({
              id: values.id
            })
            .catch(err => {
              console.log(err);
            });
          this.$message.success("成功修改应用:" + values.id);
          setTimeout(() => {
            this.$router.push({
              name: "appManageInit"
            });
          }, 500);
        }
      });
    },
    handleSubmitSecond() {},
    back() {
      this.$router.push({
        name: "appManageInit"
      });
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
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
