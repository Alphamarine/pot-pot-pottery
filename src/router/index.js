import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js";
import Home from "../views/Home.vue";
import Products from "../views/Products.vue";
import Product from "../views/Product.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { navigation: true },
  },
  {
    path: "/products",
    name: "products",
    component: Products,
    meta: { navigation: true },
  },
  {
    path: "/products/:uid",
    name: "product",
    beforeEnter: (to, from, next) => {
      if (from.path === "/" && from.matched.length) {
        to.matched[0].components.default = Home;
      } else {
        to.matched[0].components.default = Products;
      }
      if (from.matched.length) {
        store.dispatch("lockView", { selector: ".main" });
      }
      next();
    },
    components: {
      default: Products,
      product: Product,
    },
    props: {
      product: true,
    },
  },
  // {
  //   path: "*",
  //   name: "catch",
  //   redirect: { name: "home" },
  // },
];

// function scrollBehavior(to, from, savedPosition) {
//   if (savedPosition && from.name !== "product") {
//     return savedPosition;
//   } else {
//     return { x: 0, y: 0 };
//   }
// }

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  // scrollBehavior,
});

export default router;
