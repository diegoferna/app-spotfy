<template>
  <div class="search">
    <input
      v-model="searchTerm"
      @input="handleSearch"
      class="search_bar"
      placeholder="Pesquisar"
    />
  </div>
</template>

<script>
import { watch } from "vue";
import useSpotifyServices from "../services/useSpotifyServices";

export default {
  props: {},
  data() {
    return {
      searchTerm: "",
      token: "",
      genres: [],
      onSearch: () => [],
      refreshToken: () => null,
    };
  },

  //EM UM PROJETO REAL É IDEAL COLOCAR CLIENDID E O CLIENT SECRET EM ARQUIVO .ENV
  async created() {
    const { token, getGenres, refreshToken } = await useSpotifyServices(
      "50d506a310494ce3aeefbd90db3603fb",
      "9e428da92a2d4a1190c062618d479de2"
    );
    console.log("token criado ", token);
    this.token = token;
    this.onSearch = getGenres;
    this.refreshToken = refreshToken;

    watch(this.genres, () => {
      this.searchTerm = "";
    });
  },
  methods: {
    async handleSearch() {
      console.log("meu token ", this.token);
      this.timer = setTimeout(async () => {
        clearTimeout(this.timer);
        this.genres = await this.onSearch(this.searchTerm);
      }, 500);
    },
    sendGenres() {
      this.$emit("search-genres", this.genres);
    },
  },
  watch: {
    genres() {
      this.sendGenres();
    },
    token() {
      console.log(this.token);
    },
  },
};
</script>

<style>
.search {
  display: flex;
  height: 50px;
}

.search_bar {
  width: 350px;
  padding: 16px;
  border: none;
  border-radius: 30px;
  background-color: #282828;
  color: #ffffff;
  font-size: 14px;
  font-weight: normal;
  outline: none;
}

.search_bar:hover {
  border: 1px solid #8c8c8c;
}

.search_bar::placeholder {
  color: #b3b3b3;
  opacity: 1;
}

.search_bar:focus {
  border: 2px solid #fff;
  color: #fff;
}

.search_bar:focus::placeholder {
  color: #8c8c8c;
}
</style>