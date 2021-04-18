<template>
  <div>
    <div class="main">
      <the-navigation v-show="$route.name !== 'product'"></the-navigation>
      <router-view></router-view>
      <the-footer></the-footer>
    </div>
    <transition name="scroll">
      <router-view name="product" v-if="products.length"></router-view>
    </transition>
  </div>
</template>

<script>
import TheNavigation from "./components/TheNavigation";
import TheFooter from "./components/TheFooter";
import { mapState, mapActions } from "vuex";

export default {
  components: { TheNavigation, TheFooter },
  computed: {
    ...mapState(["products"]),
  },
  methods: {
    ...mapActions(["setProducts", "updateScroll", "navigate"]),
    async getContent() {
      const products = await this.$prismic.client.query(
        this.$prismic.Predicates.at("document.type", "product"),
        {
          orderings: "[document.last_publication_date]",
        },
      );
      this.setProducts(products.results.reverse());
    },
  },
  watch: {
    $route() {
      this.navigate();
    },
  },
  created() {
    this.getContent();
  },
  mounted() {
    document.addEventListener("scroll", this.updateScroll);
  },
  destroyed() {
    document.removeEventListener("scroll", this.updateScroll);
  },
};
</script>

<style lang="scss">
@import "./assets/styles/reset.scss";
@import "./assets/styles/main.scss";

.main {
  position: relative;
  left: 0;
  right: 0;
}

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
