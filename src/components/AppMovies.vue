<script>
import AppCard from "./AppCard.vue";
import { store } from "../data/store";
import axios from "axios";
import { isProxy, toRaw } from "vue";
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
          `${store.baseUri}search/movie?api_key=${store.apiKey}&query=${query}&language=it`
        )
        .then((response) => {
          store.movies = response.data.results; // Salva tutti i film
          // Crea un array di richieste Axios per gli attori
          const requests = store.movies.map((movie) =>
            axios.get(
              `${store.baseUri}movie/${movie.id}/credits?api_key=${store.apiKey}&language=it`
            )
          );
          // Una volta ricevute tutte le risposte
          axios.all(requests).then((responses) => {
            // Crea un nuovo array con il risultato delle risposte e
            // la nuova proprietà attori
            const movies = responses.map((risultato, indice) => {
              return {
                ...response.data.results[indice],
                attori: risultato.data.cast,
              };
            });
            // Aggiorna l'array originario
            store.movies = movies;
          });
        })
        .finally(() => (store.isLoading = false));
    },
    logga(qualcosa) {
      // console.log("**********");
      // console.log(qualcosa);
      // console.log("**********");
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
            :attori="movie.attori"
          />
        </div>
      </div>
    </div>
  </section>
</template>
