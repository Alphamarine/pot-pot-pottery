import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    scrollY: 0,
  },
  getters: {
    top(state) {
      return `-${state.scrollY}px`;
    },
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    updateScroll(state) {
      state.scrollY = window.scrollY;
    },
    lockView(state, { selector, getters }) {
      const view = document.querySelector(selector);
      view.style.position = "fixed";
      view.style.top = getters.top;
      view.style.pointerEvents = "none";
    },
    unlockView(state, { selector1, selector2 }) {
      const view = document.querySelector(selector1);
      const overlay = document.querySelector(selector2);
      overlay.style.display = "none";
      view.style.position = "relative";
      view.style.top = 0;
      view.style.pointerEvents = "auto";
      window.scrollTo(0, state.scrollY);
    },
  },
  actions: {
    setProducts(context, products) {
      context.commit("setProducts", products);
    },
    updateScroll(context) {
      if (router.currentRoute.name !== "product") {
        setTimeout(() => {
          context.commit("updateScroll");
        }, 500);
      }
    },
    lockView({ commit, getters }, { selector }) {
      commit("lockView", { selector, getters });
    },
    unlockView(context, { selector1, selector2 }) {
      context.commit("unlockView", { selector1, selector2 });
    },
  },
  modules: {},
});
