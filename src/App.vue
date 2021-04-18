<template>
  <div>
    <div class="main">
      <the-navigation v-show="$route.name !== 'product'"></the-navigation>
      <router-view></router-view>
      <the-footer
        v-if="Object.keys(footer).length"
        :footer="footer"
      ></the-footer>
    </div>
    <transition name="slide">
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
    ...mapState({ footer: "home", products: "products" }),
  },
  methods: {
    ...mapActions(["setData", "updateScroll", "navigate"]),
    async getContent() {
      const home = await this.$prismic.client.getSingle("home");
      const products = await this.$prismic.client.query(
        this.$prismic.Predicates.at("document.type", "product"),
        {
          orderings: "[document.last_publication_date]",
        },
      );
      this.setData({ home: home.data, products: products.results.reverse() });
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

.slide-enter {
  transform: translateY(100vh);
}

.slide-leave-to {
  transform: translateY(-100vh);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
</style>
