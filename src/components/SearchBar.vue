<script>
export default {
  emits: ["search"],
  data() {
    return {
      cerca: "",
    };
  },
};
</script>
<template>
  <div class="input-group w-50">
    <input
      type="text"
      class="form-control"
      placeholder="Cerca un film o una serie TV"
      aria-label="Recipient's username"
      aria-describedby="button-addon2"
      v-model="cerca"
    />
    <button
      class="btn btn-primary"
      type="button"
      id="button-addon2"
      @click="$emit('search', cerca)"
    >
      Cerca
    </button>
  </div>
</template>
<style scoped></style>
