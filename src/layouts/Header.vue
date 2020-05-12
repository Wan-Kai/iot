<template>
  <div style="width: 100%">
    <div class="iot_searchLayout">
      <img src="../assets/logo.png" />
      <a-input-search
        placeholder="input search text"
        class="iot_search"
        @search="onSearch"
        size="small"
      />
    </div>

    <div class="iot_user">
      <a-avatar icon="user" class="iot_avatar" />
      <a-dropdown>
        <a class="ant-dropdown-link" style="color: white">
          {{ this.getUserName }} <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <!--
          <a-menu-item>
            <a href="javascript:;">用户详情</a>
          </a-menu-item>
          -->
          <a-menu-item>
            <router-link to="/user/login" id="router" class="iot_register_text"
              >退出</router-link
            >
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>

    <div class="iot_organization">
      <div>
        <a-cascader
          style="width: 120px;text-align: left"
          :options="company_options"
          :default-value="[company_options[0].organizationID]"
          :allow-clear="false"
          :fieldNames="{
            label: 'organizationName',
            value: 'organizationID',
            children: ''
          }"
          @change="onChangeCompany"
          placeholder="组织机构"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getOrganizationOptions } from "@/utils/util";
export default {
  data() {
    return {
      userName: "",
      company_options: []
    };
  },

  computed: {
    getUserName() {
      var user = this.common.getCurrentUser();
      if (user) return user.username;
      return "";
    }
  },

  beforeMount() {
    debugger;
    //this.company_options = getOrganizationOptions();
    this.company_options = this.common.getCurrentOrganizationList();
    debugger;
  },

  methods: {
    onSearch() {},

    onChangeCompany(value, selectedOptions) {
      if (value == null || value.length <= 0) return;

      if (!this.common.isEmpty(value[0]))
        this.common.setCurrentOrganization(value[0]);
    }
  }
};
</script>

<style scoped>
.iot_searchLayout {
  float: left;
  padding-left: 20px;
}
.iot_search {
  width: 270px;
  height: 26px;
  background-color: transparent;
  color: transparent;
  horiz-align: center;
  margin-left: 15px;
  text-align: left;
}

.iot_organization {
  float: right;
  width: 360px;
  height: 26px;
  padding-right: 10px;
  line-height: 50px;
}

.iot_user {
  float: right;
  padding-right: 10px;
  line-height: 50px;
}
.iot_avatar {
  margin-right: 8px;
}
</style>
