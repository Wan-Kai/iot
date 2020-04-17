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
      let networkServer_options = [];
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
        networkServer_options.push(temp);
      }
      return networkServer_options;
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

    getServiceOptions(networkServerID) {
      let service_options = [];
      let servicesList = util.state.service_list;
      for (let i = 0; i < servicesList.length; i++) {
        if (servicesList[i].networkServerID === networkServerID) {
          let temp = {
            networkServerID: servicesList[i].networkServerID,
            id: servicesList[i].id,
            name: servicesList[i].name
          };
          service_options.push(temp);
        }
      }
      return service_options;
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
