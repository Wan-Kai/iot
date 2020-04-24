import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import retrieve from "./modules/retrieve";
import parameter from "./modules/parameter";
import options from "./modules/options";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    retrieve,
    parameter,
    options
  },
  getters: {
    getSessionkey() {
      return login.state.all.sessionKey;
    },

    getAttr(key) {
      if (login.state.all[key]) {
        return login.state.all[key];
      }
      return "未定义";
    },
    getIsLogin: () => login.state.all.isLogin,
    getLoginState: () => login.state.all,

    getOrganizations() {
      return options.state.organization_list;
    },

    getOrganizationOptions() {
      let organization_options = [];
      let organization = options.state.organization_list;

      for (let i = 0; i < organization.length; i++) {
        let temp = {
          value: "",
          label: "",
          id: ""
        };
        temp.label = organization[i].name;
        temp.value = organization[i].id;
        temp.id = organization[i].id;
        organization_options.push(temp);
      }
      return organization_options;
    },

    getNetworkServers() {
      return options.state.networkServer_list;
    },

    //networkServer
    getNetworkServerOptions() {
      //debugger;
      let networkServer_options = [];
      let netServer = options.state.networkServer_list;

      for (let i = 0; i < netServer.length; i++) {
        let temp = {
          value: "",
          label: "",
          id: ""
        };
        temp.label = netServer[i].name + "@" + netServer[i].server;
        temp.value = netServer[i].server;
        temp.id = netServer[i].id;
        networkServer_options.push(temp);
      }
      return networkServer_options;
    },

    getServices() {
      return options.state.service_list;
    },

    getServiceOptions() {
      let service_options = [];
      let servicesList = options.state.service_list;
      let networkServerList = options.state.networkServer_list;
      for (let i = 0; i < servicesList.length; i++) {
        for (let j = 0; j < networkServerList.length; j++) {
          if (servicesList[i].networkServerID === networkServerList[j].id) {
            let temp = {
              label: servicesList[i].name + "@" + networkServerList[j].name,
              name: servicesList[i].name,
              value: servicesList[i].id
            };
            service_options.push(temp);
            break;
          }
        }
      }
      return service_options;
    },
    //CommunicationMode
    getCommunicationMode_options() {
      return options.state.communicationMode_options;
    },
    //band_options
    getBand_options() {
      return options.state.band_options;
    },

    //areaData
    getArea() {
      return options.state.area_options;
    },

    getProfessionOptions() {
      return options.state.profession_options;
    },
    getIsMock: () => parameter.state.isMock,

    getPhoneNumber: () => retrieve.state.step1.phoneNumber,

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
