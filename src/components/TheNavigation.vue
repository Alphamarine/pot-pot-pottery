<template>
  <nav class="navigation">
    <router-link
      v-for="route in navigationRoutes"
      :key="route.path"
      class="navigation__item text-background--dark"
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
    navigationRoutes() {
      return this.routes.splice(0, 2);
    },
  },
};
</script>

<style lang="scss">
.navigation {
  @extend %list-layout;
  position: fixed;
  z-index: 1;

  &__item {
    @extend %button-transition;
    transform-origin: top left;
  }
}
</style>
