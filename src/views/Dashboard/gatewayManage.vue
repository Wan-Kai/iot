<template>
  <div>
    <div>
      <a-tabs
        defaultActiveKey="1"
        @change="callback"
        size="small"
        style="text-align: left"
      >
        <a-tab-pane tab="网关列表" key="1">
          <gatewayList />
        </a-tab-pane>
        <a-tab-pane tab="网关分布图" key="2">
          暂定
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import gatewayList from "./gatewayList";
export default {
  data() {
    return {};
  },
  components: {
    gatewayList
  },
  methods: {
    callback(key) {
      console.log(key);
    }
  }
};
</script>

<style scoped></style>
