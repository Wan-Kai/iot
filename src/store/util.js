const state = {
  mock: false,
  netServer: []
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
