import { reactive } from "vue";
export const store = reactive({
  movies: [],
  series: [],
  baseUri: "https://api.themoviedb.org/3/search/",
  apiKey: "90ab9452368e98b81eef313c0c7bf8b0",
  isLoading: false,
});
