const state = {
  state: {
    isMock: false,
    organizationID: "1",
    timeInterval: "" //最后心跳时间与现在时间相比大于此时间值t，既认为是离线
  }
};

const getters = {
  getIsMock: () => state.isMock,

  //organizationID
  getOrganizationID: () => state.organizationID
};

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
