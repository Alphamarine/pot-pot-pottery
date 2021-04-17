<template>
  <div id="app">
    <div id="home">
      <the-header :header="home"></the-header>
      <the-products :products="products" @lock-home="lockHome"></the-products>
      <the-footer :footer="home"></the-footer>
    </div>
    <transition name="scroll">
      <router-view
        v-if="currentRoute === 'product' && products.length"
        :products="products"
        @hide-product="hideProduct"
      ></router-view>
    </transition>
  </div>
</template>

<script>
import TheHeader from "./components/home/TheHeader";
import TheProducts from "./components/home/TheProducts";
import TheFooter from "./components/home/TheFooter";

export default {
  components: { TheHeader, TheProducts, TheFooter },
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
      scrollY: 0,
      currentRoute: this.$route.name,
    };
  },
  computed: {
    top() {
      return `-${this.scrollY}px`;
    },
  },
  watch: {
    $route(to, from) {
      this.currentRoute = to.name;
    },
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
    updateScroll() {
      if (this.currentRoute === "home") {
        setTimeout(() => {
          this.scrollY = window.scrollY;
        }, 500);
      }
    },
    lockHome() {
      const home = document.querySelector("#home");
      home.style.position = "fixed";
      home.style.top = this.top;
      home.style.pointerEvents = "none";
    },
    unlockHome() {
      const home = document.querySelector("#home");
      const productContainer = document.querySelector("#product__container");
      home.style.position = "relative";
      home.style.top = 0;
      home.style.pointerEvents = "auto";
      productContainer.style.display = "none";
      window.scrollTo(0, this.scrollY);
    },
    hideProduct(payload) {
      this.$router.push({ name: "home" });
      if (payload === "scrolling") {
        this.unlockHome();
      } else {
        setTimeout(this.unlockHome, 500);
      }
    },
  },
  created() {
    this.getContent();
  },
  mounted() {
    document.addEventListener("scroll", this.updateScroll);
    if (this.currentRoute === "product") {
      this.lockHome();
    }
  },
  destroyed() {
    document.removeEventListener("scroll", this.updateScroll);
  },
};
</script>

<style lang="scss">
@import url("./assets/styles/reset.scss");
@import url("./assets/styles/main.scss");

#home {
  position: relative;
  right: 0;
  left: 0;
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
