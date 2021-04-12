<template>
  <div id="app">
    <the-header></the-header>
    <the-products
      :products="products"
      @show-product="showProduct()"
    ></the-products>
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from "./components/home/TheHeader";
import TheProducts from "./components/home/TheProducts";

export default {
  components: { TheHeader, TheProducts },
  data() {
    return {
      products: [],
      productIsShown: false,
    };
  },
  methods: {
    async getContent() {
      const products = await this.$prismic.client.query(
        this.$prismic.Predicates.at("document.type", "product"),
        {
          orderings: "[document.last_publication_date]",
        },
      );
      this.products = products.results.reverse();
    },
    showProduct() {
      this.productIsShown = true;
    },
  },
  created() {
    this.getContent();
  },
};
</script>

<style>
@import url("./assets/styles/reset.css");
@import url("./assets/styles/variables.css");
@import url("./assets/styles/main.css");
</style>
