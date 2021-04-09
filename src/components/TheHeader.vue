<template>
  <header>
    <img src="" alt="" />
    <div>
      <prismic-rich-text :field="document.title" />
      <prismic-rich-text :field="document.description" />
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

<style></style>
