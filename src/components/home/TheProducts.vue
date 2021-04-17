<template>
  <div id="products">
    <div
      v-for="product in products"
      :key="product.data.id"
      :style="{ backgroundImage: `url(${product.data.image.url})` }"
      class="products__item"
    >
      <div class="products__item__text">
        <router-link :to="product.uid">
          <prismic-rich-text
            class="products__item__text__title"
            :field="product.data.title"
            @click="lockHome"
          />
        </router-link>
        <h4 class="products__item__text__price">
          {{ `€ ${$prismic.richTextAsPlain(product.data.price)},00` }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: Array,
  },
  emits: ["lock-home"],
  methods: {
    lockHome() {
      this.$emit("lock-home");
    },
  },
};
</script>

<style lang="scss">
#products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $gap;
  padding: $gap;
}

.products__item {
  position: relative;
  padding-top: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  background-size: cover;
}

.products__item__text {
  position: absolute;
  display: grid;
  justify-items: start;
  row-gap: $gap / 2;
  padding: $gap;
}

.products__item__text__title,
.products__item__text__price {
  background-color: $color0;
  border-radius: 50rem;
  padding: 10rem 20rem 6rem 20rem;
}

.products__item__text__title {
  font-size: 30rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  transform-origin: bottom left;
}

.products__item__text__title:hover {
  transform: scale(1.1);
}

@media screen and (max-width: 75em) {
  #products {
    grid-template-columns: 1fr;
  }
}
</style>
