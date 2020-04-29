const state = {
  organization_list: [],
  networkServer_list: [],
  service_list: [],

  area_options: [],
  communicationMode_options: [
    {
      value: "LORA",
      label: "LORA"
    },
    {
      value: "FSK",
      label: "FSK"
    }
  ],
  band_options: [
    {
      value: "1",
      label: "1"
    },
    {
      value: "2",
      label: "2"
    },
    {
      value: "3",
      label: "3"
    },
    {
      value: "4",
      label: "4"
    },
    {
      value: "5",
      label: "5"
    },
    {
      value: "6",
      label: "6"
    },
    {
      value: "7",
      label: "7"
    },
    {
      value: "8",
      label: "8"
    }
  ],

  deviceProfileService_options: [],
  profession_options: [
    {
      value: "航天",
      label: "航天"
    },
    {
      value: "消防",
      label: "消防"
    },
    {
      value: "金融",
      label: "金融"
    },
    {
      value: "路政",
      label: "路政"
    }
  ]
};

const getters = {
  getOrganizationOptions() {
    let organization_options = [];
    let organization = state.organization_list;

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

  getOrganizations() {
    return state.organization_list;
  },

  getDeviceProfileService_options() {
    return state.deviceProfileService_options;
  },

  getNetworkServerOptions() {
    let networkServer_options = [];
    let netServer = state.networkServer_list;

    for (let i = 0; i < netServer.length; i++) {
      let temp = {
        value: "",
        label: "",
        id: ""
      };
      temp.label = netServer[i].name + "@" + netServer[i].server;
      temp.value = netServer[i].id;
      temp.id = netServer[i].id;
      networkServer_options.push(temp);
    }
    return networkServer_options;
  },

  getNetworkServers() {
    return state.networkServer_list;
  },

  getArea() {
    return state.area_options;
  },

  getServiceOptions() {
    let service_options = [];
    let servicesList = state.service_list;
    let networkServerList = state.networkServer_list;
    for (let i = 0; i < servicesList.length; i++) {
      for (let j = 0; j < networkServerList.length; j++) {
        if (servicesList[i].networkServerID === networkServerList[j].id) {
          let temp = {
            label: servicesList[i].name + "@" + networkServerList[j].name,
            name: servicesList[i].name,
            value: servicesList[i].id,
            id: servicesList[i].id
          };
          service_options.push(temp);
          break;
        }
      }
    }
    return service_options;
  },

  getProfessionOptions() {
    return state.profession_options;
  },

  getCommunicationMode_options() {
    return state.communicationMode_options;
  },

  //band_options
  getBand_options() {
    return state.band_options;
  }
};

const actions = {};

const mutations = {
  setArea(state, data) {
    //设置参数
    state.area_options = data;
  },
  setOrganizations(state, data) {
    //设置参数
    state.organization_list = data;
  },
  setNetworkServers(state, data) {
    //设置参数
    state.networkServer_list = data;
  },
  setServices(state, data) {
    state.service_list = data;
  },
  setDeviceProfileService_options(state, data) {
    state.deviceProfileService_options = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
