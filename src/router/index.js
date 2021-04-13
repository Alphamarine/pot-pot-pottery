import Vue from "vue";
import VueRouter from "vue-router";
import Product from "../components/products/Product.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "home",
  },
  { 
    path: "/:uid",
    name: "product",
    component: Product,
    props: true,
  },
];

// function scrollBehavior(to, from, savedPosition) {
//   return savedPosition
// }

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  // scrollBehavior
});

export default router;
