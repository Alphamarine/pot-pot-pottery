<template>
  <div>
    <div class="main">
      <the-navigation></the-navigation>
      <router-view :products="products" @lock-main="lockMain"></router-view>
      <the-footer></the-footer>
    </div>
    <transition name="scroll">
      <router-view
        :products="products"
        @lock-main="lockMain"
        @hide-product="hideProduct"
        name="product"
        v-if="products.length"
      ></router-view>
    </transition>
  </div>
</template>

<script>
import TheNavigation from "./components/TheNavigation";
import TheFooter from "./components/TheFooter";

export default {
  components: { TheNavigation, TheFooter },
  data() {
    return {
      products: [],
      scrollY: 0,
      currentRoute: this.$route.name,
      previousRoute: "",
    };
  },
  watch: {
    $route(to, from) {
      this.currentRoute = to.name;
      this.previousRoute = from.name;
    },
  },
  computed: {
    top() {
      return `-${this.scrollY}px`;
    },
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
    updateScroll() {
      if (this.currentRoute !== "product") {
        setTimeout(() => {
          this.scrollY = window.scrollY;
        }, 500);
      }
    },
    lockMain() {
      const main = document.querySelector(".main");
      main.style.position = "fixed";
      main.style.top = this.top;
      main.style.pointerEvents = "none";
    },
    unlockMain() {
      const main = document.querySelector(".main");
      const productContainer = document.querySelector(".product__container");
      productContainer.style.display = "none";
      main.style.position = "relative";
      main.style.top = 0;
      main.style.pointerEvents = "auto";
      window.scrollTo(0, this.scrollY);
    },
    hideProduct(payload) {
      if (this.currentRoute === "product" && this.previousRoute === "") {
        this.$router.push({ name: "products" });
      } else {
        this.$router.go(-1);
      }
      if (payload === "scrolling") {
        this.unlockMain();
      } else {
        setTimeout(this.unlockMain, 500);
      }
    },
  },
  created() {
    this.getContent();
  },
  mounted() {
    document.addEventListener("scroll", this.updateScroll);
    // if (this.currentRoute === "product") {
    //   this.lockMain();
    // }
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
