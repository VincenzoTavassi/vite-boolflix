<script>
import AppHeader from "./components/AppHeader.vue";
import AppMovies from "./components/AppMovies.vue";
import AppSeries from "./components/AppSeries.vue";
import AppLoader from "./components/AppLoader.vue";
import { store } from "./data/store";

export default {
  components: { AppHeader, AppMovies, AppSeries, AppLoader },
  data() {
    return {
      receivedSearchTerm: "",
      store,
    };
  },
  methods: {
    // OTTIENI IL TERMINE DI RICERCA INVIATO DALL'EMIT DELL'HEADER,
    // CHE LO RICEVE DALLA SEARCHBAR
    getSearchTerm(term) {
      this.receivedSearchTerm = term;
    },
  },
};
</script>

<template>
  <AppHeader @search-action="getSearchTerm" />
  <main class="py-3">
    <div v-if="!store.isLoading">
      <AppMovies :cercaquesto="receivedSearchTerm"></AppMovies>
      <hr v-if="receivedSearchTerm" />
      <AppSeries :cercaquesto="receivedSearchTerm"></AppSeries>
    </div>
    <div v-else>
      <AppLoader />
    </div>
  </main>
</template>

<style>
body {
  background-color: #333 !important;
  color: white !important;
}
</style>
