<template>
  <div class="container_track">
    <div class="track_header">
      <div class="track_img">
        <img class="track_img_style" :src="trackData.trackImg" alt="trackImg" />
      </div>
      <div class="track_title">
        <a class="link" :href="trackData.trackUrl">songs</a>

        <h1>{{ trackData.trackName }}</h1>
        <span
          >{{ trackData.trackArtist }} .
          {{ trackData.trackYear | releaseYear }} .
          {{ trackData.trackDuration | msToMinutesAndSeconds }}
        </span>
      </div>
    </div>
    <div class="track_icons">
      <div>
        <player-track
          :ativo="true"
          class="album_box_items_play"
          :trackUrl="trackData.trackPlayer"
        ></player-track>
      </div>
      <div class="feedback">
        <heart-icon></heart-icon>
      </div>
      <div class="pontos">
        <span>...</span>
      </div>
    </div>
  </div>
</template>




<script>
import PlayerTrack from "../components/icons/PlayerTrack.vue";
import HeartIcon from "../components/icons/HeartIcon.vue";

export default {
  name: "TrackDetails",
  components: {
    PlayerTrack,
    HeartIcon,
  },
  computed: {
    trackData() {
      return this.$route.params.trackData;
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
};
</script>

<style>
.container_track {
  width: 1240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto 0 auto;
  padding-top: 20px;
  background: #121212;
  border-radius: 1%;
}

.track_header {
  width: 100%;
  height: 260px;
  display: flex;
}

.track_img {
  margin: 12px auto;
  width: 220px;
  height: 60px;
  margin: 20px;
}

.track_img_style {
  width: 100%;
}

.track_title {
  flex: 3;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: end;
  color: #fff;
  margin-bottom: 20px;
}

.track_icons {
  width: 100%;
  height: 150px;
  display: flex;
  padding: 20px;
  background: #121212;
}
.track_icons_player {
  display: flex;
  background: green;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.pontos {
  width: 20px;
  height: 20px;
}
.pontos span {
  color: #fff;
  font-size: 30px;
  margin-left: 20px;
  cursor: pointer;
}
</style>