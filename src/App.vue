<template>
  <div id="app">
    <div id="home">
      <the-header></the-header>
      <the-products @show-product="showProduct"></the-products>
    </div>
    <transition name="scroll" mode="out-in">
      <router-view
        v-if="currentRoute === 'product'"
        @hide-product="hideProduct"
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
      scrollY: 0,
      currentRoute: this.$route.name,
      // productIsShown: false,
    };
  },
  watch: {
    $route(to, from) {
      this.currentRoute = to.name;
    },
  },
  computed: {
    top() {
      return `-${this.scrollY}px`;
    },
  },
  methods: {
    hideProduct() {
      setTimeout(() => {
        // this.productIsShown = false;
        const home = document.querySelector("#home");
        home.style.position = "";
        home.style.top = "";
        window.scrollTo(0, this.scrollY);
      }, 500);
    },
    showProduct() {
      // this.productIsShown = true;
      const home = document.querySelector("#home");
      home.style.position = "fixed";
      home.style.top = this.top;
    },
    updateScroll() {
      if (this.currentRoute === "home") {
        this.scrollY = window.scrollY;
      }
    },
  },
  mounted() {
    document.addEventListener("scroll", this.updateScroll);
    if (this.currentRoute === "product") {
      this.showProduct();
    }
  },
  destroyed() {
    document.removeEventListener("scroll", this.updateScroll);
  },
};
</script>

<style>
@import url("./assets/styles/reset.css");
@import url("./assets/styles/variables.css");
@import url("./assets/styles/main.css");

#home {
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
