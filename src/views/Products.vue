<template>
  <div class="products">
    <div
      v-for="product in products"
      :key="product.data.uid"
      :style="{ backgroundImage: `url(${product.data.image.url})` }"
      class="products__item"
    >
      <div class="products__item__text">
        <router-link :to="{ name: 'product', params: { uid: product.uid } }">
          <prismic-rich-text
            class="products__item__text__title text-background--light"
            :field="product.data.title"
          />
        </router-link>
        <h4 class="text-background--light">
          {{ `€ ${$prismic.richTextAsPlain(product.data.price)},00` }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["products"]),
  },
};
</script>

<style lang="scss">
.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $gap;
  padding: $gap;

  &__item {
    position: relative;
    padding-top: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    background-size: cover;

    &__text {
      @extend %list-layout;
      position: absolute;

      &__title {
        @extend %button-transition;
        font-size: $font-size-1;
        transform-origin: bottom left;
      }
    }
  }
}

@media screen and (max-width: 75em) {
  .products {
    grid-template-columns: 1fr;
  }
}
</style>
