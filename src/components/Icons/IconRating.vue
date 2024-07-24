<template>
  <div class="rating" :class="[{ [`rating--${size}`]: size }, ratingColorClass]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 15"
      id="icon-star"
      class="rating__icon"
      aria-hidden="true"
    >
      <path
        d="m8.001 12.173-4.702 2.632 1.05-5.285L.393 5.86l5.35-.634L8.002.333l2.257 4.894 5.352.634-3.957 3.659 1.05 5.285-4.702-2.632Z"
      />
    </svg>

    <span>{{ ratingText }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  text: string | number;
  size?: '' | 'small';
}>();

const ratingText = computed(() => {
  return Number(props.text).toFixed(1);
});

const ratingColorClass = computed(() => {
  let currentColor = '';
  const textValue = Number(ratingText.value);

  switch (true) {
    case textValue >= 8:
      currentColor = 'rating--high';
      break;
    case textValue >= 7:
      currentColor = 'rating--medium';
      break;
    case textValue >= 5:
      currentColor = 'rating--low';
      break;
    default:
      currentColor = '';
      break;
  }

  return currentColor;
});
</script>

<style scoped>
.rating {
  display: flex;
  column-gap: 4px;
  align-items: center;
  padding-top: 4px;
  padding-right: 12px;
  padding-bottom: 4px;
  padding-left: 12px;

  font-size: 18px;
  font-weight: 700;
  color: var(--content-primary);

  background-color: #c82020;
  border-radius: 16px;
}

.rating--low {
  background-color: #777777;
}
.rating--medium {
  background-color: #308e21;
}
.rating--high {
  background-color: #a59400;
}

.rating__icon {
  width: 16px;
  height: 16px;

  fill: var(--content-primary);
}

.rating--small {
  padding-top: 2px;
  padding-right: 8px;
  padding-bottom: 2px;
  padding-left: 8px;

  font-size: 12px;
}

.rating--small .rating__icon {
  width: 10px;
  height: 10px;
}
</style>
