<template>
  <div :class="{ playerBack: !ativo, playerGreenBack: ativo }">
    <div :class="{ player: !ativo, playerGreen: ativo }" @click="play">
      <!-- Ícone de reprodução (seta para a direita) -->
      <svg
        v-if="!playStatus"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
      <stop-track v-else></stop-track>
    </div>
  </div>
</template>

<script>
import StopTrack from "./StopTrack.vue";
export default {
  name: "PlayerTrack",
  components: {
    StopTrack,
  },
  data() {
    return {
      playStatus: false,
      audioPlayer: null,
    };
  },
  props: {
    trackUrl: {
      type: String,
    },
    ativo: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    play() {
      if (this.playStatus === false) {
        this.audioPlayer = new Audio(this.trackUrl);
        this.audioPlayer.play();
        this.playStatus = true;
      } else if (this.playStatus === true) {
        this.audioPlayer.pause();
        this.playStatus = false;
      }
    },
  },
};
</script>

<style scoped>
.player {
  width: 20px;
  margin: 16px 0 0 10px;
  color: #fff;
}

.playerGreen {
  width: 20px;
  margin: 16px;
  border-radius: 50%;
  color: #fff;
}

.playerGreenBack {
  display: flex;
  width: 50px;
  height: 50px;
  background: #1db954;
  border-radius: 50%;
}

.playerGreenBack:hover {
  border: 1px solid #000;
  cursor: pointer;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.stop {
  width: 12px;
  height: 12px;
  background: #fff;
}
</style>
