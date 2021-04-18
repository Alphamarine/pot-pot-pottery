<template>
  <div>
    <the-header v-if="Object.keys(header).length" :header="header"></the-header>
    <products></products>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader";
import Products from "./Products";

export default {
  components: { TheHeader, Products },
  computed: {
    header() {
      return this.$store.state.home;
    },
  },
};
</script>
