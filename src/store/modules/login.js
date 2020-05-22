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

  currentOrganization: {
    organizationID: "",
    organizationName: ""
  }, //当前组织机构
  currentOrganizationList: [],

  current_organization_list_changedTimes: ""
};

// getters
const getters = {
  getSessionKey() {
    if (localStorage.getItem("current_session")) {
      return localStorage.getItem("current_session");
    } else return state.sessionKey;
  },

  getCurrentUser() {
    if (localStorage.getItem("current_user")) {
      return JSON.parse(localStorage.getItem("current_user"));
    } else return state.currentUser;
  },

  getCurrentOrganization() {
    //debugger;
    var result = state.currentOrganization;
    if (result == null || result.organizationID == "") {
      var temp = localStorage.getItem("current_organization");
      if (temp) {
        result = JSON.parse(temp);
      }
    }
    //debugger;
    return result;
  },
  getCurrentOrganizationList() {
    var result = state.currentOrganizationList;
    if (result == null || result.length === 0) {
      var temp = localStorage.getItem("current_organization_list");
      if (temp) {
        result = JSON.parse(temp);
      }
    }
    return result;
  },

  getCurrentOrganizationListChangedTimes() {
    //debugger;
    var result = state.current_organization_list_changedTimes;
    if (result && result >= 0) {
      return result;
    }
    const changedTimes = localStorage.getItem(
      "current_organization_list_changedTimes"
    );
    if (changedTimes) return changedTimes;
    else return 0;
  }
};

// actions
const actions = {};

export function getRole() {
  if (localStorage.getItem("current_login")) {
    var item = JSON.parse(localStorage.getItem("current_login"));
    return item.role;
  }
  return state.login.role;
}

export function getLoginState() {
  if (localStorage.getItem("current_login")) {
    var item = JSON.parse(localStorage.getItem("current_login"));
    return item.isLogin;
  }
  return state.login.isLogin;
}

// mutations
const mutations = {
  setLogin(state, login) {
    state.login = login;
    localStorage.setItem("current_login", JSON.stringify(state.login));
  },

  setSessionKey(state, sessionKey) {
    //debugger;
    state.sessionKey = sessionKey;
    localStorage.setItem("current_session", state.sessionKey);
  },

  setCurrentUser(state, user) {
    //设置参数
    //debugger;
    state.currentUser = user;

    state.login.isLogin = true;
    if (user.isAdmin) {
      state.login.role = "admin";
    }

    localStorage.setItem("current_user", JSON.stringify(state.currentUser));
    localStorage.setItem("current_login", JSON.stringify(state.login));
  },

  setCurrentOrganization(state, organization) {
    state.currentOrganization = organization;
    localStorage.setItem("current_organization", JSON.stringify(organization));
  },

  setCurrentOrganizationList(state, organizations) {
    state.currentOrganizationList = organizations;
    localStorage.setItem(
      "current_organization_list",
      JSON.stringify(state.currentOrganizationList)
    );

    var changedTimes = state.current_organization_list_changedTimes;
    if (changedTimes && changedTimes >= 0) {
      changedTimes = Number(changedTimes) + 1;
      state.current_organization_list_changedTimes = changedTimes;
      localStorage.setItem(
        "current_organization_list_changedTimes",
        changedTimes
      );
    } else {
      var x = localStorage.getItem("current_organization_list_changedTimes");
      if (x == null) {
        state.current_organization_list_changedTimes = 1;
        localStorage.setItem("current_organization_list_changedTimes", "1");
      } else {
        x = Number(x) + 1;
        state.current_organization_list_changedTimes = x;
        localStorage.setItem("current_organization_list_changedTimes", x);
      }
    }

    if (organizations == null || organizations.length <= 0) {
      state.currentOrganization = {
        organizationID: "",
        organizationName: ""
      };
      localStorage.setItem("current_organization", null);
    } else {
      //第一次需要初始化
      if (
        state.currentOrganization == null ||
        state.currentOrganization.organizationID === "" ||
        state.currentOrganization.organizationID === null
      ) {
        state.currentOrganization = organizations[0];
        localStorage.setItem(
          "current_organization",
          JSON.stringify(organizations[0])
        );
      }
    }
  },

  reset(state) {
    state.login.isLogin = "0";
    state.login.role = "guest";

    state.sessionKey = "";

    state.currentUser = null;
    (state.currentOrganization = {}), (state.currentOrganizationList = []);

    localStorage.setItem("current_login", JSON.stringify(state.login));
    localStorage.setItem("current_session", "");
    localStorage.setItem("current_user", "");
    localStorage.setItem("current_organization", "");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
