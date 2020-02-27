/**
 *  存放用户数据
 * **/

// initial state
const state = {
  all: {
    username: "",
    isLogin: "out",
    userId: "guest",
    sessionKey: ""
  }
};

// getters
const getters = {};

// actions
const actions = {};

export function getUserId() {
  return state.all.userId;
}

// mutations
const mutations = {
  setUser(state, all) {
    //设置参数
    state.all = all;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
