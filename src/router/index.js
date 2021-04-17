import Vue from "vue";
import VueRouter from "vue-router";
import Product from "../components/product/Product.vue";
import Home from "../views/Home.vue";
import Products from "../views/Products.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/products",
    name: "products",
    component: Products,
    children: [
      {
        path: ":uid",
        name: "product",
        component: Product,
        props: true,
      },
    ],
  },
  {
    path: "*",
    name: "catch",
    redirect: { name: "home" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
