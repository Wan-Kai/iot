const state = {
  state: {
    organizationID: "1"
  }
};

const getters = {};

const actions = {};

const mutations = {
  setOrganizationID(state, data) {
    //设置参数
    state.organizationID = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
