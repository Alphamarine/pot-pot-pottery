<template>
  <header class="header">
    <prismic-image class="header__image" :field="header.image" />
    <div class="header__text">
      <prismic-rich-text class="header__text__title" :field="header.title" />
      <prismic-rich-text :field="header.description" />
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      header: {
        title: [],
        description: [],
        image: {},
      },
    };
  },
  methods: {
    async getContent() {
      const home = await this.$prismic.client.getSingle("home");
      this.header = home.data;
    },
  },
  created() {
    this.getContent();
  },
};
</script>

<style lang="scss">
.header {
  display: grid;
}

.header__image {
  object-fit: cover;
  height: 75vh;
}

.header__text {
  display: grid;
  row-gap: 10rem;
  height: 25vh;
  text-align: center;
}

.header__text__title {
  font-size: 50rem;
  align-self: end;
}
</style>
