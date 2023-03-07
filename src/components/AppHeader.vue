<script>
import SearchBar from "./SearchBar.vue";
import { store } from "../data/store";
export default {
  emits: ["search-action"],
  components: { SearchBar },
  data() {
    return {
      store,
    };
  },
  computed: {
    // CALCOLO I GENERI SELEZIONABILI DAL FILTRO IN BASE ALLA RICERCA EFFETTUATA
    // DALL'UTENTE
    getMovieFilterGenres() {
      let listaGeneri = [];
      store.movies.map((movie) => {
        // Per ogni film
        store.movieGenres.filter((genere) => {
          // Se
          if (
            movie.genre_ids.includes(genere.id) && // l'id è presente nella lista
            !listaGeneri.includes(
              listaGeneri.find((elemento) => elemento.name == genere.name) // e il nome del genere non è stato già aggiunto
            )
          ) {
            listaGeneri.push({ id: genere.id, name: genere.name }); // Aggiungilo alla lista
          }
        });
      });
      return listaGeneri;
    },
    getSeriesFilterGenres() {
      let listaGeneri = [];
      store.series.map((serie) => {
        // Per ogni serie
        store.seriesGenres.filter((genere) => {
          // Se
          if (
            serie.genre_ids.includes(genere.id) && // l'id è presente nella lista
            !listaGeneri.includes(
              listaGeneri.find((elemento) => elemento.name == genere.name) // e il nome del genere non è stato già aggiunto
            )
          ) {
            listaGeneri.push({ id: genere.id, name: genere.name }); // Aggiungilo alla lista
          }
        });
      });
      return listaGeneri;
    },
  },
  methods: {
    sendSearch(query) {
      store.searchTerm = query;
      this.$emit("search-action", query);
    },
    filterMovies(genere) {
      if (genere.target.value != "Tutti") {
        genere = parseInt(genere.target.value);
        const film = store.movies.filter((movie) =>
          movie.genre_ids.includes(genere)
        );
        store.movies = film;
      } else {
        this.sendSearch(store.searchTerm + " ");
      }
    },
    filterSeries(genere) {
      if (genere.target.value != "Tutti") {
        genere = parseInt(genere.target.value);
        const serie = store.series.filter((serie) =>
          serie.genre_ids.includes(genere)
        );
        store.series = serie;
      } else {
        this.sendSearch(store.searchTerm + " ");
      }
    },
  },
};
</script>
<template>
  <header>
    <div class="container d-flex align-items-center justify-content-between">
      <p class="text-danger fw-bold fs-1">BOOLFLIX</p>
      <SearchBar @search="sendSearch" />
    </div>
    <div class="container d-flex align-items-center justify-content-between">
      <div v-if="store.movies.length">
        <label for="select-movies" class="m-2">Filtra i film:</label>
        <select id="select-movies" @change="filterMovies($event)">
          <option>Tutti</option>
          <option v-for="film in getMovieFilterGenres" :value="film.id">
            {{ film.name }}
          </option>
        </select>
      </div>
      <div v-if="store.series.length">
        <label for="select-series" class="m-2">Filtra le serie:</label>
        <select id="select-series" @change="filterSeries($event)">
          <option>Tutti</option>
          <option v-for="serie in getSeriesFilterGenres" :value="serie.id">
            {{ serie.name }}
          </option>
        </select>
      </div>
    </div>
  </header>
</template>
<style scoped lang="scss">
header {
  height: 150px;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 1;
  width: 100%;
  nav {
    width: 100%;
  }
}
</style>
