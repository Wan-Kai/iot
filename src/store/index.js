import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import retrieve from "./modules/retrieve";
import parameter from "./modules/parameter";
import options from "./modules/options";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    retrieve,
    parameter,
    options
  },
  getters: {}
});
