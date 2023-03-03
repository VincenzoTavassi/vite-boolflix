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
    retrocopertina: String,
    frontecopertina: String,
    overview: String,
  },
  computed: {
    linguaOriginale() {
      // modifico parametro lingua inglese per l'api delle bandiere
      if (this.lingua == "en") {
        return "gb";
      } else if (this.lingua == "ja") {
        return "jp";
      } else if (this.lingua == "ko") {
        return "kr";
      } else if (this.lingua == "zh") {
        return "cn";
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
  <div class="card d-flex flex-column">
    <div class="fronte">
      <img :src="`${baseImgUri}${frontecopertina}`" alt="" />
    </div>
    <div class="retro">
      <img :src="`${baseImgUri}${retrocopertina}`" alt="" class="my-2" />
      <div class="description">
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
        <p>Descrizione: {{ overview }}</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
img {
  max-width: 100%;
}

.card {
  height: 500px;
  border: 2px solid white;
  &:hover {
    .fronte {
      display: none;
    }
    .retro {
      display: block;
    }
  }
}

.fronte {
  flex-grow: 1;
  img {
    min-height: 100%;
  }
}
.retro {
  background-color: black;
  color: white;
  text-align: center;
  min-height: 100%;
  display: none;
  overflow: auto;

  .description {
    padding: 10px;
  }
}
</style>
