<script>
import AppHeader from "./components/AppHeader.vue";
import AppSearch from "./components/AppSearch.vue";
import AppLoader from "./components/AppLoader.vue";
import { store } from "./data/store";

export default {
  components: { AppHeader, AppSearch, AppLoader },
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
      <AppSearch :cercaquesto="receivedSearchTerm" :tipo="'movie'" />
      <hr v-if="receivedSearchTerm" />
      <AppSearch :cercaquesto="receivedSearchTerm" :tipo="'series'" />
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
