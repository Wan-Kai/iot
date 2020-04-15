<template>
  <a-layout>
    <a-row
      style="background: #fff"
      type="flex"
      justify="space-between"
      align="top"
      :gutter="16"
    >
      <a-col :span="10">
        <a-row class="iot_view_node_deployEdit_form_content">
          <a-form
            :form="nodeDeployForm"
            @submit="handleSubmit"
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
                @change="radioOnChange"
                v-model="value"
                style="float: left"
              >
                <a-radio :value="1">OTAA</a-radio>
                <a-radio :value="2">ABP</a-radio>
              </a-radio-group>
            </a-form-item>

            <a-form-item
              class="iot_view_node_deployEdit_formitem"
              label="协议版本："
              :required="true"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-cascader
                v-decorator="['agreementVision']"
                style="width: 90%;float: left;text-align: left"
                size="small"
                :options="macVision_option"
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
              class="iot_view_node_deployEdit_formitem"
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
              v-for="(k, index) in nodeDeployForm.getFieldValue('keys')"
              :key="k"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
              :label="getLabel(index)"
              :required="true"
              class="iot_view_node_deployEdit_formitem"
            >
              <a-input
                v-decorator="[
                  `names[${k}]`,
                  {
                    validateTrigger: ['change', 'blur']
                  }
                ]"
                size="small"
                style="width: 90%;float: left;text-align: left"
              />
              <a-tooltip placement="rightTop">
                <template slot="title">
                  {{ getLabel(index) }}
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
            <a-form-item
              class="iot_view_node_deployEdit_formitem"
              label="节点描述："
              :required="false"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-textarea
                placeholder="请填写节点描述，最多100个汉字"
                v-decorator="['band']"
                :rows="4"
                style="width: 90%;float: left;text-align: left"
              />
            </a-form-item>
          </a-form>
          <a-row>
            <a-col :span="16" :offset="8">
              <div style="display: flex">
                <a-button type="primary">保存</a-button>
                <a-button style="margin: 0 16px">取消</a-button>
                <a-button type="danger" icon="delete" @click="showModal"
                  >删除设备</a-button
                >
              </div>
            </a-col>
          </a-row>
        </a-row>
      </a-col>
      <a-col :span="14">
        <div>
          <a-form
            :form="nodeDeployFormSecond"
            @submit="handleSubmitSecond"
            layout="vertical"
            class="iot_view_node_deployEdit_form"
          >
            <a-form-item
              class="iot_view_node_deployEdit_formitem"
              label="地理位置："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
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
              class="iot_view_node_deployEdit_formitem"
              label="所在区域："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
            >
              <a-cascader
                v-decorator="['area']"
                style="width: 90%;float: left;text-align: left"
                size="small"
                :options="area_option"
                placeholder=""
              />
            </a-form-item>
            <a-form-item
              v-if="areaShow"
              class="iot_view_node_deployEdit_formitem"
              label="详细位置："
              :required="true"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
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
        </div>
        <div class="iot_amap-nodeEdit-container">
          <el-amap vid="note_edit_map"> </el-amap>
        </div>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
import wifi_map from "../../../assets/wifi.png";
let id = 0;
export default {
  components: { ACol, ARow },
  data() {
    return {
      macVision_option: [],
      area_option: [],

      areaShow: false,
      submitLoading: false,
      confirmLoading: false,
      visible: false,
      value: 1,
      Lng: "",
      Lat: "",

      mapObj: {},
      mapData: []
    };
  },

  beforeCreate() {
    this.nodeDeployForm = this.$form.createForm(this, {
      name: "nodeDeployForm"
    });
    this.nodeDeployForm.getFieldDecorator("keys", {
      initialValue: [],
      preserve: true
    });
    this.nodeDeployFormSecond = this.$form.createForm(this, {
      name: "nodeDeployForm"
    });
    this.nodeDeployFormSecond.getFieldDecorator("keys", {
      initialValue: [],
      preserve: true
    });
  },

  beforeMount() {
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
    handleSubmit() {},
    handleSubmitSecond() {},
    showModal() {
      this.visible = true;
      this.ModalText = "确认删除" + ":" + this.id;
    },
    radioOnChange(e) {
      if (e.target.value === 1) {
        let item;
        for (item in this.nodeDeployForm.getFieldValue("keys")) {
          this.remove(item);
        }
      } else if (e.target.value === 2) {
        id = 0;
        this.add();
        this.add();
        this.add();
      }
    },
    remove(k) {
      const { nodeDeployForm } = this;
      // can use data-binding to get
      const keys = nodeDeployForm.getFieldValue("keys");

      // can use data-binding to set
      nodeDeployForm.setFieldsValue({
        keys: keys.filter(key => key.toString() !== k.toString())
      });
    },
    add() {
      const { nodeDeployForm } = this;
      // can use data-binding to get
      const keys = nodeDeployForm.getFieldValue("keys");
      const nextKeys = keys.concat(id++);
      // can use data-binding to set
      // important! notify form to detect changes
      nodeDeployForm.setFieldsValue({
        keys: nextKeys
      });
    },
    getLabel(index) {
      if (index == 0) {
        return "NwksKey：";
      } else if (index == 1) {
        return "FCntUp：";
      } else {
        return "FCntDn：";
      }
    },
    stateChange() {
      this.areaShow = !this.areaShow;
      if (!this.areaShow) {
        this.mapObj.clearMap();
      }
    },
    handleOk(e) {},
    handleCancel(e) {
      this.visible = false;
    }
  }
};
</script>

<style>
.iot_view_node_deployEdit_form_content {
  padding-bottom: 32px;
}
.iot_view_node_deployEdit_form {
  margin-bottom: 12px;
}
.iot_view_node_deployEdit_formitem {
  margin-bottom: 8px;
  padding-bottom: 0px;
}
.iot_amap-nodeEdit-container {
  height: 380px;
  width: 100%;
  margin-bottom: 10px;
}
</style>
