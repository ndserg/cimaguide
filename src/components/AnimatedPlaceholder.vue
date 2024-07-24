<template>
  <div class="placeholder">&nbsp;</div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    height?: string;
    width?: string;
    borderRadius?: string;
  }>(),
  {
    height: '24px',
    width: '100%',
    borderRadius: 'none'
  }
);
</script>

<style scoped>
@keyframes bgAnimate {
  0% {
    background-position: 50% 0;
  }

  100% {
    background-position: -150% 0;
  }
}
.placeholder {
  width: v-bind(width);
  height: v-bind(height);
  background-image: linear-gradient(to right, #616161 0%, #7c7c7c 10%, #616161 20%, #616161 100%);
  background-size: 200% 100%;
  border-radius: v-bind(borderRadius);
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  animation: bgAnimate 1.5s ease-in-out infinite;
}
</style>
