<script>
import CardStars from "./CardStars.vue";
export default {
  components: { CardStars },
  props: { stars: Number, titolo: String, originale: String, lingua: String },
  computed: {
    linguaOriginale() {
      // modifico parametro per l'api delle bandiere
      if (this.lingua == "en") {
        return "gb";
      } else {
        return this.lingua;
      }
    },
  },
};
</script>
<template>
  <div>
    <h2>{{ titolo }}</h2>
    <CardStars :starsCounter="stars" />
    <p>Titolo originale: {{ originale }}</p>
    <p>
      Lingua originale:
      <img
        :src="'https://flagcdn.com/w40/' + linguaOriginale + '.png'"
        alt=""
      />
    </p>
  </div>
</template>
<style lang="scss" scoped>
div {
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
  flex-grow: 1;
}
</style>
