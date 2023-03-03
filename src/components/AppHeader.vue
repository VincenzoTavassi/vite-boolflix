<script>
export default {
  emits: ["search-action"],
  data() {
    return {
      searchTerm: "",
    };
  },
};
</script>
<template>
  <header>
    <nav class="d-flex justify-content-between">
      <p>logo</p>
      <div>
        <input type="text" v-model="searchTerm" />
        <button
          class="btn btn-primary"
          @click="$emit('search-action', searchTerm)"
        >
          Cerca
        </button>
      </div>
    </nav>
  </header>
</template>
<style scoped lang="scss">
header {
  height: 200px;
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  nav {
    width: 100%;
  }
}
</style>
