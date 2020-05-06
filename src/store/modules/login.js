/**
 *  存放用户数据
 * **/
// initial state
const state = {
  /*
  all: {
    username: "",
    userId: "",
    isLogin: "",
    sessionKey: ""
  },
  */

  login: {
    isLogin: "0",
    role: "guest"
  },
  sessionKey: "",

  currentUser: {
    id: "",
    username: "",
    sessionTTL: 0,
    isAdmin: false,
    isActive: false,
    email: "",
    note: ""
  },

  currentOrganizations: []
};

// getters
const getters = {
  getSessionKey() {
    return state.sessionKey;
  },

  getCurrentUser() {
    return state.currentUser;
  },

  getCurrentOrganizations() {
    return state.currentOrganizations;
  }
};

// actions
const actions = {};

export function getRole() {
  return state.login.role;
}

export function getLoginState() {
  return state.login.isLogin;
}

// mutations
const mutations = {
  setLogin(state, login) {
    state.login = login;
  },

  setSessionKey(state, sessionKey) {
    //debugger;
    state.sessionKey = sessionKey;
  },

  setCurrentUser(state, user) {
    //设置参数
    //debugger;
    state.currentUser = user;

    state.login.isLogin = true;
    if (user.isAdmin) {
      state.login.role = "admin";
    }
  },

  setCurrentOrganizations(state, organizations) {
    state.currentOrganizations = organizations;
  },

  reset(state) {
    state.login.isLogin = "0";
    state.login.role = "guest";

    state.sessionKey = "";

    state.currentUser = null;
    state.currentOrganizations = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
