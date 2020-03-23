<template>
  <a-layout style="background: #fff;padding: 10px 10px;height: 300px">
    <div style="text-align: left">
      <p style="font-weight: bold;font-size: 14px;margin-bottom: 5px">
        网关分布图
      </p>
    </div>
    <div class="iot_amap_gatewayMap_container">
      <el-amap
        vid="index_map"
        :center="center"
        :map-manager="amapManager"
        :zoom="zoom"
        :events="events"
        class="iot_amap_gateawyMap_demo"
      >
      </el-amap>
    </div>
  </a-layout>
</template>

<script>
let amapManager = new VueAMap.AMapManager();
export default {
  data() {
    return {
      zoom: 14,
      center: [114.362272, 30.532565],
      amapManager,
      events: {
        init(map) {
          //map.setMapStyle("amap://styles/whitesmoke");
          AMapUI.loadUI(["overlay/SimpleMarker"], function(SimpleMarker) {
            const marker = new SimpleMarker({
              iconLabel: "A",
              iconStyle: "blue",
              map: map,
              position: map.getCenter()
            });
            map.add(marker);
          });
        }
      }
    };
  }
};
</script>

<style>
.iot_amap_gatewayMap_container {
  height: 250px;
  width: 100%;
}
.iot_amap_gateawyMap_demo {
  height: 250px;
}
</style>
