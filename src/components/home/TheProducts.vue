<template>
  <div id="products">
    <div
      v-for="product in products"
      :key="product.data.id"
      :style="{ backgroundImage: `url(${product.data.image.url})` }"
      class="products__item"
    >
      <div class="products__item__text">
        <prismic-rich-text
          class="products__item__text--title"
          :field="product.data.title"
        />
        <h4>{{ `€ ${$prismic.richTextAsPlain(product.data.price)},00` }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    async getContent() {
      const products = await this.$prismic.client.query(
        this.$prismic.Predicates.at("document.type", "product"),
        {
          orderings: "[document.last_publication_date]",
        },
      );
      this.products = products.results.reverse();
    },
  },
  created() {
    this.getContent();
  },
};
</script>

<style>
#products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap);
  padding: var(--gap);
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
  row-gap: calc(var(--gap) / 2);
  padding: var(--gap);
}

.products__item__text :is(.products__item__text--title, h4) {
  background-color: var(--color0);
  border-radius: 50rem;
  padding: 10rem 20rem 6rem 20rem;
}

.products__item__text--title {
  font-size: 30rem;
  cursor: pointer;
  transition: transform 0.4s ease;
  transform-origin: bottom left;
}

.products__item__text--title:hover {
  transform: scale(1.1);
}
</style>
