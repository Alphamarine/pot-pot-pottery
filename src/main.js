import Vue from "vue";
import PrismicVue from "@prismicio/vue";
import linkResolver from "./prismic/link-resolver";
import htmlSerializer from "./prismic/html-serializer";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(PrismicVue, {
  endpoint: "https://potpotpottery.cdn.prismic.io/api/v2",
  linkResolver,
  htmlSerializer,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
