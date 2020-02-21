<template>
  <a-table
    :columns="columns"
    :dataSource="interData"
    style="min-width: auto"
    class="table"
  >
    //style="min-width: min-content" :scroll="{ x: min-content, y: min-content
    }"
    <span slot="tags" slot-scope="tags">
      <a-tag :color="tags === 'on' ? 'green' : 'red'" :key="tags">
        {{ tags.toUpperCase() }}
      </a-tag>
    </span>
    <span slot="time"> 创建时间</span>
    <span slot="action">
      <a href="javascript:;">Alter</a>
      <a-divider type="vertical" />
      <a href="javascript:;">Delete</a>
    </span>
  </a-table>
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
  }
};
</script>

<style scoped>
.table {
  font-size: 10px;
}
</style>
