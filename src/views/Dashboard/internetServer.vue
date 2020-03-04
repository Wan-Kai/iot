<template>
  <div>
    <div class="iot_view_internetServer_top">
      <a-input-search
        class="iot_view_internetServer_top_search"
        placeholder="请输入要查找的内容"
        style="width: 200px"
      />
      <a-button
        class="iot_view_internetServer_top_add"
        type="primary"
        icon="plus"
        @click="handleSubmit"
      >
        添加服务器
      </a-button>
    </div>
    <div class="iot_view_internetServer_table_layout">
      <a-table
        :columns="columns"
        :dataSource="interData"
        style="min-width: auto"
        class="iot_view_internetServer_table"
      >
        //style="min-width: min-content" :scroll="{ x: min-content, y:
        min-content }"
        <span slot="tags" slot-scope="tags">
          <a-tag :color="tags === 'on' ? 'green' : 'red'" :key="tags">
            {{ tags.toUpperCase() }}
          </a-tag>
        </span>
        <span slot="time"> 创建时间</span>
        <span slot="action">
          <a href="javascript:;">查看</a>
          <a-divider type="vertical" />
          <a href="javascript:;">编辑</a>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: "主机名",
    dataIndex: "ID",
    key: "ID"
  },
  {
    title: "端口",
    dataIndex: "port",
    key: "port"
  },
  {
    title: "网关发现",
    dataIndex: "gateway",
    key: "gateway",
    scopedSlots: { customRender: "tags" }
  },
  {
    title: "创建时间",
    key: "time",
    dataIndex: "time"
  },
  {
    title: "管理",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  data() {
    return {
      columns,
      interData: []
    };
  },
  beforeMount() {
    this.$api.interServer
      .getServerData({
        page: 0
      })
      .then(res => {
        this.interData = res.data.serverData;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    handleSubmit() {
      setTimeout(() => {
        this.$router.replace(
          "/admin/dashboard/internetServer/addInternetServer"
        );
      }, 800);
    }
  }
};
</script>

<style scoped>
.iot_view_internetServer_top_search {
  float: left;
}
.iot_view_internetServer_top_add {
  float: right;
}
.iot_view_internetServer_top {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 30px;
}
.iot_view_internetServer_top_button_text {
  color: white;
}
.iot_view_internetServer_table_layout {
}
.iot_view_internetServer_table {
  font-size: 10px;
}
</style>
