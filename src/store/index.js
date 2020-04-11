import Vue from "vue";
import Vuex from "vuex";
import login from "./login";
import retrieve from "./retrieve";
import util from "./util";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMock: false
  },
  mutations: {},
  actions: {},
  modules: {
    login,
    retrieve,
    util
  },
  getters: {
    // getAttr: state => key => {
    //   if (!state[key]) state[key] = JSON.parse(localStorage.getItem(key));
    //   return state.login.all[key];
    // },
    getAttr(key) {
      if (login.state.all[key]) {
        return login.state.all[key];
      }
      return "未定义";
    },
    getIsMock: () => util.state.mock,
    getIsLogin: () => login.state.all.isLogin,
    getSessionkey: () => login.state.all.sessionKey,

    //netServer
    getNetServer: () => util.state.netServer,

    //areaData
    getArea: () => util.state.area_options,

    //register
    getPhoneNumber: () => retrieve.state.step1.phoneNumber,
    getLoginState: () => login.state.all,
    getRetrieveNote: () => retrieve.state.step1.note,
    getNewPassword: () => retrieve.state.step2.newPassword,
    getStep2State() {
      if (retrieve.state.step2.oldPassword["oldPassword"]) {
        if (
          retrieve.state.step2.newPassword["newPassword"] ===
          retrieve.state.step2.confirmPassword["confirmPassword"]
        ) {
          if (retrieve.state.step2.newPassword["newPassword"]) {
            return true;
          }
        }
      }
      return false;
    }
  }
});
