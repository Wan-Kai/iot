const state = {
  mock: false,
  netServer: [],
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
  organizationData: [],
  timeInterval: "", //最后心跳时间与现在时间相比大于此时间值t，既认为是离线
  organizationID: "1"
};

const getters = {};

const actions = {};

const mutations = {
  setNetServer(state, data) {
    //设置参数
    state.netServer = data;
  },
  setArea(state, data) {
    //设置参数
    state.area_options = data;
  },
  setOrganization(state, data) {
    //设置参数
    state.organizationData = data;
  },

  setService(state, data) {
    state.service_list = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
