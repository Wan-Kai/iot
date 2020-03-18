<template>
  <div style="background: #fff;height: 300px;padding: 10px 10px">
    <a-row>
      <a-col :span="12">
        <div style="float: left">
          <span style="font-size: 14px;font-weight: bold">最新消息</span>
        </div>
      </a-col>
      <a-col :span="12">
        <div style="float: right">
          <a-button size="small" type="primary">未读（{{ massage }}）</a-button>
        </div>
      </a-col>
    </a-row>
    <a-divider style="margin: 8px 0" />
    <a-list itemLayout="horizontal" :dataSource="data">
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
            {{ item.title }}
          </p>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <div style="display: block">
      <a>查看更多消息...</a>
    </div>
  </div>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";

const data = [
  {
    title: "编号"
  },
  {
    title: "编号"
  },
  {
    title: "编号"
  },
  {
    title: "编号"
  }
];
export default {
  name: "activeNodeList",
  components: { ACol, ARow },
  data() {
    return {
      massage: 2,
      interData: [],
      data
    };
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
</style>
