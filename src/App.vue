<template>
  <div id="app">
    <the-header></the-header>
    <the-products></the-products>
  </div>
</template>

<script>
import TheHeader from "./components/home/TheHeader"
import TheProducts from "./components/home/TheProducts"

export default {
  components: { TheHeader, TheProducts },
};
</script>

<style>
@import url("./assets/styles/reset.css");
@import url("./assets/styles/variables.css");
@import url("./assets/styles/main.css");
</style>
