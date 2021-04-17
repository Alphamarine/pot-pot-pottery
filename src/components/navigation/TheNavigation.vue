<template>
  <nav class="navigation__items">
    <!-- {{ navigationRoutes }} -->
    <router-link
      v-for="route in routes"
      :key="route.name"
      class="navigation-background--dark"
      :to="route.path"
      >{{ route.name }}</router-link
    >
  </nav>
</template>

<script>
export default {
  data() {
    return {
      routes: this.$router.options.routes,
    };
  },
  computed: {
    // navigationRoutes() {
    //   return this.routes.splice(0, 2);
    // },
  },
};
</script>

<style lang="scss">
.navigation__items {
  @extend %navigation-layout;
  position: fixed;
  z-index: 1;
}
</style>
