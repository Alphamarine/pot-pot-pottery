<template>
  <div>
    <the-header></the-header>
    <products></products>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader";
import Products from "./Products";

export default {
  components: { TheHeader, Products },
};
</script>
