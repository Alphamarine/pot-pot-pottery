<template>
  <div>
    <div v-if="typeof product.data === 'undefined'" />
    <div v-else id="product">
      <prismic-rich-text :field="product.data.title" id="product__title" />
      <img
        :src="product.data.image.url"
        :alt="product.data.image.alt"
        id="product__image"
      />
      <button id="product__close" @click="$router.push({ name: 'home'})">close</button>
      <h4 id="product__price">
        {{ `€ ${$prismic.richTextAsPlain(product.data.price)},00` }}
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    uid: String,
  },
  emits: ["hide-product"],
  data() {
    return {
      product: {},
    };
  },
  methods: {
    async getContent(uid) {
      const product = await this.$prismic.client.query(
        this.$prismic.Predicates.at("my.product.uid", uid),
      );
      this.product = product.results[0];
    },
    hideProduct() {
      // this.$emit("hide-product");
      console.log("emitted");
    },
  },
  // methods: {
  //   setSelectedProduct(slug) {
  //     this.selectedProduct = this.products.find((e) => e.slugs[0] === slug);
  //     console.log("call");
  //     console.log(this.products);
  //     console.log(this.selectedProduct);
  //   },
  // },
  // mounted() {
  //   this.setSelectedProduct(this.productSlug);
  // },
  created() {
    this.getContent(this.uid);
    console.log("ok");
  },
  beforeRouteUpdate(to, from, next) {
    this.getContent(to.params.uid);
    next();
  },
};
</script>

<style>
#product {
  position: fixed;
  top: 0;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: end;
  padding: var(--gap);
  background-color: var(--color0);
}

#product__title {
  grid-row: 1 / 3;
  font-size: 30rem;
}

#product__image {
  grid-row: 1 / 3;
}

#product__price {
  justify-self: end;
  font-size: 30rem;
}

#product__close {
  align-self: start;
  justify-self: end;
}
</style>
