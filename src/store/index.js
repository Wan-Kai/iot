import Vue from "vue";
import Vuex from "vuex";
import login from "./login";
import retrieve from "./retrieve";
import util from "./util";
import data from "./data";

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
    util,
    data
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

    //util部分
    getIsMock: () => util.state.mock,
    getIsLogin: () => login.state.all.isLogin,
    getSessionkey: () => login.state.all.sessionKey,

    //页面相关
    //netServer
    getNetServer: () => util.state.netServer,
    //organizationID
    getOrganizationID: () => data.state.organizationID,
    //netServer
    getNetServerOption() {
      let internetServer_options = [];
      let netServer = util.state.netServer;
      let temp = {
        value: "",
        label: "",
        id: ""
      };
      for (let i = 0; i < netServer.length; i++) {
        temp.label = netServer[i].name + "@" + netServer[i].server;
        temp.value = netServer[i].server;
        temp.id = netServer[i].id;
        internetServer_options.push(temp);
      }
      return internetServer_options;
    },
    getNetServerById: () => id => {
      let netServer = util.state.netServer;
      console.log(netServer);
      for (let i = 0; i < netServer.length; i++) {
        if (netServer[i].id === id) {
          return netServer[i].server;
        }
      }
      return null;
    },
    //CommunicationMode
    getCommunicationMode: () => util.state.communicationMode_options,
    //band_options
    getBand_options: () => util.state.band_options,
    //areaData
    getArea: () => util.state.area_options,

    //注册相关
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
