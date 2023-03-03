<script>
import AppHeader from "./components/AppHeader.vue";
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
    <AppMovies :cercaquesto="receivedSearchTerm"></AppMovies>
    <hr />
    <AppSeries :cercaquesto="receivedSearchTerm"></AppSeries>
  </main>
</template>

<style></style>
