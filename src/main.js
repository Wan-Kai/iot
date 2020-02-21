import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import API from "./utils/api";

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
  Dropdown
} from "ant-design-vue";

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
Vue.prototype.$api = API;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
