<script>
import AppCard from "./AppCard.vue";
import { store } from "../data/store";
import axios from "axios";
import { isProxy, toRaw } from "vue";
export default {
  props: { cercaquesto: String, tipo: String },
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
      this.fetchResults(nuovaRicerca);
    },
  },
  methods: {
    fetchResults(query) {
      store.isLoading = true;
      if (this.tipo == "movie") {
        store.movies = []; // reset risultati ricerca
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

              // Aggiungo i generi a ciascun film
              const movieGenres = store.movies.map((film) => {
                let generi = [];
                film.genre_ids.forEach((id, indice) => {
                  // Per ogni genre_ids nel film specifico
                  store.movieGenres.forEach((genere) => {
                    // controlla in ogni tipo di genere salvato
                    let genreName;
                    if (
                      id == genere.id &&
                      indice + 1 == film.genre_ids.length // Se è l'ultimo della lista aggiungi il punto
                    ) {
                      genreName = genere.name + ".";
                    } else if (id == genere.id) {
                      genreName = genere.name + "," + " "; // Altrimenti aggiungi virgola e spazio
                    }
                    generi.push(genreName);
                  });
                });
                return { ...film, generi }; // ritorna l'oggetto film con i generi
              });
              // Aggiorno l'array originario
              store.movies = movieGenres;
            });
          })
          .finally(() => (store.isLoading = false));
      } else if (this.tipo == "series") {
        store.series = []; // reset risultati ricerca
        axios
          .get(
            `${store.baseUri}search/tv?api_key=${store.apiKey}&query=${query}&language=it`
          )
          .then((response) => {
            store.series = response.data.results;
            // Crea un array di richieste Axios per gli attori
            const requests = store.series.map((serie) =>
              axios.get(
                `${store.baseUri}tv/${serie.id}/credits?api_key=${store.apiKey}&language=it`
              )
            );
            // Una volta ricevute tutte le risposte
            axios.all(requests).then((responses) => {
              // Crea un nuovo array con il risultato delle risposte e
              // la nuova proprietà attori
              const series = responses.map((risultato, indice) => {
                return {
                  ...response.data.results[indice],
                  attori: risultato.data.cast,
                };
              });
              // Aggiorna l'array originario
              store.series = series;
            });
          })
          .finally(() => (store.isLoading = false));
      }
    },
    logga(qualcosa) {
      // console.log("**********");
      // console.log(qualcosa);
      // console.log("**********");
    },
    fetchGenres(type) {
      if (type == "movie") {
        axios
          .get(
            `${store.baseUri}genre/movie/list?api_key=${store.apiKey}&language=it`
          )
          .then((response) => {
            store.movieGenres = response.data.genres;
            // console.log(store.movieGenres);
          });
      } else if (type == "series") {
        axios
          .get(
            `${store.baseUri}genre/tv/list?api_key=${store.apiKey}&language=it`
          )
          .then((response) => {
            store.seriesGenres = response.data.genres;
            // console.log(store.seriesGenres);
          });
      }
    },
  },
  created() {
    this.fetchGenres("movie");
    this.fetchGenres("series");
  },
};
</script>
<template>
  <section>
    <div class="container">
      <div v-if="store.movies.length > 0 && tipo == 'movie'">
        <h2>{{ store.movies.length }} film trovati:</h2>
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
              :generi="movie.generi"
            />
          </div>
        </div>
      </div>
      <div v-if="store.series.length > 0 && tipo == 'series'">
        <h2>{{ store.movies.length }} Serie trovate:</h2>
        <div class="row row-cols-4 justify-content-center">
          <div v-for="serie in store.series" class="p-2 d-flex flex-column">
            <AppCard
              :originale="serie.original_name"
              :titolo="serie.name"
              :lingua="serie.original_language"
              :stars="serie.vote_average"
              :retrocopertina="serie.backdrop_path"
              :frontecopertina="serie.poster_path"
              :overview="serie.overview"
              :attori="serie.attori"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
