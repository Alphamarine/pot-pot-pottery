<template>
  <header id="header">
    <prismic-image id="header__image" :field="document.image" />
    <div id="header__text">
      <prismic-rich-text id="header__text__title" :field="document.title" />
      <prismic-rich-text
        id="header__text__description"
        :field="document.description"
      />
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      document: {
        title: [],
        description: [],
        image: {},
      },
    };
  },
  methods: {
    async getContent() {
      const document = await this.$prismic.client.getSingle("home");
      this.document = document.data;
    },
  },
  created() {
    this.getContent();
  },
};
</script>

<style>
#header {
  display: grid;
}

#header__image {
  object-fit: cover;
  height: 75vh;
}

#header__text {
  display: grid;
  row-gap: 10rem;
  height: 25vh;
  text-align: center;
}

#header__text__title {
  font-size: 50rem;
  align-self: end;
}
</style>
