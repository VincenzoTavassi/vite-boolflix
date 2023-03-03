<script>
import { store } from "../data/store";
import axios from "axios";
export default {
  props: { cercaquesto: String },
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
    <div class="row row-cols-4">
      <div v-for="movie in store.movies">
        <h2>
          {{ movie.original_title }}
        </h2>
        <p>{{ movie.title }}</p>
        <p>{{ movie.original_language }}</p>
        <p>{{ movie.vote_average }}</p>
      </div>
    </div>
  </section>
</template>
<style></style>
