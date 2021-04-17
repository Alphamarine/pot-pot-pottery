<template>
  <div class="home">
    <the-header :header="home"></the-header>
    <the-products :products="products" @lock-home="lockHome"></the-products>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss"></style>
