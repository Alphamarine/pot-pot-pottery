<template>
  <footer class="footer">
    <prismic-rich-text :field="footer.title" />
    <div class="footer__links">
      <prismic-link :field="footer.instagram">Instagram</prismic-link>
      <prismic-link :field="footer.facebook">Facebook</prismic-link>
    </div>
  </footer>
</template>

<script>
export default {
  // props: {
  //   footer: Object,
  // },
  data() {
    return {
      footer: {
        title: [],
        instagram: {},
        facebook: {},
      },
    };
  },
  methods: {
    async getContent() {
      const home = await this.$prismic.client.getSingle("home");
      this.footer = home.data;
    },
  },
  created() {
    this.getContent();
  },
};
</script>

<style lang="scss">
.footer {
  display: flex;
  justify-content: space-between;
  padding: $gap;
  margin-top: $gap;
}

.footer__links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: $gap;
}
</style>
