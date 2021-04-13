<template>
  <div>
    <!-- <div v-if="typeof product.data === 'undefined'" class="product" /> -->
    <div class="product">
      <prismic-rich-text :field="product.data.title" id="product__title" />
      <img
        :src="product.data.image.url"
        :alt="product.data.image.alt"
        id="product__image"
      />
      <button id="product__close" @click="hideProduct">close</button>
      <h4 id="product__price">
        {{ `€ ${$prismic.richTextAsPlain(product.data.price)},00` }}
      </h4>
    </div>
    <div id="product__scrollable"></div>
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
      product: {
        data: {
          title: [],
          image: {
            url: "",
            alt: "",
          },
        },
      },
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
      this.$router.push({ name: "home" });
      this.$emit("hide-product");
    },
    checkPageEnd() {
      const pageHeight = document.body.offsetHeight;
      const scrollPosition = window.innerHeight + window.scrollY;
      if (Math.round(scrollPosition) >= pageHeight) {
        this.hideProduct();
      }
    },
  },
  created() {
    this.getContent(this.uid);
  },
  mounted() {
    setTimeout(() => {
      document.addEventListener("scroll", this.checkPageEnd);
    }, 1000);
  },
  destroyed() {
    document.removeEventListener("scroll", this.checkPageEnd);
  },
  beforeRouteUpdate(to, from, next) {
    this.getContent(to.params.uid);
    next();
  },
};
</script>

<style>
.product {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: end;
  padding: var(--gap);
  background-color: var(--color0);
  height: 100vh;
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
#product__scrollable {
  grid-row: 4;
  height: 100vh;
}
</style>
