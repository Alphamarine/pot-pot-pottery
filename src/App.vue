<template>
  <div id="app">
    <the-header></the-header>
    <the-products
      :products="products"
      @show-product="toggleProduct()"
    ></the-products>
    <transition name="scroll">
      <router-view
        v-if="$route.name === 'Product'"
        :productIsShown="productIsShown"
        @hide-product="toggleProduct()"
      ></router-view>
    </transition>
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
    toggleProduct() {
      this.productIsShown = !this.productIsShown;
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

.scroll-enter,
.scroll-leave-to {
  transform: translateY(100px);
}

.scroll-enter-active,
.scroll-leave-active {
  transition: all 0.5s;
}
</style>
