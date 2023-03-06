import { reactive } from "vue";
export const store = reactive({
  movies: [],
  series: [],
  movieGenres: [],
  seriesGenres: [],
  baseUri: "https://api.themoviedb.org/3/",
  apiKey: "90ab9452368e98b81eef313c0c7bf8b0",
  isLoading: false,
});
