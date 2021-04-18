<template>
  <div>
    <div class="products">
      <div
        v-for="product in products"
        :key="product.data.id"
        :style="{ backgroundImage: `url(${product.data.image.url})` }"
        class="products__item"
      >
        <div class="products__item__text">
          <router-link :to="{ name: 'product', params: { uid: product.uid } }">
            <prismic-rich-text
              class="products__item__text__title navigation-background--light"
              :field="product.data.title"
              @click="lockMain"
            />
          </router-link>
          <h4 class="navigation-background--light">
            {{ `€ ${$prismic.richTextAsPlain(product.data.price)},00` }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: Array,
  },
  emits: ["lock-main"],
  methods: {
    lockMain() {
      this.$emit("lock-main");
    },
  }
};
</script>

<style lang="scss">
.fixed {
  position: fixed;
}
.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $gap;
  padding: $gap;
  position: relative;
  right: 0;
  left: 0;
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
  @extend %navigation-layout;
  position: absolute;
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
  .products {
    grid-template-columns: 1fr;
  }
}
</style>
