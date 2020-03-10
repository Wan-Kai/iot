<template>
  <!--  <a-layout style="background: #fff;padding: 0 14px 0">-->
  <!--    <span>{{ $route.params.id }}</span>-->
  <!--  </a-layout>-->

  <a-layout>
    <a-card style="width: 100%">
      <a-row style="padding-bottom: 8px">
        <a-col :span="24">
          <span style="font-size: 16px;font-weight: normal;color: black"
            >主机名： {{ $route.params.id }}</span
          >
        </a-col>
      </a-row>
      <div class="iot_line" />
      <a-row type="flex" justify="space-around" style="margin-top: 8px">
        <a-col :span="8" style="width: 20%">
          <a-col :span="6" style="height: 100%">
            <a-icon
              type="check"
              style="font-size: 32px;color: #1eaf84;height: 100%"
            />
          </a-col>
          <a-col :span="18" style="text-align: left">
            <div style="font-size: 8px;color: #b0b0b0">生活</div>
            <div style="font-size: 12px">还有远方</div>
          </a-col>
        </a-col>
        <a-col :span="8" style="width: 20%">
          <a-col :span="6" style="height: 100%">
            <a-icon
              type="check"
              style="font-size: 32px;color: #1eaf84;height: 100%"
            />
          </a-col>
          <a-col :span="18" style="text-align: left">
            <div style="font-size: 8px;color: #b0b0b0">生活</div>
            <div style="font-size: 12px">还有远方</div>
          </a-col>
        </a-col>
        <a-col :span="8" style="width: 20%">
          <a-col :span="6" style="height: 100%">
            <a-icon
              type="check"
              style="font-size: 32px;color: #1eaf84;height: 100%"
            />
          </a-col>
          <a-col :span="18" style="text-align: left">
            <div style="font-size: 8px;color: #b0b0b0">生活</div>
            <div style="font-size: 12px">还有远方</div>
          </a-col>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      style="width: 100%;margin-top: 16px;height: 100%;padding: 10px 14px"
    >
      <a-form
        :form="form"
        layout="vertical"
        class="iot_view_internetServer_check_form"
      >
        <a-form-item
          label="名称："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12 }"
          class="iot_view_internetServer_check_formItem"
        >
          <span style="float: left"> 消息消息</span>
        </a-form-item>
        <a-form-item
          label="名称："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12 }"
          class="iot_view_internetServer_check_formItem"
        >
          <span style="float: left"> 消息消息</span>
        </a-form-item>
        <a-form-item
          label="名称："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12 }"
          class="iot_view_internetServer_check_formItem"
        >
          <span style="float: left"> 消息消息</span>
        </a-form-item>
        <a-form-item
          label="名称："
          :required="true"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 12 }"
          class="iot_view_internetServer_check_formItem"
        >
          <span style="float: left"> 消息消息</span>
        </a-form-item>
      </a-form>
    </a-card>
  </a-layout>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
export default {
  components: { ACol, ARow }
};
</script>

<style>
.iot_line {
  width: 100%;
  height: 1px;
  border-top: solid #dddddd 1px;
  padding: 12px 0;
}
.ant-card-wider-padding .ant-card-body {
  padding: 16px 8px;
}
.iot_view_internetServer_check_formItem {
  margin-bottom: 14px;
}
</style>
