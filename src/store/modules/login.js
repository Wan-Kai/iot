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
  login: {
    isLogin: "0",
    key: "guest"
  }
};

// getters
const getters = {
  getAttr(key) {
    if (state.all[key]) {
      return state.all[key];
    }
    return "未定义";
  },
  getIsLogin: () => state.all.isLogin,
  getSessionkey: () => state.all.sessionKey,
  getLoginState: () => state.all
};

// actions
const actions = {};

export function getKey() {
  return state.login.key;
}

export function getLoginState() {
  return state.login.isLogin;
}

// mutations
const mutations = {
  setUser(state, all) {
    //设置参数
    state.all = all;
  },
  setLogin(state, login) {
    state.login = login;
  },
  reset(state) {
    state.all.username = "";
    state.all.isLogin = "";
    state.all.userId = "";
    state.all.sessionKey = "";
    state.login.isLogin = "0";
    state.login.key = "guest";
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
