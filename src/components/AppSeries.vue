<script>
import AppCard from "./AppCard.vue";
import { store } from "../data/store";
import axios from "axios";
export default {
  props: { cercaquesto: String },
  components: { AppCard },
  data() {
    return {
      store,
    };
  },
  watch: {
    // QUANDO IL TERMINE DI RICERCA CAMBIA,
    // ESEGUI LA FUNZIONE
    cercaquesto(nuovaRicerca, vecchiaRicerca) {
      this.fetchMovies(nuovaRicerca);
    },
  },
  methods: {
    fetchMovies(query) {
      axios
        .get(
          `${store.baseUri}tv?api_key=${store.apiKey}&query=${query}&language=it`
        )
        .then((response) => {
          store.series = response.data.results;
        });
    },
  },
};
</script>
<template>
  <section>
    <div class="container">
      <h2 v-if="store.series.length > 0">
        {{ store.series.length }} serie trovate:
      </h2>
      <div class="row row-cols-4 justify-content-center">
        <div v-for="serie in store.series" class="p-2 d-flex flex-column">
          <AppCard
            :originale="serie.original_name"
            :titolo="serie.name"
            :lingua="serie.original_language"
            :stars="serie.vote_average"
            :copertina="serie.backdrop_path"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<style></style>
