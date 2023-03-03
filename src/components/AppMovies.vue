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
        .get(`${store.baseUri}movie?api_key=${store.apiKey}&query=${query}`)
        .then((response) => {
          store.movies = response.data.results;
        });
    },
  },
};
</script>
<template>
  <section>
    <h2 v-if="store.movies.length > 0">Film trovati:</h2>
    <div class="row row-cols-4 g-2 justify-content-center">
      <div v-for="movie in store.movies" class="p-2">
        <AppCard
          :originale="movie.original_title"
          :titolo="movie.title"
          :lingua="movie.original_language"
          :stars="movie.vote_average"
        />
      </div>
    </div>
  </section>
</template>
<style></style>
