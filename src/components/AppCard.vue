<script>
import CardStars from "./CardStars.vue";
import { store } from "../data/store";
export default {
  components: { CardStars },
  props: {
    stars: Number,
    titolo: String,
    originale: String,
    lingua: String,
    copertina: String,
  },
  computed: {
    linguaOriginale() {
      // modifico parametro lingua inglese per l'api delle bandiere
      if (this.lingua == "en") {
        return "gb";
      } else {
        return this.lingua;
      }
    },
  },
  data() {
    return {
      baseImgUri: "https://image.tmdb.org/t/p/w342",
      baseFlagUri: "https://flagcdn.com/w40/",
    };
  },
};
</script>
<template>
  <div>
    <img :src="`${baseImgUri}${copertina}`" alt="" class="my-2" />
    <h2>
      {{ titolo }}
    </h2>
    <CardStars :starsCounter="stars" />
    <p>Titolo originale: {{ originale }}</p>
    <p>
      Lingua originale:
      <img
        :src="baseFlagUri + linguaOriginale + '.png'"
        :alt="linguaOriginale"
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
  img {
    max-width: 100%;
  }
}
</style>
