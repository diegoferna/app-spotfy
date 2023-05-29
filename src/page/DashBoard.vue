<template>
  <div class="container_cards">
    <search-bar @search-genres="getDados"></search-bar>
    <ul class="container_cards_box" v-if="genres.length > 0">
      <li v-for="(album, index) in genres" :key="index">
        <router-link
          :to="{
            name: 'album',
            params: {
              albumData: {
                id: album.id,
                albumName: album.name,
                albumImg: album.images[0].url,
                albumArtist: album.artists[0].name,
                albumUrl: album.artists[0].external_urls.spotify,
                albumTotalTracks: album.total_tracks,
                albumYear: album.release_date,
              },
            },
          }"
        >
          <album-card-vue
            :albumArtist="album.artists[0].name"
            :albumName="album.name"
            :albumYear="album.release_date"
            :url="album.images[0].url"
          ></album-card-vue>
        </router-link>
      </li>
      <router-view></router-view>
    </ul>
    <div v-else class="empty_search">
      <img class="empty_search_img" src="../assets/horizon.png" alt="" />
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
    getDados(dado) {
      this.genres = dado;
    },
  },
};
</script>
<style scoped>
.container_cards {
  width: 1240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto 0 auto;
  padding-top: 20px;
  background: #121212;
  border-radius: 1%;
}
.container_cards_box {
  display: flex;
  flex-wrap: wrap;
  max-width: 1240px;
}

.empty_search {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
}

.empty_search_img {
  width: 300px;
  height: ;
}

@media screen and (max-width: 900px) {
  .container_cards_box {
    display: flex;
    flex-wrap: wrap;
    max-width: 1000px;
  }
}
</style>

