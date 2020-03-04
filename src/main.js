import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import API from "./utils/api";
import Authorized from "./components/Authorized";

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
  Col
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
Vue.use(Form);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Card);
Vue.use(Breadcrumb);
Vue.use(Row);
Vue.use(Col);
Vue.component("Authorized", Authorized);
Vue.prototype.$api = API;
Vue.prototype.$message = message;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
