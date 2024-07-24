<template>
  <ModalDialog :showModal="showTrailer" @destroyModal="destroyModal">
    <div class="video-player-wrapper">
      <youtube-iframe
        @state-change="onStateChange"
        :video-id="film?.trailerYouTubeId"
        :player-vars="{ autoplay: 1, rel: 0, showinfo: 0, modestbranding: 1 }"
        width="100%"
        height="100%"
      />
      <div v-if="isPaused" class="film-title">{{ film?.title }}</div>
    </div>
  </ModalDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { YoutubeIframe } from '@vue-youtube/component';
import { storeToRefs } from 'pinia';
import { useFilmStore } from '@/stores/film';
import ModalDialog from '@/components/ModalDialog.vue';

const isPaused = ref<boolean>(false);

const filmStore = useFilmStore();
const { film, showTrailer } = storeToRefs(filmStore);

const onStateChange = (evt: Record<string, any>) => {
  if (evt.data === 2) {
    isPaused.value = true;
    return;
  }
  isPaused.value = false;
};

const destroyModal = () => {
  showTrailer.value = false;
};
</script>

<style>
.video-player-wrapper {
  position: relative;

  width: 100vw;
  max-width: 960px;
  aspect-ratio: 16 / 9;

  line-height: 0;

  background-color: var(--background-secondary);
}

.film-title {
  width: 100%;
  padding-top: 24px;
  padding-right: 40px;
  padding-bottom: 24px;
  padding-left: 40px;

  font-size: 18px;
  font-weight: 700;
  line-height: 133%;
  color: var(--content-primary);

  background-color: var(--background-black);
}

@media (min-width: 768px) {
  .video-player-wrapper {
    width: calc(100vw - 148px);

    border: 1px solid var(--content-disabled);
  }

  .film-title {
    position: absolute;
    bottom: 80px;
    left: 50%;

    width: calc(100% - 40px);

    font-size: 24px;

    background-color: rgba(10, 11, 11, 0.5);

    transform: translateX(-50%);
  }
}
</style>
