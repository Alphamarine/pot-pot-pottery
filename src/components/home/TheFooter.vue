<template>
  <footer id="footer">
    <prismic-rich-text :field="footer.title" />
    <div id="footer__links">
      <prismic-link :field="footer.instagram">Instagram</prismic-link>
      <prismic-link :field="footer.facebook">Facebook</prismic-link>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    footer: Object,
  },
};
</script>

<style>
#footer {
  display: flex;
  justify-content: space-between;
  padding: var(--gap);
  margin-top: var(--gap);
}

#footer__links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: var(--gap);
}
</style>
