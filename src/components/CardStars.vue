<script>
export default {
  props: {
    starsCounter: Number,
  },
  computed: {
    fullStars() {
      return Math.ceil(this.starsCounter / 2);
    },
    emptyStars() {
      return 5 - this.fullStars;
    },
  },
};
</script>
<template>
  <div>
    <font-awesome-icon
      class="full-star"
      v-for="star in fullStars"
      icon="fa-solid fa-star"
    />
    <font-awesome-icon
      class="empty-star"
      v-for="star in emptyStars"
      icon="fa-solid fa-star"
    />
  </div>
</template>
<style scoped lang="scss">
.full-star {
  color: orange;
}
.empty-star {
  color: grey;
}
</style>
