<template>
  <div class="home">
    <search-bar @search-genres="recebeArray"></search-bar>
    <ul class="container_cards" v-if="genres.length > 0">
      <li v-for="(album, index) in genres" :key="index">
        <router-link to="/tracks">
          <album-card-vue
            :albumArtist="album.artists[0].name"
            :albumName="album.name"
            :albumYear="album.release_date"
            :url="album.images[0].url"
          ></album-card-vue>
        </router-link>
      </li>
    </ul>
    <div v-else class="empty_search">
      <h1>EXPERIMENTE USAR A BARRA DE PESQUISA</h1>
    </div>
  </div>
</template>

<script lang="ts">
import AlbumCardVue from "@/components/AlbumCard.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  components: {
    AlbumCardVue,
    SearchBar,
  },
  data() {
    return {
      genres: [],
    };
  },

  methods: {
    recebeArray(dado) {
      this.genres = dado;
    },
  },
};
</script>
<style scoped>
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
.container_cards {
  display: flex;
  flex-wrap: wrap;
  max-width: 1240px;
}

.empty_search {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.empty_search h1 {
  font-weight: bold;
  color: #fff;
  font-size: 30px;
}
</style>

