<template>
  <div class="container_album">
    <div class="btn_back">
      <button @click="pageBack">
        <arrow-back></arrow-back>
      </button>
    </div>
    <div class="album_header">
      <div class="album_img">
        <img class="album_img_style" :src="albumData.albumImg" alt="albumImg" />
      </div>
      <div class="album_title">
        <a class="link" :href="albumData.albumUrl">Album</a>
        <h1>{{ albumData.albumName }}</h1>
        <div class="album_info">
          <span
            >{{ albumData.albumName }} . {{ albumData.albumTotalTracks }} songs
            . {{ albumData.albumYear | releaseYear }}</span
          >
        </div>
      </div>
    </div>
    <ul class="album_box">
      <li class="album_box_items" v-for="(track, index) in tracks" :key="index">
        <player-track
          :ativo="false"
          class="album_box_items_play"
          :trackUrl="track.preview_url"
        ></player-track>

        <router-link
          class="album_box_track"
          :to="{
            name: 'trackDetails',
            params: {
              trackData: {
                trackName: track.name,
                trackArtist: track.artists[0].name,
                trackDuration: track.duration_ms,
                trackUrl: track.external_urls.spotify,
                trackImg: albumData.albumImg,
                trackYear: albumData.albumYear,
                trackPlayer: track.preview_url,
              },
            },
          }"
        >
          <div class="album_box_track_items">
            <div class="album_box_track_name">
              <p>{{ track.name }}</p>
              <p class="album_box_track_name_artist">
                {{ albumData.albumArtist }}
              </p>
            </div>
          </div>
          <p class="album_box_time">
            {{ track.duration_ms | msToMinutesAndSeconds }}
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import useSpotifyServices from "../services/useSpotifyServices";
import PlayerTrack from "../components/icons/PlayerTrack.vue";
import ArrowBack from "@/components/icons/ArrowBack.vue";

export default {
  components: { PlayerTrack, ArrowBack },
  data() {
    return {
      tracks: [],
    };
  },
  methods: {
    pageBack() {
      this.$router.back();
    },
  },
  computed: {
    albumData() {
      return this.$route.params.albumData;
    },
  },

  filters: {
    msToMinutesAndSeconds(ms) {
      const totalSeconds = Math.floor(ms / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const formattedSeconds = String(seconds).padStart(2, "0");
      return minutes + ":" + formattedSeconds;
    },
    releaseYear(year) {
      return year.slice(0, 4);
    },
  },

  async created() {
    const { getAlbumTracks } = await useSpotifyServices(
      "50d506a310494ce3aeefbd90db3603fb",
      "9e428da92a2d4a1190c062618d479de2"
    );
    this.tracks = await getAlbumTracks(this.$route.params.albumData.id);
  },
};
</script>

<style>
.container_album {
  width: 1240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto 0 auto;
  padding-top: 20px;
  background: #121212;
  border-radius: 1%;
}

.album_header {
  width: 100%;
  height: 260px;
  display: flex;
}

.album_img {
  margin: 12px auto;
  width: 220px;
  height: 60px;
  margin: 20px;
}

.album_img_style {
  width: 100%;
}

.album_title {
  flex: 3;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: end;
  color: #fff;
  margin-bottom: 20px;
}

.album_title h1 {
  font-size: 80px;
}

.album_info {
  width: 100%;
}
.link {
  color: blue;
}

.album_box {
  width: 100%;
  padding: 20px;
}

.album_box_items {
  display: flex;
  margin-top: 20px;
  font-size: 20px;
  transition-duration: 0.3s;
  transition-property: background-color;
  transition-timing-function: ease-in-out;
}

.album_box_items:hover {
  display: flex;
  background: #3e3e3e;
}

.album_box_track {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  height: 50px;
  padding: 20px;
  background: #121212;

  color: #fff;
  font-size: 20px;
  transition-duration: 0.3s;
  transition-property: background-color;
  transition-timing-function: ease-in-out;
}

.album_box_track_name {
  display: flex;
  flex-direction: row;
}

.album_box_track_items {
  display: flex;
  gap: 20px;
}

.album_box_track_name {
  display: flex;
  flex-direction: column;
}

.album_box_track_name_artist {
  font-size: 12px;
  color: #565555;
}
.album_box_track:hover {
  background: #3e3e3e;
}

.album_box_time {
  color: #565555;
}

.btn_back {
  display: flex;
  justify-content: start;
  width: 100%;
}

.btn_back button {
  width: 30px;
  height: 30px;
  margin-left: 20px;
  border-radius: 100%;
  background: #3e3e3e;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
}
</style>