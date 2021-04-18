<template>
  <div class="product__container">
    <div class="product">
      <prismic-rich-text :field="product.title" class="product__title" />
      <prismic-image class="product__image" :field="product.image" />
      <button class="product__close text-background--dark" @click="hideProduct">
        close
      </button>
      <h4 class="product__price">
        {{ `€ ${$prismic.richTextAsPlain(product.price)},00` }}
      </h4>
    </div>
    <div class="product__scrollable"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    uid: String,
  },
  data() {
    return {
      product: {
        title: [],
        price: [],
        image: {},
      },
      pageEnd: false,
    };
  },
  computed: {
    ...mapState(["products", "initialNavigation"]),
  },
  methods: {
    ...mapActions(["lockView", "unlockView"]),
    getProduct(uid) {
      const product = this.products.find((e) => e.uid === uid);
      this.product = product.data;
    },
    hideProduct() {
      if (this.initialNavigation) {
        this.$router.push({ name: "products" });
      } else {
        this.$router.back();
      }
    },
    checkPageEnd() {
      const pageHeight = document.body.offsetHeight;
      const scrollPosition = window.innerHeight + window.scrollY;
      if (Math.round(scrollPosition + 1) >= pageHeight) {
        this.pageEnd = true;
        this.hideProduct();
      }
    },
  },
  created() {
    this.getProduct(this.uid);
  },
  mounted() {
    document.addEventListener("scroll", this.checkPageEnd);
    this.lockView({ selector: ".main" });
  },
  destroyed() {
    document.removeEventListener("scroll", this.checkPageEnd);
  },
  beforeRouteLeave(to, from, next) {
    if (this.pageEnd) {
      this.unlockView({ selector1: ".main", selector2: ".product__container" });
    } else {
      setTimeout(() => {
        this.unlockView({
          selector1: ".main",
          selector2: ".product__container",
        });
      }, 500);
    }
    next();
  },
};
</script>

<style lang="scss">
.product {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: end;
  padding: $gap;
  background-color: $color0;
  height: 100vh;

  &__title {
    z-index: 1;
    grid-row: 1 / span 2;
    grid-column: 1 / span 2;
    font-size: $font-size-1;
  }

  &__image {
    grid-row: 1 / span 2;
    grid-column: 2;
    align-self: center;
  }

  &__price {
    justify-self: end;
    font-size: 30rem;
  }

  &__close {
    @extend %button-transition;
    align-self: start;
    justify-self: end;
    transform-origin: top right;
  }

  &__scrollable {
    grid-row: 4;
    height: 100vh;
  }
}
</style>
