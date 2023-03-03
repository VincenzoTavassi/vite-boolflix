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
      store.isLoading = true;
      axios
        .get(
          `${store.baseUri}movie?api_key=${store.apiKey}&query=${query}&language=it`
        )
        .then((response) => {
          store.movies = response.data.results;
        })
        .finally(() => (store.isLoading = false));
    },
  },
};
</script>
<template>
  <section>
    <div class="container">
      <h2 v-if="store.movies.length > 0">
        {{ store.movies.length }} film trovati:
      </h2>
      <div class="row row-cols-4 justify-content-center">
        <div v-for="movie in store.movies" class="p-2 d-flex flex-column">
          <AppCard
            :originale="movie.original_title"
            :titolo="movie.title"
            :lingua="movie.original_language"
            :stars="movie.vote_average"
            :retrocopertina="movie.backdrop_path"
            :frontecopertina="movie.poster_path"
            :overview="movie.overview"
          />
        </div>
      </div>
    </div>
  </section>
</template>
