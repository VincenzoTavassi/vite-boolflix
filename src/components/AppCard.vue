<script>
import CardStars from "./CardStars.vue";
export default {
  components: { CardStars },
  props: { stars: Number, titolo: String, originale: String, lingua: String },
};
</script>
<template>
  <div>
    <h2>{{ titolo }}</h2>
    <CardStars :starsCounter="stars" />
    <p>Titolo originale: {{ originale }}</p>
    <p>Lingua: {{ lingua }}</p>
  </div>
</template>
<style lang="scss" scoped>
div {
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
}
</style>
