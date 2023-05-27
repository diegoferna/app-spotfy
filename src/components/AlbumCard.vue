<template>
  <div class="card_container">
    <div class="card_img">
      <img class="card_img_style" :src="url" />
    </div>
    <div class="card_titulo">
      <p class="card_titulo_name">{{ albumName }}</p>
    </div>
    <div class="card_info">
      <p class="card_info_ano">
        {{ albumYear | releaseYear }} - {{ albumArtist }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UseSpotifyServices",
  data() {
    return {};
  },
  props: {
    albumName: {
      type: String,
    },
    albumYear: {
      type: String,
    },
    albumArtist: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  filters: {
    releaseYear(year) {
      return year.slice(0, 4);
    },
  },
};
</script>




<style>
.card_container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px;
  width: 200px;
  height: 270px;
  cursor: pointer;

  border-radius: 5%;
  background: #282828;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.card_container:hover {
  background: rgba(40, 40, 40, 0.5);
}

.card_img {
  flex: 4;
  margin: 12px auto;
  width: 180px;
  height: 60px;
}

.card_img_style {
  width: 100%;

  border-radius: 5%;
}

.card_titulo {
  flex: 1;
  display: flex;
  align-items: end;
  margin-left: 12px;
}

.card_titulo_name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #fff;
}

.card_info {
  flex: 1;
  align-items: start;
  margin-left: 12px;

  color: #fff;
}

.card_info_ano {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #c0c0c0;
}
</style>