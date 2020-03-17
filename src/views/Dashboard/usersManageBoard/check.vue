<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div style="padding: 20px 12px">
      <a-row>
        <a-col :span="10">
          <span style="font-weight: bold;font-size: 12px;float: left"
            >基本信息</span
          >
        </a-col>
      </a-row>
      <a-row style="margin-top: 14px">
        <a-col :span="10">
          <a-form
            :form="form"
            @submit="handleSubmit"
            layout="vertical"
            class="iot_view_usersManage_check_form"
          >
            <a-form-item
              label="手机："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              class="iot_view_usersManage_check_formItem"
            >
              <p class="iot_view_usersManage_check_formItem_p">
                {{ phoneNumber }}
              </p>
            </a-form-item>
            <a-form-item
              label="权限："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              class="iot_view_usersManage_check_formItem"
            >
              <p class="iot_view_usersManage_check_formItem_p">
                {{ authority }}
              </p>
            </a-form-item>
            <a-form-item
              label="姓名："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              class="iot_view_usersManage_check_formItem"
            >
              <p class="iot_view_usersManage_check_formItem_p">{{ name }}</p>
            </a-form-item>
            <a-form-item
              label="邮箱："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              class="iot_view_usersManage_check_formItem"
            >
              <p class="iot_view_usersManage_check_formItem_p">{{ email }}</p>
            </a-form-item>
            <a-form-item
              label="单位："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              class="iot_view_usersManage_check_formItem"
            >
              <p class="iot_view_usersManage_check_formItem_p">{{ unit }}</p>
            </a-form-item>
            <a-form-item
              class="iot_view_usersManage_check_formItem"
              label="备注："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
            >
              <p class="iot_view_usersManage_check_formItem_p">
                {{ description }}
              </p>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </div>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: "110",
      authority: "管理员",
      name: "张三",
      email: "123@gmail.com",
      unit: "武汉卓目科技",
      description: "描述内容描述内容描述内容描述内容描述内容描述内容描述内容"
    };
  }
};
</script>

<style>
.iot_view_usersManage_check_formItem {
  margin-bottom: 8px;
  padding-bottom: 0px;
}
.iot_view_usersManage_check_formItem_p {
  text-align: left;
  margin-bottom: 0;
}
</style>
