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
          <a-form layout="vertical" class="iot_view_usersManage_check_form">
            <a-form-item
              label="手机："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              class="iot_view_usersManage_check_formItem"
            >
              <p class="iot_view_usersManage_check_formItem_p">
                {{ this.returnedData.phonenumber }}
              </p>
            </a-form-item>
            <a-form-item
              label="权限："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              class="iot_view_usersManage_check_formItem"
            >
              <p class="iot_view_usersManage_check_formItem_p">
                {{ this.getRole }}
              </p>
            </a-form-item>
            <a-form-item
              label="姓名："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              class="iot_view_usersManage_check_formItem"
            >
              <p class="iot_view_usersManage_check_formItem_p">
                {{ this.returnedData.username }}
              </p>
            </a-form-item>
            <a-form-item
              label="邮箱："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              class="iot_view_usersManage_check_formItem"
            >
              <p class="iot_view_usersManage_check_formItem_p">
                {{ this.returnedData.email }}
              </p>
            </a-form-item>

            <a-form-item
              class="iot_view_usersManage_check_formItem"
              label="备注："
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
            >
              <p class="iot_view_usersManage_check_formItem_p">
                {{ this.returnedData.note }}
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
      returnedData: {
        id: "",
        username: "",
        isAdmin: false,

        phonenumber: "",
        email: "",
        note: "",

        createdAt: "",
        updatedAt: ""
      }
    };
  },

  computed: {
    getRole() {
      if (this.returnedData.isAdmin) return "管理员";
      else return "一般用户";
    }
  },

  beforeMount() {
    this.returnedData.id = this.$route.query.id;
  },

  mounted() {
    this.getDetail();
  },

  methods: {
    getDetail() {
      this.$api.usersManage
        .getUserDetail({ extra: this.returnedData.id })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.returnedData.createdAt = res.data.createdAt;
            this.returnedData.updatedAt = res.data.updatedAt;
            this.returnedData.id = res.data.user.id;
            this.returnedData.username = res.data.user.username;
            this.returnedData.phonenumber = res.data.user.phonenumber;
            this.returnedData.email = res.data.user.email;
            this.returnedData.note = res.data.user.note;
            this.returnedData.isAdmin = res.data.user.isAdmin;
          } else {
            console.log("获取用户信息信息失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
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
