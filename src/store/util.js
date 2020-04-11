const state = {
  mock: false,
  netServer: [],
  timeInterval: "" //最后心跳时间与现在时间相比大于此时间值t，既认为是离线
};

const getters = {};

const actions = {};

const mutations = {
  setNetServer(state, data) {
    //设置参数
    state.netServer = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
