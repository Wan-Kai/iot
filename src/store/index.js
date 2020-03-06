import Vue from "vue";
import Vuex from "vuex";
import login from "./login";
import retrieve from "./retrieve";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    retrieve
  },
  getters: {
    getAttr: state => key => {
      if (!state[key]) state[key] = JSON.parse(localStorage.getItem(key));
      return state.login.all[key];
    },
    getPhoneNumber: () => retrieve.state.step1.phoneNumber,
    getLoginState: () => login.state.all,
    getRetrieveNote: () => retrieve.state.step1.note,
    getNewPassword: () => retrieve.state.step2.newPassword,
    getStep2State() {
      if (retrieve.state.step2.oldPassword["oldPassword"]) {
        if (
          retrieve.state.step2.newPassword["newPassword"] ===
          retrieve.state.step2.confirmPassword["confirmPassword"]
        ) {
          if (retrieve.state.step2.newPassword["newPassword"]) {
            return true;
          }
        }
      }
      return false;
    }
  }
});
