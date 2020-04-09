<template>
  <a-layout style="background: #fff;padding: 10px 10px;height: 400px">
    <div style="text-align: left">
      <p style="font-weight: bold;font-size: 14px;margin-bottom: 5px">
        网关分布图
      </p>
    </div>
    <div class="iot_amap_gatewayMap_container">
      <!--      <el-amap-->
      <!--        vid="index_map"-->
      <!--        :center="center"-->
      <!--        :map-manager="amapManager"-->
      <!--        :zoom="zoom"-->
      <!--        :events="events"-->
      <!--        class="iot_amap_gateawyMap_demo"-->
      <!--      >-->
      <!--      </el-amap>-->
      <el-amap vid="indexMap"> </el-amap>
    </div>
  </a-layout>
</template>

<script>
import wifi_map from "../../assets/wifi.png";
export default {
  data() {
    return {
      mapData: []
    };
  },
  beforeMount() {
    this.$api.index
      .mapMarkers({})
      .then(res => {
        this.mapData = res.data.result;
        let mapObj = new AMap.Map("indexMap", {
          // eslint-disable-line no-unused-vars
          resizeEnable: true, //自适应大小
          zoom: this.mapData.zoom,
          center: this.mapData.center
        });
        let startIcon = new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(25, 25),
          // 图标的取图地址
          image: wifi_map, // 您自己的图标
          // 图标所用图片大小
          imageSize: new AMap.Size(25, 25)
        });
        this.mapData.markers.forEach(item => {
          const marker = new AMap.Marker({
            // eslint-disable-line no-unused-vars
            map: mapObj,
            icon: startIcon,
            position: new AMap.LngLat(item.X, item.Y), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: "网关"
          });
        });

        //自适应多个标记点
        let newCenter = mapObj.setFitView(); // eslint-disable-line no-unused-vars
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
.iot_amap_gatewayMap_container {
  height: 350px;
  width: 100%;
}
.iot_amap_gateawyMap_demo {
}
</style>
