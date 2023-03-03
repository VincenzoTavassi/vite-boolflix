<script>
import SearchBar from "./SearchBar.vue";
export default {
  emits: ["search-action"],
  components: { SearchBar },
  methods: {
    sendSearch(query) {
      this.$emit("search-action", query);
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
  </header>
</template>
<style scoped lang="scss">
header {
  height: 100px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  nav {
    width: 100%;
  }
}
</style>
