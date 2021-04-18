<template>
  <div class="main__content">
    <the-header v-if="mainRoute === 'home'"></the-header>
    <products :products="products" @lock-main="lockMain"></products>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader";
import Products from "../components/Products";

export default {
  components: { TheHeader, Products },
  props: {
    products: Array,
  },
  data() {
    return {
      mainRoute: this.$route.name,
    };
  },
  watch: {
    $route(to, from) {
      if (to.name !== "product") {
        this.mainRoute = to.name;
      }
    },
  },
  methods: {
    lockMain() {
      this.$emit("lock-main");
    },
  },
};
</script>

<style lang="scss"></style>
