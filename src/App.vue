<script>
import AppHeader from "./components/AppHeader.vue";
import AppCard from "./components/AppCard.vue";
import AppMovies from "./components/AppMovies.vue";
import AppSeries from "./components/AppSeries.vue";

export default {
  components: { AppHeader, AppMovies, AppSeries },
  data() {
    return {
      receivedSearchTerm: "",
    };
  },
  methods: {
    // OTTIENI IL TERMINE DI RICERCA INVIATO DALL'EMIT DELL'HEADER
    getSearchTerm(term) {
      this.receivedSearchTerm = term;
    },
  },
};
</script>

<template>
  <AppHeader @search-action="getSearchTerm" />
  <main>
    <h1>Risultati di ricerca</h1>
    <AppMovies :cercaquesto="receivedSearchTerm"></AppMovies>
    <hr />
    <AppSeries></AppSeries>
  </main>
</template>

<style></style>
