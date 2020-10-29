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
    var result = state.sessionKey;
    if (result == null || result == "") {
      result = sessionStorage.getItem("current_session");
    }
    return result;
    /*
    if (sessionStorage.getItem("current_session")) {
      return sessionStorage.getItem("current_session");
    } else return state.sessionKey;
    */
  },

  getCurrentUser() {
    /*
    debugger
    if (sessionStorage.getItem("current_user")) {
      return JSON.parse(sessionStorage.getItem("current_user"));
    } else return state.currentUser;
    */
    var result = state.currentUser;
    if (result == null || result.id == "") {
      result = JSON.parse(sessionStorage.getItem("current_user"));
    }
    return result;
  },

  getCurrentOrganization() {
    //debugger;
    var result = state.currentOrganization;
    if (result == null || result.organizationID == "") {
      var temp = sessionStorage.getItem("current_organization");
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
      var temp = sessionStorage.getItem("current_organization_list");
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
    const changedTimes = sessionStorage.getItem(
      "current_organization_list_changedTimes"
    );
    if (changedTimes) return changedTimes;
    else return 0;
  }
};

// actions
const actions = {};

export function getRole() {
  if (sessionStorage.getItem("current_login")) {
    var item = JSON.parse(sessionStorage.getItem("current_login"));
    return item.role;
  }
  return state.login.role;
}

export function getLoginState() {
  if (sessionStorage.getItem("current_login")) {
    var item = JSON.parse(sessionStorage.getItem("current_login"));
    return item.isLogin;
  }
  return state.login.isLogin;
}

// mutations
const mutations = {
  setLogin(state, login) {
    state.login = login;
    sessionStorage.setItem("current_login", JSON.stringify(state.login));
  },

  setSessionKey(state, sessionKey) {
    //debugger;
    state.sessionKey = sessionKey;
    sessionStorage.setItem("current_session", state.sessionKey);
  },

  setCurrentUser(state, user) {
    //设置参数
    //debugger;
    state.currentUser = user;

    state.login.isLogin = true;
    if (user.isAdmin) {
      state.login.role = "admin";
    }
    debugger;
    sessionStorage.setItem("current_user", JSON.stringify(state.currentUser));
    sessionStorage.setItem("current_login", JSON.stringify(state.login));
  },

  setCurrentOrganization(state, organization) {
    state.currentOrganization = organization;
    sessionStorage.setItem(
      "current_organization",
      JSON.stringify(organization)
    );
  },

  setCurrentOrganizationList(state, organizations) {
    state.currentOrganizationList = organizations;
    sessionStorage.setItem(
      "current_organization_list",
      JSON.stringify(state.currentOrganizationList)
    );

    var changedTimes = state.current_organization_list_changedTimes;
    if (changedTimes && changedTimes >= 0) {
      changedTimes = Number(changedTimes) + 1;
      state.current_organization_list_changedTimes = changedTimes;
      sessionStorage.setItem(
        "current_organization_list_changedTimes",
        changedTimes
      );
    } else {
      var x = sessionStorage.getItem("current_organization_list_changedTimes");
      if (x == null) {
        state.current_organization_list_changedTimes = 1;
        sessionStorage.setItem("current_organization_list_changedTimes", "1");
      } else {
        x = Number(x) + 1;
        state.current_organization_list_changedTimes = x;
        sessionStorage.setItem("current_organization_list_changedTimes", x);
      }
    }

    if (organizations == null || organizations.length <= 0) {
      state.currentOrganization = {
        organizationID: "",
        organizationName: ""
      };
      sessionStorage.setItem("current_organization", null);
    } else {
      //第一次需要初始化
      if (
        state.currentOrganization == null ||
        state.currentOrganization.organizationID === "" ||
        state.currentOrganization.organizationID === null
      ) {
        state.currentOrganization = organizations[0];
        sessionStorage.setItem(
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

    sessionStorage.setItem("current_login", JSON.stringify(state.login));
    sessionStorage.setItem("current_session", "");
    sessionStorage.setItem("current_user", "");
    sessionStorage.setItem("current_organization", "");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
