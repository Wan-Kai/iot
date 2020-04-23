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
  /*
   getIsLogin: () => state.all.isLogin,
    getLoginState: () => state.all,
   */
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
    //debugger
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
