import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import API from "./utils/api";
import common from "./utils/common.js";
import Authorized from "./components/Authorized";
import VueAMap from "vue-amap";

// 引入过滤器
import "@/utils/filter";

// 引入 ECharts 主模块
let echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
// 按需引入
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/chart/line");
require("echarts/lib/component/legend");

Vue.component("chart", echarts);
import {
  Button,
  Layout,
  Menu,
  Table,
  Avatar,
  Icon,
  Divider,
  Switch,
  Tag,
  Dropdown,
  Form,
  Input,
  Checkbox,
  Card,
  message,
  Breadcrumb,
  Row,
  Col,
  Tabs,
  Steps,
  Pagination,
  Modal,
  Cascader,
  DatePicker,
  Tooltip,
  Select,
  Radio,
  Transfer,
  List,
  Upload
} from "ant-design-vue";

//设置中文
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

//需要开启mock数据时，在store/util.state.mock开启
// if (store.getters.getIsMock) {
//   require("./mock/mock");
// }
//暂时这样调试
require("./mock/mock");

Vue.use(Button);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Table);
Vue.use(Avatar);
Vue.use(Icon);
Vue.use(Divider);
Vue.use(Switch);
Vue.use(Tag);
Vue.use(Dropdown);
Vue.use(Form);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Card);
Vue.use(Breadcrumb);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tabs);
Vue.use(Steps);
Vue.use(Pagination);
Vue.use(Modal);
Vue.use(Cascader);
Vue.use(DatePicker);
Vue.use(Tooltip);
Vue.use(Select);
Vue.use(Radio);
Vue.use(Transfer);
Vue.use(List);
Vue.use(Upload);
Vue.component("Authorized", Authorized);
/**
 * 引用公用的api里面的方法，所有页面可调用
 */
Vue.prototype.$api = API;
Vue.prototype.$message = message;
Vue.prototype.$echarts = echarts;

/**
 * 引用公用的js方法，所有页面可调用
 */
Vue.prototype.common = common;

Vue.config.productionTip = false;

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: "abafdec30e675bce4bff374d9c458739",
  // 插件集合 （插件按需引入）
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor",
    "AMap.Geocoder"
  ],
  v: "1.4.4",
  uiVersion: "1.0.11" // 版本号
});

// const amapKeys = Object.keys(localStorage).filter(key => key.match(/^_AMap_/));
//
// amapKeys.forEach(key => {
//   // console.log(key)
//   localStorage.removeItem(key);
// });
Vue.use(VueAMap);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
