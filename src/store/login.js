/**
 *  存放用户数据
 * **/

// initial state
const state = {
  all: {
    username: "",
    isLogin: "",
    userId: "",
    sessionKey: ""
  },
  isLogin: "0",
  key: "guest"
};

// getters
const getters = {};

// actions
const actions = {};

export function getKey() {
  return state.key;
}

export function getLoginState() {
  return state.isLogin;
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
