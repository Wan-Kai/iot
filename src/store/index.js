import Vue from "vue";
import Vuex from "vuex";
import login from "./login";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login
  },
  mutations: {},
  actions: {},
  modules: {
    login
  },
  getters: {
    getAttr: state => key => {
      if (!state[key]) state[key] = JSON.parse(localStorage.getItem(key));
      return state[key];
    }
  }
});
