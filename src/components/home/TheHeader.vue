<template>
  <header id="header">
    <prismic-image id="header__image" :field="header.image" />
    <div id="header__text">
      <prismic-rich-text id="header__text__title" :field="header.title" />
      <prismic-rich-text :field="header.description" />
    </div>
  </header>
</template>

<script>
export default {
  props: {
    header: Object,
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
