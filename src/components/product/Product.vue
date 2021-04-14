<template>
  <div id="product__container">
    <div id="product">
      <prismic-rich-text :field="product.title" id="product__title" />
      <prismic-image id="product__image" :field="product.image" />
      <button id="product__close" @click="hideProduct">close</button>
      <h4 id="product__price">
        {{ `€ ${$prismic.richTextAsPlain(product.price)},00` }}
      </h4>
    </div>
    <div id="product__scrollable"></div>
  </div>
</template>

<script>
export default {
  props: {
    uid: String,
    products: Array,
  },
  emits: ["close-product"],
  data() {
    return {
      product: {
        title: [],
        price: [],
        image: {},
      },
    };
  },
  methods: {
    getProduct(uid) {
      const product = this.products.find((e) => e.uid === uid);
      this.product = product.data;
    },
    hideProduct() {
      this.$emit("hide-product");
    },
    checkPageEnd() {
      const pageHeight = document.body.offsetHeight;
      const scrollPosition = window.innerHeight + window.scrollY;
      if (Math.round(scrollPosition) >= pageHeight) {
        this.$emit("hide-product", "scrolling");
      }
    },
  },
  created() {
    this.getProduct(this.uid);
  },
  mounted() {
    setTimeout(() => {
      document.addEventListener("scroll", this.checkPageEnd);
    }, 600);
  },
  destroyed() {
    document.removeEventListener("scroll", this.checkPageEnd);
  },
  beforeRouteUpdate(to, from, next) {
    this.getProduct(to.params.uid);
    next();
  },
};
</script>

<style>
#product {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: end;
  padding: var(--gap);
  background-color: var(--color0);
  height: 100vh;
}

#product__title {
  z-index: 1;
  grid-row: 1 / span 2;
  grid-column: 1 / span 2;
  font-size: 30rem;
}

#product__image {
  grid-row: 1 / span 2;
  grid-column: 2;
  align-self: center;
}

#product__price {
  justify-self: end;
  font-size: 30rem;
}

#product__close {
  align-self: start;
  justify-self: end;
}
#product__scrollable {
  grid-row: 4;
  height: 100vh;
}
</style>
