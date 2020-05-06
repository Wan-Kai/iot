<template>
  <div style="background: #fff;height: 400px;padding: 10px 10px">
    <a-row>
      <a-col :span="12">
        <div style="float: left">
          <span style="font-size: 14px;font-weight: bold">最新消息</span>
        </div>
      </a-col>
      <a-col :span="12">
        <div style="float: right">
          <a-button size="small" type="primary"
            >未读（ {{ message }} ）</a-button
          >
        </div>
      </a-col>
    </a-row>
    <a-divider style="margin: 8px 0" />
    <a-list itemLayout="horizontal" :dataSource="interData.list">
      <a-list-item slot="renderItem" slot-scope="item" style="text-align: left">
        <a-list-item-meta>
          <p
            slot="title"
            style="text-align: left"
            class="iot_components_index_massage_p"
          >
            {{ item.title }}
          </p>
          <p slot="description" class="iot_components_index_massage_p">
            {{ item.time }}
          </p>
          <img
            v-if="item.read"
            slot="avatar"
            src="../../assets/hint.png"
            style="width: 30px;height: 30px"
          />
          <img
            v-if="!item.read"
            slot="avatar"
            src="../../assets/nohint.png"
            style="width: 30px;height: 30px"
          />
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <div style="display: block">
      <a @click="checkMessage">查看更多消息...</a>
    </div>
  </div>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
export default {
  components: { ACol, ARow },
  data() {
    return {
      interData: [],
      message: 0
    };
  },
  beforeMount() {
    this.$api.index.message({}).then(res => {
      this.interData = res.data.result;

      this.interData.list.forEach(item => {
        if (!item.read) {
          this.message++;
        }
      });
    });
  },
  methods: {
    checkMessage() {
      this.$router.push("/admin/dashboard/message");
    }
    // showMessage(){
    //   this.$message.success("显示信息");
    // }
  }
};
</script>

<style>
.iot_view_index_table {
}
.iot_components_index_massage_p {
  text-align: left;
  margin-bottom: 0;
}
.ant-list-item {
  padding: 2px 0;
}
.ant-list-item-meta-avatar {
  margin: auto 10px;
}
</style>
