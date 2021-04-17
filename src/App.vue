<template>
  <div>
    <the-navigation></the-navigation>
    <router-view :products="products"></router-view>
    <the-footer :footer="home"></the-footer>
    <transition name="scroll">
      <router-view
        v-if="currentRoute === 'product' && products.length"
        :products="products"
        name="product"
      ></router-view>
    </transition>
  </div>
</template>

<script>
import TheNavigation from "./components/navigation/TheNavigation";
import TheHeader from "./components/home/TheHeader";
import TheProducts from "./components/home/TheProducts";
import TheFooter from "./components/home/TheFooter";

export default {
  components: { TheNavigation, TheHeader, TheProducts, TheFooter },
  data() {
    return {
      home: {
        title: [],
        description: [],
        image: {},
        instagram: {},
        facebook: {},
      },
      products: [],
      
      currentRoute: this.$route.name,
    };
  },
  methods: {
    async getContent() {
      const home = await this.$prismic.client.getSingle("home");
      this.home = home.data;

      const products = await this.$prismic.client.query(
        this.$prismic.Predicates.at("document.type", "product"),
        {
          orderings: "[document.last_publication_date]",
        },
      );
      this.products = products.results.reverse();
    },
    
  },
  created() {
    this.getContent();
  },
  
};
</script>

<style lang="scss">
@import "./assets/styles/reset.scss";
@import "./assets/styles/main.scss";

.scroll-enter {
  transform: translateY(100vh);
}

.scroll-leave-to {
  transform: translateY(-100vh);
}

.scroll-enter-active,
.scroll-leave-active {
  transition: all 0.5s;
}
</style>
