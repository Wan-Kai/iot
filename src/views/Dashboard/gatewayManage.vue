<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div>
      <a-tabs
        defaultActiveKey="1"
        @change="callback"
        size="small"
        style="text-align: left"
      >
        <a-tab-pane tab="网关列表" key="1" style="height: 100%">
          <gatewayList />
        </a-tab-pane>
        <a-tab-pane tab="网关分布图" key="2" style="height: 100%">
          <gateawayMap />
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-layout>
</template>

<script>
import gatewayList from "./gatewayListBoard/gatewayList";
import gateawayMap from "./gatewayListBoard/gatewayMap";
export default {
  data() {
    return {};
  },
  components: {
    gatewayList,
    gateawayMap
  },
  methods: {
    callback(key) {
      console.log(key);
    }
  }
};
</script>

<style scoped></style>
